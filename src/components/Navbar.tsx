import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Services",
    path: "/services"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"}`}>
      <nav className="container-custom section-padding !py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.span className="text-2xl font-bold tracking-tight" whileHover={{
            scale: 1.02
          }}>
              <span className="text-foreground">Berkos</span>
              <span className="text-primary">Detailing</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`relative text-sm font-medium transition-colors duration-300 ${location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {link.name}
                {location.pathname === link.path && <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </Link>)}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/booking">
              <Button variant="sage" size="sm">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => <motion.div key={link.name} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.1
          }}>
                  <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 text-lg font-medium ${location.pathname === link.path ? "text-primary" : "text-muted-foreground"}`}>
                    {link.name}
                  </Link>
                </motion.div>)}
              <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="sage" className="w-full mt-4">
                  Book Now
                </Button>
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.header>;
};
export default Navbar;