import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Car, ChevronLeft, ChevronRight, Check, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import MagneticButton from "@/components/MagneticButton";
import greenPorsche from "@/assets/green-porsche.jpg";

const services = [
  { id: "exterior", name: "Exterior Detailing", price: "₹2,999" },
  { id: "interior", name: "Interior Deep Clean", price: "₹1,999" },
  { id: "ceramic", name: "Ceramic Coating", price: "₹9,999" },
  { id: "full", name: "Full Detail Package", price: "₹7,999" },
];

const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
];

const Booking = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (newDate >= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleBooking = () => {
    if (!name || !phone || !selectedService || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const serviceName = services.find(s => s.id === selectedService)?.name || selectedService;
    
    navigate("/booking-confirmation", {
      state: {
        name,
        service: serviceName,
        date: selectedDate.toISOString(),
        time: selectedTime,
      }
    });
  };

  const days = getDaysInMonth(currentMonth);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container-custom relative z-10">
          <RevealOnScroll className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Book Appointment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Schedule Your <span className="text-primary">Premium Detail</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your preferred date, time, and service. Our team will confirm your appointment shortly.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Booking Form Section */}
      <section ref={ref} className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image & Info */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="space-y-8 lg:sticky lg:top-32"
            >
              <motion.div 
                className="relative aspect-[4/3] rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={greenPorsche}
                  alt="Luxury car detailing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </motion.div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-primary" />
                    Premium products & equipment
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-primary" />
                    Experienced detailing specialists
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-primary" />
                    100% satisfaction guarantee
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-primary" />
                    Convenient scheduling options
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right - Booking Form */}
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
                {/* Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <User size={16} />
                      Your Name *
                    </label>
                    <Input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-secondary border-border rounded-xl h-12"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Phone size={16} />
                      Phone Number *
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-secondary border-border rounded-xl h-12"
                    />
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail size={16} />
                    Email (optional)
                  </label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary border-border rounded-xl h-12"
                  />
                </motion.div>

                {/* Service Selection */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Car size={16} />
                    Select Service *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <motion.button
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                          selectedService === service.id
                            ? "bg-primary/10 border-primary text-foreground"
                            : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <div className="text-sm font-medium">{service.name}</div>
                        <div className="text-xs text-muted-foreground">{service.price}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Calendar */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar size={16} />
                    Select Date *
                  </label>
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <motion.button
                        onClick={handlePrevMonth}
                        className="p-1 hover:bg-muted rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft size={20} className="text-muted-foreground" />
                      </motion.button>
                      <span className="font-medium text-foreground">{formatMonth(currentMonth)}</span>
                      <motion.button
                        onClick={handleNextMonth}
                        className="p-1 hover:bg-muted rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight size={20} className="text-muted-foreground" />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="text-center text-xs text-muted-foreground py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => (
                        <div key={index} className="aspect-square">
                          {day && (
                            <motion.button
                              onClick={() => handleDateSelect(day)}
                              disabled={isPastDate(day)}
                              whileHover={{ scale: isPastDate(day) ? 1 : 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 ${
                                isDateSelected(day)
                                  ? "bg-primary text-primary-foreground"
                                  : isPastDate(day)
                                  ? "text-muted-foreground/30 cursor-not-allowed"
                                  : "text-foreground hover:bg-muted"
                              }`}
                            >
                              {day}
                            </motion.button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Time Slots */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock size={16} />
                    Select Time *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time, index) => (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedTime === time
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground border border-border hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <MagneticButton className="w-full" strength={0.15}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleBooking}
                        variant="sage"
                        size="lg"
                        className="w-full"
                      >
                        <Check size={18} className="mr-2" />
                        Confirm Booking
                      </Button>
                    </motion.div>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
