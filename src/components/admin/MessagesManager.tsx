import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Contact = Database['public']['Tables']['contacts']['Row'];

const MessagesManager = () => {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('contacts-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setMessages(prev => [payload.new as Contact, ...prev]);
          toast.info(`New message from ${(payload.new as Contact).name}!`);
        } else if (payload.eventType === 'UPDATE') {
          setMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new as Contact : m));
        } else if (payload.eventType === 'DELETE') {
          setMessages(prev => prev.filter(m => m.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      toast.success("Marked as read");
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("Failed to update message");
    }
  };

  const filteredMessages = filter === "all" 
    ? messages 
    : filter === "unread" 
      ? messages.filter(m => !m.read)
      : messages.filter(m => m.read);

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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Contact form submissions</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "unread", "read"] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? "sage" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
            {status === "unread" && messages.filter(m => !m.read).length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-primary-foreground text-primary text-xs rounded-full">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No messages found
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-card border rounded-2xl p-6 ${
                !message.read ? 'border-primary/50 bg-primary/5' : 'border-border'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{message.name}</h3>
                    {!message.read && (
                      <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {message.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {message.phone}
                      </span>
                    )}
                    {message.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {message.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>

                  {message.subject && (
                    <p className="text-sm font-medium text-foreground">
                      Subject: {message.subject}
                    </p>
                  )}

                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>

                {!message.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(message.id)}
                    className="gap-2"
                  >
                    <Check size={16} />
                    Mark as Read
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
