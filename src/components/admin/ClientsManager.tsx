import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Phone, Calendar, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Client = Database['public']['Tables']['clients']['Row'];

const ClientsManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchClients();

    const channel = supabase
      .channel('clients-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setClients(prev => [payload.new as Client, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setClients(prev => prev.map(c => c.id === payload.new.id ? payload.new as Client : c));
        } else if (payload.eventType === 'DELETE') {
          setClients(prev => prev.filter(c => c.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const addClient = async () => {
    if (!newClient.name || !newClient.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      const { error } = await supabase
        .from('clients')
        .insert({
          name: newClient.name,
          email: newClient.email,
          phone: newClient.phone || null,
        });

      if (error) throw error;
      toast.success("Client added successfully");
      setNewClient({ name: "", email: "", phone: "" });
      setIsDialogOpen(false);
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error("A client with this email already exists");
      } else {
        toast.error("Failed to add client");
      }
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client database</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="sage" className="gap-2">
              <Plus size={18} />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Name *</label>
                <Input
                  placeholder="Client name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email *</label>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <Input
                  placeholder="Phone number"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <Button variant="sage" className="w-full" onClick={addClient}>
                Add Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-secondary border-border"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No clients found
          </div>
        ) : (
          filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {client.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} />
                    {client.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={14} />
                  {client.total_bookings} bookings
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign size={14} />
                  ₹{Number(client.total_spent).toLocaleString()} spent
                </div>
              </div>

              <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                Added {new Date(client.created_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientsManager;
