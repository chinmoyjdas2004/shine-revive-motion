import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BentoCard from "@/components/BentoCard";
import MagneticButton from "@/components/MagneticButton";
import heroCar from "@/assets/hero-car.jpg";
import greenPorsche from "@/assets/green-porsche.jpg";
import detailingProcess from "@/assets/detailing-process.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source
            src="https://videos.pexels.com/video-files/3049587/3049587-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium">Premium Car Detailing</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Bringing Your{" "}
              <motion.span 
                className="text-primary inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px hsl(var(--primary) / 0)",
                    "0 0 40px hsl(var(--primary) / 0.3)",
                    "0 0 20px hsl(var(--primary) / 0)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Car's Shine
              </motion.span>{" "}
              Back to Life
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Experience the art of automotive perfection. From comprehensive exterior treatments to meticulous interior care, we transform your vehicle into a masterpiece.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link to="/booking">
                <MagneticButton strength={0.3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="sage" size="lg" className="gap-2">
                      Book Now
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </Button>
                  </motion.div>
                </MagneticButton>
              </Link>
              <Link to="/services">
                <MagneticButton strength={0.3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" size="lg">
                      View Services
                    </Button>
                  </motion.div>
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div className="flex gap-8 pt-4">
              {[
                { value: "500+", label: "Cars Detailed" },
                { value: "98%", label: "Satisfaction" },
                { value: "5+", label: "Years Experience" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="cursor-default"
                >
                  <motion.div 
                    className="text-2xl font-bold text-foreground"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Bento Grid */}
          <motion.div
            style={{ y }}
            className="relative grid grid-cols-2 gap-4"
          >
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="col-span-2"
            >
              <BentoCard className="overflow-hidden aspect-[16/9]">
                <motion.img
                  src={heroCar}
                  alt="Premium car detailing"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </BentoCard>
            </motion.div>

            {/* Secondary Images */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            >
              <BentoCard className="overflow-hidden aspect-square">
                <motion.img
                  src={greenPorsche}
                  alt="Green Porsche detailing"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </BentoCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
            >
              <BentoCard className="overflow-hidden aspect-square">
                <motion.img
                  src={detailingProcess}
                  alt="Detailing process"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </BentoCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
