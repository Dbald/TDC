import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Calendar, MapPin } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Message failed to send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono text-[#ffde59] mb-4 tracking-wider">Get in Touch</h4>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Let's Create Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Whether you're looking to book a speaking engagement, explore a potential collaboration, 
              or just want to chat about immersive technology, I'd love to hear from you.
            </p>
            
            <div className="space-y-6 mb-8">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#ffde59]/10 p-3 rounded-lg">
                  <Mail className="text-[#ffde59] h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold mb-1">Email</h3>
                  <a 
                    href="mailto:itsdevincicode@gmail.com" 
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    hello@thedevincicode.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#00FFFF]/10 p-3 rounded-lg">
                  <Calendar className="text-[#00FFFF] h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold mb-1">Schedule a Call</h3>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    Book a 30-minute consultation
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#39FF14]/10 p-3 rounded-lg">
                  <MapPin className="text-[#39FF14] h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold mb-1">Location</h3>
                  <p className="text-white/70">
                    Oakland, CA (Available for remote and in-person engagements)
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* <a 
                href="#" 
                className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors duration-300" 
                aria-label="Twitter"
              >
                <FaTwitter className="text-white text-xl" />
              </a> */}
              <a 
                href="https://www.linkedin.com/in/itsdevinci/" 
                className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors duration-300" 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white text-xl" />
              </a>
              <a 
                href="https://github.com/Dbald/" 
                className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors duration-300" 
                aria-label="GitHub"
              >
                <FaGithub className="text-white text-xl" />
              </a>
              <a 
                href="https://www.youtube.com/@thedevincicode" 
                className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors duration-300" 
                aria-label="YouTube"
              >
                <FaYoutube className="text-white text-xl" />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form 
              className="bg-white/5 rounded-xl p-8 border border-white/10"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="name" className="block text-white/80 mb-2 font-heading">Name</Label>
                  <Input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-6 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-[#B026FF] text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-white/80 mb-2 font-heading">Email</Label>
                  <Input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-6 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-[#B026FF] text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="subject" className="block text-white/80 mb-2 font-heading">Subject</Label>
                <Select onValueChange={handleSelectChange} value={formData.subject}>
                  <SelectTrigger 
                    id="subject"
                    className="w-full px-4 py-6 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-[#B026FF] text-white appearance-none"
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speaking">Speaking Inquiry</SelectItem>
                    <SelectItem value="project">Project Collaboration</SelectItem>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="message" className="block text-white/80 mb-2 font-heading">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-[#B026FF] text-white resize-none"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 bg-[#ffde59] text-black font-heading font-medium rounded-md hover:bg-[#ffde59]/90 transition-all duration-300 flex justify-center items-center"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
