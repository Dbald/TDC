import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import TDCLogo from '@/components/TDCLogo';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Close menu when clicking on a link
  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300",
      scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : "bg-primary/80 backdrop-blur-md border-b border-white/5"
    )}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="The Devinci Code logo">
            <TDCLogo className="h-8 md:h-10" />
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none" 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleLinkClick('about')}
              className="font-heading text-white/80 hover:text-white transition-colors duration-300 hover:text-shadow-sm"
            >
              About
            </button>
            <button 
              onClick={() => handleLinkClick('projects')}
              className="font-heading text-white/80 hover:text-white transition-colors duration-300 hover:text-shadow-sm"
            >
              Projects
            </button>
            <button 
              onClick={() => handleLinkClick('speaking')}
              className="font-heading text-white/80 hover:text-white transition-colors duration-300 hover:text-shadow-sm"
            >
              Speaking
            </button>
            <button 
              onClick={() => handleLinkClick('tutorials')}
              className="font-heading text-white/80 hover:text-white transition-colors duration-300 hover:text-shadow-sm"
            >
              Tutorials
            </button>
            <Button 
              onClick={() => handleLinkClick('contact')}
              variant="outline" 
              className="font-heading text-white border-[#ffde59] hover:bg-[#ffde59]/10 transition-all duration-300 neon-border rounded-md"
            >
              Contact
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden bg-dark w-full border-b border-white/5",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => handleLinkClick('about')}
              className="font-heading text-white/80 hover:text-white py-2 transition-colors duration-300"
            >
              About
            </button>
            {/* <button 
              onClick={() => handleLinkClick('projects')}
              className="font-heading text-white/80 hover:text-white py-2 transition-colors duration-300"
            >
              Projects
            </button> */}
            <button 
              onClick={() => handleLinkClick('speaking')}
              className="font-heading text-white/80 hover:text-white py-2 transition-colors duration-300"
            >
              Speaking
            </button>
            {/* <button 
              onClick={() => handleLinkClick('tutorials')}
              className="font-heading text-white/80 hover:text-white py-2 transition-colors duration-300"
            >
              Tutorials
            </button> */}
            <Button 
              onClick={() => handleLinkClick('contact')}
              variant="outline"
              className="font-heading text-white border-[#ffde59] hover:bg-[#ffde59]/10 transition-all duration-300 inline-block text-center"
            >
              Contact
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
