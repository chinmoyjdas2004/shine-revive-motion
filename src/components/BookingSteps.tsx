import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Calendar, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Choose Service",
    description: "Select from our range of premium detailing packages",
  },
  {
    icon: Calendar,
    title: "Pick Date & Time",
    description: "Book a convenient slot that fits your schedule",
  },
  {
    icon: Sparkles,
    title: "We Detail",
    description: "Our experts transform your vehicle to perfection",
  },
  {
    icon: CheckCircle,
    title: "Drive Away Happy",
    description: "Enjoy your freshly detailed, showroom-ready car",
  },
];

const BookingSteps = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
            Book Your Detail in <span className="text-primary">4 Easy Steps</span>
          </h2>
        </motion.div>

        {/* Steps with animated line */}
        <div className="relative">
          {/* Animated connecting line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Animated connecting line - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-primary"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="relative flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-0"
              >
                {/* Step number with icon */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.5 + index * 0.2,
                    }}
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  
                  {/* Step number badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: 0.7 + index * 0.2,
                    }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Pulse animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-primary/20"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={isInView ? {
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.3, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: 1 + index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="lg:mt-6">
                  <motion.h3
                    className="text-lg font-semibold text-foreground mb-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-muted-foreground max-w-[200px] lg:mx-auto"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.2 }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;
