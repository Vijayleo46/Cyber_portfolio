
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}
      >
        <div className={`
            flex items-center justify-between px-6 py-3 rounded-full 
            ${isScrolled ? 'bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl w-full max-w-5xl' : 'bg-transparent w-full max-w-7xl'}
            transition-all duration-500
        `}>
            {/* Logo */}
            <a href="#" className="text-xl font-bold text-white tracking-tighter hover:text-indigo-400 transition-colors">
                VM<span className="text-indigo-500">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded-full px-2 py-1 border border-white/5 backdrop-blur-md">
                {navLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href}
                        className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* CTA Button */}
            <a 
                href="#contact"
                className="hidden md:block bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-400 hover:text-white transition-colors"
            >
                Contact
            </a>

            {/* Mobile Toggle */}
            <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-3xl font-bold text-white hover:text-indigo-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
               <a 
                  href="#contact"
                  className="text-xl font-bold text-indigo-400 mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Get in Touch
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
