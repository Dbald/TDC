import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const About = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                alt="Creative technologist working with immersive technology" 
                className="w-full h-full object-cover" 
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-[#00FFFF] mb-4 tracking-wider">About Devin</h4>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Crafting the Future of <span className="gradient-text">Immersive Technology</span>
            </h2>
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              I'm Devin Baldwin, an educator, speaker, and immersive technology specialist with a passion for pushing 
              the boundaries of what's possible in WebXR and immersive experiences.
            </p>
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              With over a decade of experience in creative technology, I've worked with leading brands, spoken at 
              international conferences, and developed educational content that empowers the next generation of XR creators.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="block text-3xl font-bold text-[#B026FF] mb-2">10+</span>
                <span className="text-sm text-white/60">Years Experience</span>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="block text-3xl font-bold text-[#00FFFF] mb-2">50+</span>
                <span className="text-sm text-white/60">Speaking Events</span>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="block text-3xl font-bold text-[#39FF14] mb-2">100+</span>
                <span className="text-sm text-white/60">XR Projects</span>
              </motion.div>
            </div>
            
            <button 
              onClick={() => scrollToSection('speaking')}
              className="inline-flex items-center group"
            >
              <span className="font-heading text-white group-hover:text-[#B026FF] transition-colors duration-300 mr-2">
                Learn more about my work
              </span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
