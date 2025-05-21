import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/subscribe", { email });
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="bg-gradient-to-r from-[#B026FF]/20 to-[#00FFFF]/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(176,38,255,0.2),transparent_50%),radial-gradient(circle_at_70%_65%,rgba(0,255,255,0.2),transparent_50%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Stay Updated with the Latest in <span className="gradient-text">WebXR</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Subscribe to my newsletter for exclusive tutorials, project insights, and early access to 
              workshops and speaking engagements.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-6 py-6 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-[#B026FF] text-white placeholder:text-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-6 bg-[#00FFFF] text-[#121212] font-heading font-medium rounded-md hover:bg-[#00FFFF]/90 transition-all duration-300 whitespace-nowrap flex justify-center items-center w-full sm:w-auto"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </motion.form>
            
            <motion.p 
              className="text-sm text-white/60 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              I respect your privacy. Unsubscribe at any time.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
