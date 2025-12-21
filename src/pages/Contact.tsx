import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", phone: "", vehicle: "", service: "", message: "" });
  };

  const services = [
    "Exterior Detailing",
    "Interior Deep Clean",
    "Ceramic Coating",
    "Signature Detail",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-8 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Start Your <span className="text-primary">Transformation</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or ready to book a consultation? Reach out to the artisans of automotive care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="section-padding !pt-8">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Contact Form - Large Card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 lg:row-span-1"
            >
              <div className="glass-card p-8 h-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Full Name *
                      </label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Phone Number *
                      </label>
                      <Input
                        placeholder="+91"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Vehicle Make & Model
                      </label>
                      <Input
                        placeholder="e.g., Porsche 911"
                        value={formData.vehicle}
                        onChange={(e) =>
                          setFormData({ ...formData, vehicle: e.target.value })
                        }
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Service of Interest
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          setFormData({ ...formData, service: value })
                        }
                      >
                        <SelectTrigger className="glass-input h-12">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {services.map((service) => (
                            <SelectItem
                              key={service}
                              value={service}
                              className="text-foreground hover:bg-secondary focus:bg-secondary"
                            >
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us about your car..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="glass-input min-h-[120px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="sage"
                    size="lg"
                    className="w-full sm:w-auto group"
                  >
                    <Send
                      size={18}
                      className="mr-2 transition-transform group-hover:translate-x-1"
                    />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Quick Contact Card */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-8 h-full">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Quick Contact
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm mb-1">
                        Studio Address
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        123 Premium Lane, Zoo Road
                        <br />
                        Guwahati, Assam 781001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm mb-1">
                        Phone
                      </p>
                      <p className="text-muted-foreground text-sm">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm mb-1">
                        Email
                      </p>
                      <p className="text-muted-foreground text-sm">
                        hello@cozicars.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm mb-1">
                        Operational Hours
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Mon – Sat: 9:00 AM – 7:00 PM
                        <br />
                        Sun: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Full-width Map */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="glass-card p-4 h-[400px]">
                <Map />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
