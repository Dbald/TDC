import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Speaking = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="speaking" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-[#B026FF] mb-4 tracking-wider">Speaking & Workshops</h4>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Sharing Knowledge & <span className="gradient-text">Inspiration</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              I bring my expertise in WebXR, immersive technology, and creative coding to conferences, 
              educational institutions, and corporate events worldwide.
            </p>
            
            <div className="space-y-6 mb-8">
              <motion.div 
                className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="font-heading text-xl font-bold mb-2">Future of WebXR</h3>
                <p className="text-white/70 mb-3">
                  An exploration of emerging trends and technologies in the WebXR space and how 
                  they will shape the future of the web.
                </p>
                <span className="text-sm font-mono text-[#00FFFF]">60-90 minutes · Interactive Demo</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="font-heading text-xl font-bold mb-2">Immersive UX Design</h3>
                <p className="text-white/70 mb-3">
                  Key principles and patterns for designing compelling user experiences in AR, VR, 
                  and mixed reality environments.
                </p>
                <span className="text-sm font-mono text-[#39FF14]">Half-day Workshop · Hands-on</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="font-heading text-xl font-bold mb-2">WebXR for Beginners</h3>
                <p className="text-white/70 mb-3">
                  A practical introduction to WebXR development, covering the fundamentals of 
                  creating browser-based AR and VR experiences.
                </p>
                <span className="text-sm font-mono text-[#B026FF]">Full-day Workshop · Coding</span>
              </motion.div>
            </div>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              className="inline-flex justify-center items-center bg-[#B026FF] text-white font-heading font-medium px-8 py-6 rounded-md hover:bg-[#B026FF]/90 transition-all duration-300"
            >
              Book Devin for Your Event
            </Button>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                alt="Speaker presenting at a technology conference" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
            </div>
            <motion.div 
              className="absolute -top-6 -right-6 bg-[#B026FF]/10 backdrop-blur-sm border border-[#B026FF]/20 rounded-lg p-6 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-white/90 italic mb-4">
                "Devin's workshop on WebXR fundamentals was the perfect mix of technical depth and 
                approachable content. Our team left inspired and equipped with practical skills."
              </blockquote>
              <div className="font-mono text-sm text-[#B026FF]">— Technology Director, Major Tech Company</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Speaking;
