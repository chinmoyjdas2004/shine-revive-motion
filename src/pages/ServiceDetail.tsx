import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Clock, Shield, Star, Sparkles, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import exteriorDetail from "@/assets/exterior-detail.jpg";
import interiorDetail from "@/assets/interior-detail.jpg";
import ceramicCoating from "@/assets/ceramic-coating.jpg";

const servicesData = {
  exterior: {
    title: "Exterior Detailing",
    subtitle: "Complete Exterior Transformation",
    description: "Our comprehensive exterior detailing service restores your vehicle's paintwork to showroom condition. Using advanced techniques and premium products, we remove contaminants, correct paint imperfections, and apply protective coatings that enhance shine and durability.",
    image: exteriorDetail,
    icon: Car,
    duration: "3-5 hours",
    features: [
      "Hand wash with pH-neutral shampoo",
      "Clay bar treatment to remove embedded contaminants",
      "Machine polishing for paint correction",
      "Wheel and tire deep cleaning",
      "Glass cleaning and treatment",
      "Trim restoration and protection",
      "High-quality wax or sealant application",
    ],
    pricing: [
      { name: "Basic", price: "₹2,999", description: "Hand wash, clay bar, and wax" },
      { name: "Premium", price: "₹4,999", description: "Includes paint correction" },
      { name: "Ultimate", price: "₹7,999", description: "Full correction & ceramic sealant" },
    ],
  },
  interior: {
    title: "Interior Deep Clean",
    subtitle: "Meticulous Interior Restoration",
    description: "Transform your car's interior into a pristine sanctuary. Our deep cleaning service addresses every surface, from leather conditioning to steam sanitization, ensuring a fresh, healthy, and luxurious environment for your daily drives.",
    image: interiorDetail,
    icon: Sparkles,
    duration: "2-4 hours",
    features: [
      "Complete vacuuming of all surfaces",
      "Steam cleaning and sanitization",
      "Leather cleaning and conditioning",
      "Dashboard and console detailing",
      "Door panel and trim restoration",
      "Carpet and upholstery shampooing",
      "Odor elimination treatment",
      "Air vent deep cleaning",
    ],
    pricing: [
      { name: "Basic", price: "₹1,999", description: "Vacuum, wipe, and freshen" },
      { name: "Premium", price: "₹3,499", description: "Deep clean with steam" },
      { name: "Ultimate", price: "₹5,999", description: "Full restoration & protection" },
    ],
  },
  ceramic: {
    title: "Ceramic Coating",
    subtitle: "Ultimate Paint Protection",
    description: "Protect your investment with our professional-grade ceramic coating. This advanced nanotechnology creates a permanent bond with your paint, providing unmatched protection against UV rays, chemicals, and environmental damage while delivering an incredible hydrophobic effect.",
    image: ceramicCoating,
    icon: Shield,
    duration: "1-2 days",
    features: [
      "Complete paint decontamination",
      "Multi-stage paint correction",
      "IPA wipe-down for pure surface",
      "Professional ceramic coating application",
      "9H hardness protection",
      "5+ years of durability",
      "Extreme hydrophobic properties",
      "UV and chemical resistance",
    ],
    pricing: [
      { name: "1-Year", price: "₹9,999", description: "Entry-level ceramic protection" },
      { name: "3-Year", price: "₹19,999", description: "Professional grade coating" },
      { name: "5-Year", price: "₹34,999", description: "Premium ceramic with warranty" },
    ],
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = servicesData[serviceId as keyof typeof servicesData];
  const [selectedTier, setSelectedTier] = useState(1); // Default to Premium (index 1)

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button variant="sage">View All Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom section-padding !pb-12">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft size={18} />
                <span>Back to Services</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <service.icon size={24} className="text-primary" />
                </div>
                <span className="text-primary text-sm font-medium tracking-wider uppercase">
                  {service.subtitle}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                {service.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-foreground">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Duration */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bento-card p-6 inline-flex items-center gap-4"
              >
                <Clock size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Duration</div>
                  <div className="text-lg font-semibold text-foreground">{service.duration}</div>
                </div>
              </motion.div>
            </div>

            {/* Pricing Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bento-card p-6 sticky top-24 space-y-6"
              >
                <h3 className="text-xl font-bold text-foreground">Pricing Tiers</h3>
                
                <div className="space-y-4">
                  {service.pricing.map((tier, index) => (
                    <motion.div
                      key={tier.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTier(index)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        selectedTier === index 
                          ? "border-primary bg-primary/10 ring-2 ring-primary/30" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedTier === index ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}>
                            {selectedTier === index && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-primary-foreground"
                              />
                            )}
                          </div>
                          <span className="font-semibold text-foreground">{tier.name}</span>
                        </div>
                        {index === 1 && (
                          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1 ml-7">{tier.price}</div>
                      <div className="text-sm text-muted-foreground ml-7">{tier.description}</div>
                    </motion.div>
                  ))}
                </div>

                <Link to={`/booking?service=${serviceId}&tier=${service.pricing[selectedTier].name}`} className="block">
                  <Button variant="sage" size="lg" className="w-full">
                    Book This Service
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star size={16} className="text-primary" />
                    <span>4.9/5 Customer Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield size={16} className="text-primary" />
                    <span>Satisfaction Guaranteed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServiceDetail;
