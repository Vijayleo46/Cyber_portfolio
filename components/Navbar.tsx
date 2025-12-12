import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}
      >
        <div
          className={`
            flex items-center justify-between px-6 py-3 rounded-full 
            ${isScrolled ? 'bg-dark-200/90 backdrop-blur-xl border border-dark-100 shadow-2xl w-full max-w-5xl' : 'bg-transparent w-full max-w-7xl'}
            transition-all duration-500
          `}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold text-white tracking-tighter hover:text-indigo-400 transition-colors flex items-center gap-1"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            VM<span className="text-indigo-500">.</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-dark-300/60 rounded-full px-2 py-1 border border-white/5 backdrop-blur-md">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-slate-300 relative overflow-hidden rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="hidden md:inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-indigo-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0px 0px 20px rgba(99,102,241,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.a>

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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center md:hidden"
          >
            <motion.div
              className="flex flex-col gap-8 text-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-bold text-white hover:text-indigo-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="text-xl font-bold text-indigo-400 mt-4"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
