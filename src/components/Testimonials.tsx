import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import BentoCard from "@/components/BentoCard";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "BMW Owner",
    content: "Absolutely incredible service! My car has never looked this good. The attention to detail is remarkable.",
    rating: 5,
  },
  {
    name: "Priya Dutta",
    role: "Mercedes Owner",
    content: "The ceramic coating they applied has kept my car pristine for months. Worth every penny!",
    rating: 5,
  },
  {
    name: "Amit Bora",
    role: "Porsche Enthusiast",
    content: "Finally found a detailing service that understands luxury cars. The team is professional and thorough.",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring" as const,
        stiffness: 500,
      },
    }),
  };

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-primary text-sm font-medium tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What Our <span className="text-primary">Clients</span> Say
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          ref={ref} 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              custom={index}
            >
              <BentoCard className="p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <Quote size={20} className="text-primary" />
                </motion.div>

                {/* Content */}
                <motion.p 
                  className="text-muted-foreground leading-relaxed flex-1 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  "{testimonial.content}"
                </motion.p>

                {/* Rating */}
                <motion.div 
                  className="flex gap-1 mb-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={starVariants}
                    >
                      <Star size={16} className="text-primary fill-primary" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </motion.div>
              </BentoCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
