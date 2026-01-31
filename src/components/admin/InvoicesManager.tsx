import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Download, Eye } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Invoice = Database['public']['Tables']['invoices']['Row'];
type Client = Database['public']['Tables']['clients']['Row'];

const InvoicesManager = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [newInvoice, setNewInvoice] = useState({
    client_id: "",
    client_name: "",
    client_email: "",
    service: "",
    tier: "",
    amount: "",
    tax: "0",
    notes: "",
  });

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('invoices-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setInvoices(prev => [payload.new as Invoice, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setInvoices(prev => prev.map(i => i.id === payload.new.id ? payload.new as Invoice : i));
        } else if (payload.eventType === 'DELETE') {
          setInvoices(prev => prev.filter(i => i.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [invoicesRes, clientsRes] = await Promise.all([
        supabase.from('invoices').select('*').order('created_at', { ascending: false }),
        supabase.from('clients').select('*').order('name'),
      ]);

      if (invoicesRes.error) throw invoicesRes.error;
      if (clientsRes.error) throw clientsRes.error;

      setInvoices(invoicesRes.data || []);
      setClients(clientsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const createInvoice = async () => {
    if (!newInvoice.client_name || !newInvoice.client_email || !newInvoice.service || !newInvoice.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(newInvoice.amount);
    const tax = parseFloat(newInvoice.tax || "0");
    const total = amount + tax;

    try {
      const { error } = await supabase.from('invoices').insert({
        invoice_number: generateInvoiceNumber(),
        client_id: newInvoice.client_id || null,
        client_name: newInvoice.client_name,
        client_email: newInvoice.client_email,
        service: newInvoice.service,
        tier: newInvoice.tier || "Standard",
        amount,
        tax,
        total,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: newInvoice.notes || null,
      });

      if (error) throw error;
      toast.success("Invoice created successfully");
      setNewInvoice({
        client_id: "",
        client_name: "",
        client_email: "",
        service: "",
        tier: "",
        amount: "",
        tax: "0",
        notes: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Failed to create invoice");
    }
  };

  const updateInvoiceStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Invoice marked as ${status}`);
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Failed to update invoice");
    }
  };

  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setNewInvoice({
        ...newInvoice,
        client_id: clientId,
        client_name: client.name,
        client_email: client.email,
      });
    }
  };

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
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Generate and manage invoices</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="sage" className="gap-2">
              <Plus size={18} />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4 max-h-[70vh] overflow-y-auto">
              {/* Client Selection */}
              {clients.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Select Existing Client</label>
                  <Select onValueChange={handleClientSelect}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} ({client.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="text-center text-muted-foreground text-sm">— or enter manually —</div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Client Name *</label>
                  <Input
                    placeholder="Client name"
                    value={newInvoice.client_name}
                    onChange={(e) => setNewInvoice({ ...newInvoice, client_name: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Client Email *</label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={newInvoice.client_email}
                    onChange={(e) => setNewInvoice({ ...newInvoice, client_email: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Service *</label>
                  <Select onValueChange={(v) => setNewInvoice({ ...newInvoice, service: v })}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Exterior Detailing">Exterior Detailing</SelectItem>
                      <SelectItem value="Interior Deep Clean">Interior Deep Clean</SelectItem>
                      <SelectItem value="Ceramic Coating">Ceramic Coating</SelectItem>
                      <SelectItem value="Full Detail Package">Full Detail Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Tier</label>
                  <Select onValueChange={(v) => setNewInvoice({ ...newInvoice, tier: v })}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Signature">Signature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Amount (₹) *</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Tax (₹)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newInvoice.tax}
                    onChange={(e) => setNewInvoice({ ...newInvoice, tax: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              {newInvoice.amount && (
                <div className="p-4 bg-secondary rounded-xl">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>₹{parseFloat(newInvoice.amount || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>₹{parseFloat(newInvoice.tax || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground mt-2 pt-2 border-t border-border">
                    <span>Total:</span>
                    <span>₹{(parseFloat(newInvoice.amount || "0") + parseFloat(newInvoice.tax || "0")).toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button variant="sage" className="w-full" onClick={createInvoice}>
                Create Invoice
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Invoice Preview Modal */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice {selectedInvoice?.invoice_number}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 pt-4">
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">AutoGarage</h3>
                    <p className="text-sm text-muted-foreground">Premium Car Detailing</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedInvoice.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                    selectedInvoice.status === 'unpaid' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {selectedInvoice.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm"><span className="text-muted-foreground">Bill To:</span> {selectedInvoice.client_name}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Email:</span> {selectedInvoice.client_email}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Due Date:</span> {new Date(selectedInvoice.due_date).toLocaleDateString()}</p>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{selectedInvoice.service} - {selectedInvoice.tier}</span>
                    <span>₹{Number(selectedInvoice.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax</span>
                    <span>₹{Number(selectedInvoice.tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{Number(selectedInvoice.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => updateInvoiceStatus(selectedInvoice.id, 'paid')}
                >
                  Mark as Paid
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => updateInvoiceStatus(selectedInvoice.id, 'cancelled')}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No invoices yet
          </div>
        ) : (
          invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{invoice.invoice_number}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        invoice.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                        invoice.status === 'unpaid' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{invoice.client_name}</p>
                    <p className="text-xs text-muted-foreground">{invoice.service} - {invoice.tier}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">₹{Number(invoice.total).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedInvoice(invoice)}
                  >
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvoicesManager;
