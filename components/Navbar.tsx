import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'paintings', path: '/gallery' },
    { name: 'shop', path: '/shop' },
    { name: 'contact', path: '/contact' },
  ];

  const socialLinkClass = "hover:opacity-60 transition-opacity cursor-pointer block";

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled || isOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo / Name */}
        <Link to="/" className={`text-2xl md:text-3xl font-light tracking-tight z-50 transition-colors ${
          (scrolled || isOpen) || location.pathname !== '/' ? 'text-zinc-900' : 'text-zinc-900 md:text-white'
        }`}>
          aditya gupta
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-light tracking-widest hover:text-zinc-500 transition-colors ${
                 location.pathname === '/' && !scrolled ? 'text-white/90' : 'text-zinc-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className={`flex space-x-4 pl-4 border-l ${location.pathname === '/' && !scrolled ? 'border-white/30 text-white' : 'border-zinc-300 text-zinc-800'}`}>
            <a 
              href="https://www.instagram.com/_aaditya67/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={socialLinkClass} 
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://x.com/Aditxgupta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={socialLinkClass} 
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden z-50 focus:outline-none ${
             (scrolled || isOpen) || location.pathname !== '/' ? 'text-zinc-900' : 'text-white'
          }`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-2xl font-light tracking-widest text-zinc-900"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-8 mt-8 text-zinc-600">
               <a href="https://www.instagram.com/_aaditya67/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={24} /></a>
               <a href="https://x.com/Aditxgupta" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={24} /></a>
               <a href="mailto:aditxgupta@gmail.com" aria-label="Email"><Mail size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;