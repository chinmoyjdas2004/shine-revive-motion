import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, Car, CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, service, date, time } = location.state || {};

  // Redirect if no booking data
  if (!date || !time || !service) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No booking details found.</p>
            <Button onClick={() => navigate("/booking")} variant="sage">
              Make a Booking
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 gradient-dark" />
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <CheckCircle size={48} className="text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl font-bold mb-4"
            >
              Booking <span className="text-primary">Confirmed!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg mb-10"
            >
              Thank you{name ? `, ${name}` : ""}! Your appointment has been scheduled. We'll contact you shortly to confirm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-3xl p-8 border border-border text-left space-y-6"
            >
              <h2 className="text-xl font-semibold text-center mb-6">Your Booking Details</h2>

              <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Car size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium text-foreground">{service}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Calendar size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">{time}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10"
            >
              <MagneticButton strength={0.15}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => navigate("/")}
                    variant="sage"
                    size="lg"
                  >
                    <Home size={18} className="mr-2" />
                    Back to Home
                  </Button>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
