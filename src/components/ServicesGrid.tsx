import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Car, Shield } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import exteriorDetail from "@/assets/exterior-detail.jpg";
import interiorDetail from "@/assets/interior-detail.jpg";
import ceramicCoating from "@/assets/ceramic-coating.jpg";

const services = [
  {
    id: "exterior",
    title: "Exterior Detailing",
    description: "Complete exterior transformation with paint correction, polishing, and protective coating for that showroom finish.",
    image: exteriorDetail,
    icon: Car,
    price: "From ₹2,999",
    features: ["Paint Correction", "Hand Wash", "Clay Bar Treatment", "Wax Protection"],
  },
  {
    id: "interior",
    title: "Interior Deep Clean",
    description: "Meticulous interior restoration including leather conditioning, steam cleaning, and odor elimination.",
    image: interiorDetail,
    icon: Sparkles,
    price: "From ₹1,999",
    features: ["Leather Care", "Steam Cleaning", "Odor Removal", "Dashboard Polish"],
  },
  {
    id: "ceramic",
    title: "Ceramic Coating",
    description: "Long-lasting ceramic protection that shields your paint from environmental damage and enhances gloss.",
    image: ceramicCoating,
    icon: Shield,
    price: "From ₹9,999",
    features: ["9H Hardness", "5 Year Protection", "Hydrophobic", "UV Protection"],
  },
];

const ServicesGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Accent */}
      <motion.div 
        className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full -translate-y-1/2"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-primary text-sm font-medium tracking-wider uppercase inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From a Simple Wash to<br />
            <span className="text-primary">Comprehensive Detailing</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            We offer a range of premium services tailored to meet your car's specific needs, ensuring perfection in every detail.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          ref={ref} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              custom={index}
            >
              <Link to={`/services/${service.id}`}>
                <BentoCard className="group h-full flex flex-col cursor-pointer">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Price Badge */}
                    <motion.div 
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-sm font-medium"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {service.price}
                    </motion.div>

                    {/* Arrow Icon */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <ArrowUpRight size={18} className="text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon size={20} className="text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {service.features.map((feature, i) => (
                        <motion.span
                          key={feature}
                          custom={i}
                          variants={featureVariants}
                          className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                          whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </BentoCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
