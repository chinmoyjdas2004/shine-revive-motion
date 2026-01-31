import { Bell, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminHeaderProps {
  user: User;
  onLogout: () => void;
}

const AdminHeader = ({ user, onLogout }: AdminHeaderProps) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);

  useEffect(() => {
    fetchCounts();

    // Real-time subscriptions
    const bookingsChannel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchCounts();
      })
      .subscribe();

    const contactsChannel = supabase
      .channel('contacts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        fetchCounts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(contactsChannel);
    };
  }, []);

  const fetchCounts = async () => {
    const [bookingsRes, contactsRes] = await Promise.all([
      supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending'),
      supabase.from('contacts').select('id', { count: 'exact' }).eq('read', false),
    ]);

    setPendingBookings(bookingsRes.count || 0);
    setUnreadCount(contactsRes.count || 0);
  };

  const totalNotifications = unreadCount + pendingBookings;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Welcome back!</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            {totalNotifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
              >
                {totalNotifications}
              </motion.span>
            )}
          </Button>
        </motion.div>

        {/* Logout */}
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
