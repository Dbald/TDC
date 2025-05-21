import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/utils";

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 relative bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="font-mono text-[#ffde59] mb-4 tracking-wider">Portfolio</h4>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Explore a collection of WebXR experiences, immersive applications, and creative 
            technology projects that showcase the intersection of art and innovation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              className="card-hover bg-primary border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="inline-block px-2 py-1 text-xs font-mono bg-[#B026FF]/20 text-[#B026FF] rounded-md">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">
                  {project.description}
                </p>
                <a href={project.link} className="inline-flex items-center text-[#00FFFF] group">
                  <span className="group-hover:underline mr-2">View Case Study</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
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
            className="inline-flex justify-center items-center bg-transparent border border-white/30 text-white font-heading font-medium px-8 py-6 rounded-md hover:border-[#B026FF] hover:bg-[#B026FF]/5 transition-all duration-300"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
