import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Car, Shield } from "lucide-react";
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

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full -translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            From a Simple Wash to<br />
            <span className="text-primary">Comprehensive Detailing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a range of premium services tailored to meet your car's specific needs, ensuring perfection in every detail.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Link to={`/services/${service.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bento-card group h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-sm font-medium">
                      {service.price}
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight size={18} className="text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <service.icon size={20} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
