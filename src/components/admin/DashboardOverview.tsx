import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, MessageSquare, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  totalClients: number;
  unreadMessages: number;
  totalRevenue: number;
  todayBookings: number;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    totalClients: 0,
    unreadMessages: 0,
    totalRevenue: 0,
    todayBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    // Real-time subscriptions for live updates
    const bookingsChannel = supabase
      .channel('overview-bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchStats();
      })
      .subscribe();

    const contactsChannel = supabase
      .channel('overview-contacts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        fetchStats();
      })
      .subscribe();

    const invoicesChannel = supabase
      .channel('overview-invoices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(contactsChannel);
      supabase.removeChannel(invoicesChannel);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [bookingsRes, pendingRes, clientsRes, messagesRes, invoicesRes, todayRes, recentRes] = await Promise.all([
        supabase.from('bookings').select('id', { count: 'exact' }),
        supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('clients').select('id', { count: 'exact' }),
        supabase.from('contacts').select('id', { count: 'exact' }).eq('read', false),
        supabase.from('invoices').select('total').eq('status', 'paid'),
        supabase.from('bookings').select('id', { count: 'exact' }).eq('date', today),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      const totalRevenue = invoicesRes.data?.reduce((sum, inv) => sum + Number(inv.total), 0) || 0;

      setStats({
        totalBookings: bookingsRes.count || 0,
        pendingBookings: pendingRes.count || 0,
        totalClients: clientsRes.count || 0,
        unreadMessages: messagesRes.count || 0,
        totalRevenue,
        todayBookings: todayRes.count || 0,
      });

      setRecentBookings(recentRes.data || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Approval",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings,
      icon: TrendingUp,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Real-time analytics and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Bookings</h2>
        <div className="space-y-4">
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No bookings yet</p>
          ) : (
            recentBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-secondary rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{booking.name}</p>
                    <p className="text-sm text-muted-foreground">{booking.service} - {booking.tier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{new Date(booking.date).toLocaleDateString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                    booking.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
