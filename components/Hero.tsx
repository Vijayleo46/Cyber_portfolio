
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Github, ArrowRight, Sparkles, Code2, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        
        {/* Animated Orbs */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3], 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] mix-blend-screen" 
        />
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2], 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] mix-blend-screen" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md text-indigo-300 font-medium text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:border-indigo-500/50 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Available for innovative projects
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              VIJAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">MARTIN</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
              Architecting the future with <strong className="text-white font-medium">Full-Stack Precision</strong> and <strong className="text-white font-medium">AI Intelligence</strong>.
            </p>

            <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.a 
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
                >
                    View My Work
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                    href={CONTACT_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
                >
                    <Github size={20} />
                    GitHub Profile
                </motion.a>
            </motion.div>
        </motion.div>

        {/* Floating Icons Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20 hidden lg:block">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Code2 size={40} className="text-indigo-400" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <Cpu size={40} className="text-purple-400" />
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                    <Globe size={40} className="text-cyan-400" />
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                    <Sparkles size={40} className="text-pink-400" />
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
