import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import greenPorsche from "@/assets/green-porsche.jpg";
import RevealOnScroll from "@/components/RevealOnScroll";
import MagneticButton from "@/components/MagneticButton";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you shortly.");
    setName("");
    setEmail("");
    setMessage("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-secondary">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-8"
          >
            <RevealOnScroll delay={0.2}>
              <span className="text-primary text-sm font-medium tracking-wider uppercase">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
                Have a Question?<br />We're Here to Help
              </h2>
              <p className="text-muted-foreground max-w-md">
                Whether you have questions about our services or need a custom quote, our team is ready to assist you.
              </p>
            </RevealOnScroll>

            <motion.div 
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={greenPorsche}
                alt="Luxury car detailing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="bg-card rounded-3xl p-6 lg:p-8 border border-border"
          >
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Name Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User size={16} />
                  Your Name
                </label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-secondary border-border rounded-xl h-12"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary border-border rounded-xl h-12"
                />
              </motion.div>

              {/* Message Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare size={16} />
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell us about your car or ask any questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-secondary border-border rounded-xl min-h-[150px] resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <MagneticButton className="w-full" strength={0.15}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      variant="sage"
                      size="lg"
                      className="w-full"
                    >
                      <Send size={18} className="mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
