import React, { useEffect, useRef, useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, FileText, Sun, Moon } from 'lucide-react';
import { motion, useAnimation, AnimatePresence, useReducedMotion } from 'framer-motion';

const Footer: React.FC = () => {
  const links = [
    { name: 'Portfolio', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Email', icon: Mail, href: `mailto:${CONTACT_INFO.email}` },
    { name: 'LinkedIn', icon: Linkedin, href: CONTACT_INFO.linkedin },
    { name: 'GitHub', icon: Github, href: CONTACT_INFO.github }
  ];

  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const [downloading, setDownloading] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // entrance sequence
    if (!prefersReducedMotion) controls.start('visible');
    else controls.set('visible');
  }, [controls, prefersReducedMotion]);

  // small micro-interaction for CV
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    if (!prefersReducedMotion) await controls.start({ scale: [1, 0.98, 1.02, 1], transition: { duration: 0.45 } });
    // replace with real resume file in /public
    setTimeout(() => setDownloading(false), 1200);
  };

  // motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren' } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } }
  };

  const socialHover = { scale: 1.12, rotate: 8 };

  // decorative morphing blob path states (2 shapes)
  const blobA = 'M60,-64.2C77.4,-53.6,86.6,-32.7,86.6,-14.1C86.6,4.5,77.4,20.8,64,33.1C50.6,45.3,33,53.6,14.3,61.8C-4.4,70,-23.2,78.2,-38.3,72.7C-53.5,67.2,-64,47,-71.1,26.1C-78.2,5.2,-82.9,-16.2,-74.8,-34.5C-66.7,-52.9,-45.9,-68.2,-24.1,-74.1C-2.4,-80,19.4,-76.6,37.8,-68.9C56.3,-61.3,77.4,-53.6,60,-64.2Z';
  const blobB = 'M46.3,-51.4C60.2,-40.9,69.1,-25.3,74,-6.9C78,11.5,77.9,33.8,67.6,46.3C57.3,58.8,36.8,61.6,17.2,64.9C-2.4,68.3,-21.8,72.1,-35.6,64.5C-49.3,56.9,-57.6,37.8,-63.7,17.8C-69.9,-2.2,-73.8,-23.2,-66.7,-37.8C-59.6,-52.4,-41.6,-60.5,-23.3,-67.2C-5,-73.9,13.7,-79.1,29.7,-72.8C45.6,-66.6,32.4,-62,46.3,-51.4Z';

  return (
    <motion.footer
      id="contact"
      className={`relative overflow-hidden pt-24 pb-12 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-slate-900'}`}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      aria-label="Contact & footer"
    >
      {/* Decorative background: morphing svg blob + subtle grid */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <svg viewBox="-100 -100 200 200" className="absolute -left-10 top-6 w-[36rem] h-[36rem] opacity-20" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="gFooter" x1="0" x2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <motion.path
            d={blobA}
            fill="url(#gFooter)"
            transform="translate(0,0) scale(0.9)"
            animate={{ d: [blobA, blobB, blobA] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute right-8 bottom-20 hidden lg:block">
          <div className="w-36 h-36 rounded-full blur-3xl mix-blend-screen" style={{ background: 'linear-gradient(90deg,#ec4899aa,#7c3aedaa)' }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Let's build something
              <br />beautiful together
            </h2>
            <p className="text-slate-400 max-w-md mb-6">Available for freelance projects, collaborations, and full-time roles. I bring UI + frontend engineering + AI experience.</p>

            <div className="flex items-center gap-4">
              <motion.a
                href={`mailto:${CONTACT_INFO.email}`}
                whileHover={{ x: 6 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg"
              >
                Contact Me
                <ArrowUpRight size={16} />
              </motion.a>

              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/6 backdrop-blur-sm border border-white/6 text-sm"
                whileHover={{ scale: 1.03 }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider">Quick links</h3>
              <ul className="space-y-3">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <motion.a
                      href={link.href}
                      className="flex items-center justify-between w-full text-slate-400 hover:text-white transition-colors"
                      whileHover={!prefersReducedMotion ? { x: 6 } : undefined}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-slate-500">→</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider">Connect</h3>
              <ul className="space-y-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <li key={idx} className="flex items-center">
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                        whileHover={!prefersReducedMotion ? socialHover : undefined}
                      >
                        <span className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center text-sm">
                          <Icon size={14} />
                        </span>
                        <div className="flex-1">
                          <div className="text-sm">{social.name}</div>
                          <div className="text-xs text-slate-500">{social.href.replace(/(^\w+:|^)\/\//, '')}</div>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-px bg-white/6 mb-10" />

        <motion.div className="flex flex-col md:flex-row items-center justify-between gap-6" variants={containerVariants}>
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="text-lg font-bold">Vijay Martin</div>
            <div className="text-sm text-slate-500">© {new Date().getFullYear()}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin size={14} />
              <span>{CONTACT_INFO.location}</span>
            </div>

            <motion.a
              href="#"
              onClick={handleDownload}
              className="inline-flex items-center gap-3 px-4 py-2 text-sm rounded-full bg-white/3 border border-white/6"
              whileHover={!prefersReducedMotion ? { scale: 1.04 } : undefined}
              aria-busy={downloading}
            >
              <FileText size={14} />
              <span>{downloading ? 'Preparing...' : 'Download CV'}</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-10 pt-6">
          <p className="text-xs text-slate-500">Built with React, TypeScript & Tailwind CSS • Crafted with ♥︎</p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.footer>
  );
};

export default Footer;
