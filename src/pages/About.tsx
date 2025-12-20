import { motion } from "framer-motion";
import { Award, Users, Clock, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import greenPorsche from "@/assets/green-porsche.jpg";
import detailingProcess from "@/assets/detailing-process.jpg";

const stats = [
  { value: "500+", label: "Cars Detailed", icon: Award },
  { value: "5+", label: "Years Experience", icon: Clock },
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "100%", label: "Satisfaction", icon: Target },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={greenPorsche}
          alt="About Cozi Cars"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom section-padding !pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Our Story
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4">
                About <span className="text-primary">Cozi Cars</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Passion for <span className="text-primary">Perfection</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in the heart of Guwahati, Cozi Cars was born from a deep passion for automotive excellence. We believe every car deserves to look its absolute best, and we've made it our mission to deliver that promise with every service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of certified detailing professionals combines years of experience with cutting-edge techniques and premium products. From luxury sports cars to family vehicles, we treat every car with the same level of care and attention to detail.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At Cozi Cars, we don't just clean cars – we restore them to their former glory. Our comprehensive services address every aspect of your vehicle's appearance, ensuring a result that exceeds expectations every time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={detailingProcess}
                  alt="Our detailing process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-3xl blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bento-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We never compromise on quality. Every product and technique we use is carefully selected to deliver the best results.",
              },
              {
                title: "Attention to Detail",
                description: "The small details make the biggest difference. We obsess over every corner, crevice, and surface.",
              },
              {
                title: "Customer Satisfaction",
                description: "Your satisfaction is our success. We work until you're completely happy with the results.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bento-card p-8 text-center"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
