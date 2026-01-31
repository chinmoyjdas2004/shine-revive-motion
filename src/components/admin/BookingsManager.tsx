import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Clock, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Booking = Database['public']['Tables']['bookings']['Row'];

const BookingsManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  useEffect(() => {
    fetchBookings();

    const channel = supabase
      .channel('bookings-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setBookings(prev => [payload.new as Booking, ...prev]);
          toast.info(`New booking from ${(payload.new as Booking).name}!`);
        } else if (payload.eventType === 'UPDATE') {
          setBookings(prev => prev.map(b => b.id === payload.new.id ? payload.new as Booking : b));
        } else if (payload.eventType === 'DELETE') {
          setBookings(prev => prev.filter(b => b.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Booking ${status}!`);
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">Manage appointment requests</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "pending", "accepted", "rejected"] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? "sage" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
            {status === "pending" && bookings.filter(b => b.status === "pending").length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-primary-foreground text-primary text-xs rounded-full">
                {bookings.filter(b => b.status === "pending").length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No bookings found
          </div>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{booking.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                      booking.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {booking.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {booking.phone}
                      </span>
                    )}
                    {booking.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {booking.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {booking.service}
                    </span>
                    <span className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full">
                      {booking.tier}
                    </span>
                  </div>

                  {booking.notes && (
                    <p className="text-sm text-muted-foreground italic">
                      "{booking.notes}"
                    </p>
                  )}
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'rejected')}
                      className="gap-2 text-red-500 hover:text-red-600 hover:border-red-500"
                    >
                      <X size={16} />
                      Reject
                    </Button>
                    <Button
                      variant="sage"
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'accepted')}
                      className="gap-2"
                    >
                      <Check size={16} />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsManager;
