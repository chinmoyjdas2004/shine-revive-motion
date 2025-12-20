import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

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

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bento-card p-6 h-full flex flex-col"
              >
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Quote size={20} className="text-primary" />
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-primary fill-primary" />
                  ))}
                </div>

                {/* Author */}
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
