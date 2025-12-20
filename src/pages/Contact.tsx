import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import heroCar from "@/assets/hero-car.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "123 Premium Lane, Guwahati, Assam 781001",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@cozicars.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sat: 9:00 AM - 7:00 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={heroCar}
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom section-padding !pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Get in Touch
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4">
                Contact <span className="text-primary">Us</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Name *</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary border-border rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary border-border rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-secondary border-border rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Message *</label>
                  <Textarea
                    placeholder="Tell us about your car and what service you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary border-border rounded-xl min-h-[150px] resize-none"
                  />
                </div>
                <Button type="submit" variant="sage" size="lg" className="w-full sm:w-auto">
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.title}
                    whileHover={{ y: -4 }}
                    className="bento-card p-6"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.content}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Find Us</h3>
                <Map />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
