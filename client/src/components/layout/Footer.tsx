import { Link } from 'wouter';
import TDCLogo from '@/components/TDCLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the email to a backend service
    console.log('Subscribed with:', email);
    setEmail('');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" aria-label="The Devinci Code">
              <TDCLogo className="h-12 mb-6" />
            </Link>
            <p className="text-white/70 mb-6">
              Exploring the intersection of creativity, innovation, and education in immersive technology.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-white/50 hover:text-[#B026FF] transition-colors duration-300" aria-label="Twitter">
                <FaTwitter className="text-lg" />
              </a> */}
              <a href="https://www.linkedin.com/in/itsdevinci/" className="text-white/50 hover:text-[#B026FF] transition-colors duration-300" aria-label="LinkedIn">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="https://github.com/Dbald/" className="text-white/50 hover:text-[#B026FF] transition-colors duration-300" aria-label="GitHub">
                <FaGithub className="text-lg" />
              </a>
              <a href="https://www.youtube.com/@thedevincicode" className="text-white/50 hover:text-[#B026FF] transition-colors duration-300" aria-label="YouTube">
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  About
                </button>
              </li>
              {/* <li>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Projects
                </button>
              </li> */}
              <li>
                <button 
                  onClick={() => scrollToSection('speaking')} 
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Speaking
                </button>
              </li>
              {/* <li>
                <button 
                  onClick={() => scrollToSection('tutorials')} 
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Tutorials
                </button>
              </li> */}
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              {/* <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Blog</a></li> */}
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Press Kit</a></li>
              {/* <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Privacy Policy</a></li> */}
              {/* <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Terms of Service</a></li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Subscribe</h4>
            <p className="text-white/70 mb-4">
              Get the latest updates and news directly to your inbox.
            </p>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-[#B026FF] text-white placeholder:text-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="w-full py-2.5 bg-[#B026FF] text-white font-heading font-medium rounded-md hover:bg-[#B026FF]/90 transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} The Devinci Code. All rights reserved.
          </p>
          <p className="text-white/50 text-sm mt-4 md:mt-0">
            Designed with <span className="text-[#B026FF]">❤</span> by Devin Baldwin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
