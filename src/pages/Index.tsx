import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ContactSection from "@/components/ContactSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <ContactSection />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
