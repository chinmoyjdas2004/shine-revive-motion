import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Car, Sparkles, Shield, Droplets, Sun, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import exteriorDetail from "@/assets/exterior-detail.jpg";
import interiorDetail from "@/assets/interior-detail.jpg";
import ceramicCoating from "@/assets/ceramic-coating.jpg";
import heroCar from "@/assets/hero-car.jpg";
const allServices = [{
  id: "exterior",
  title: "Exterior Detailing",
  description: "Complete exterior transformation with paint correction, polishing, and protective coating.",
  image: exteriorDetail,
  icon: Car,
  price: "From ₹2,999"
}, {
  id: "interior",
  title: "Interior Deep Clean",
  description: "Meticulous interior restoration including leather conditioning and steam cleaning.",
  image: interiorDetail,
  icon: Sparkles,
  price: "From ₹1,999"
}, {
  id: "ceramic",
  title: "Ceramic Coating",
  description: "Long-lasting ceramic protection that shields your paint from environmental damage.",
  image: ceramicCoating,
  icon: Shield,
  price: "From ₹9,999"
}];
const additionalServices = [{
  title: "Paint Protection Film",
  description: "Invisible shield against rock chips, scratches, and road debris.",
  icon: Shield,
  price: "From ₹15,999"
}, {
  title: "Headlight Restoration",
  description: "Restore clarity and brightness to foggy, yellowed headlights.",
  icon: Sun,
  price: "From ₹999"
}, {
  title: "Engine Bay Cleaning",
  description: "Professional engine bay cleaning and dressing for a pristine look.",
  icon: Wrench,
  price: "From ₹1,499"
}, {
  title: "Water Spot Removal",
  description: "Remove stubborn water spots and mineral deposits from paint.",
  icon: Droplets,
  price: "From ₹1,999"
}];
const Services = () => {
  return <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img initial={{
        scale: 1.1
      }} animate={{
        scale: 1
      }} transition={{
        duration: 1.5
      }} src={heroCar} alt="Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom section-padding !pb-12">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3,
            duration: 0.6
          }}>
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                What We Offer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4">
                Our <span className="text-primary">Services</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Premium Detailing Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose from our carefully crafted detailing services designed to meet every need.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {allServices.map((service, index) => <motion.div key={service.id} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.15,
            duration: 0.6
          }}>
                <Link to={`/services/${service.id}`}>
                  <motion.div whileHover={{
                y: -8
              }} className="bento-card group h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      <motion.img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-sm font-medium">
                        {service.price}
                      </div>

                      <motion.div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" whileHover={{
                    scale: 1.1
                  }}>
                        <ArrowUpRight size={18} className="text-primary-foreground" />
                      </motion.div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <service.icon size={20} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your detailing experience with our specialized add-on services.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => <motion.div key={service.title} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            duration: 0.6
          }} whileHover={{
            y: -4
          }} className="bento-card p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <span className="text-primary font-semibold">{service.price}</span>
              </motion.div>)}
          </div>
        </div>
      </section>

      <Footer />
    </main>;
};
export default Services;