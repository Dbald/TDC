import { Button } from "@/components/ui/button";
import HeroCanvas from "@/components/canvas/HeroCanvas";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroCanvas />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h4 
            className="font-mono text-[#B026FF] mb-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to
          </motion.h4>
          
          <motion.h1 
            className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-text-shine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            The Devinci Code
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Where creativity, innovation, and education intersect to create immersive experiences 
            at the forefront of WebXR and immersive technology.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              onClick={() => scrollToSection('projects')}
              className="inline-block bg-[#B026FF] text-white font-heading font-medium px-8 py-6 rounded-md hover:bg-[#B026FF]/90 transition-all duration-300 text-center"
            >
              Explore Projects
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="inline-block bg-transparent border border-white/30 text-white font-heading font-medium px-8 py-6 rounded-md hover:border-[#00FFFF] hover:text-[#00FFFF] transition-all duration-300 text-center"
            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <button 
          onClick={() => scrollToSection('about')}
          aria-label="Scroll down" 
          className="text-white/50 hover:text-white transition-colors duration-300"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
