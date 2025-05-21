import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TUTORIALS } from "@/lib/utils";

const Tutorials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "WebXR", "AR", "VR", "3D"];

  const filteredTutorials = activeCategory === "All"
    ? TUTORIALS
    : TUTORIALS.filter(tutorial => tutorial.category === activeCategory);

  return (
    <section id="tutorials" className="py-20 md:py-32 relative bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="font-mono text-[#ffde59] mb-4 tracking-wider">Learn & Grow</h4>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Tutorials & <span className="gradient-text">Resources</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Explore tutorials, articles, and resources designed to help you master WebXR 
            development and immersive technology concepts.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex bg-white/5 p-1 rounded-full">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-heading transition-colors ${
                  activeCategory === category 
                  ? "bg-[#ffde59] text-[#121212]" 
                  : "text-white hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, index) => (
            <motion.div 
              key={tutorial.id}
              className="card-hover bg-primary border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent/0"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className={`inline-block px-2 py-1 text-xs font-mono rounded-md ${
                    tutorial.level === "Beginner" 
                      ? "bg-[#00FFFF]/20 text-[#00FFFF]" 
                      : tutorial.level === "Intermediate"
                        ? "bg-[#B026FF]/20 text-[#B026FF]"
                        : "bg-[#39FF14]/20 text-[#39FF14]"
                  }`}>
                    {tutorial.level}
                  </span>
                  <span className="text-white/80 text-sm">{tutorial.duration}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-2">{tutorial.title}</h3>
                <p className="text-white/70 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-[#B026FF]">{tutorial.date}</span>
                  <a href={tutorial.link} className="inline-flex items-center text-[#00FFFF] group">
                    <span className="group-hover:underline mr-2">Read Tutorial</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline" 
            className="inline-flex justify-center items-center bg-transparent border border-white/30 text-white font-heading font-medium px-8 py-6 rounded-md hover:border-[#00FFFF] hover:bg-[#00FFFF]/5 transition-all duration-300"
          >
            Browse All Tutorials
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Tutorials;
