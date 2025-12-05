
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Layers, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white mb-6"
            >
                FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">PROJECTS</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 max-w-2xl mx-auto text-lg"
            >
                Explore a collection of high-impact applications demonstrating full-stack capability and AI integration.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-colors duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredIndex === idx ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                
                {/* Floating Tech Stack */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                        <div key={tech} className="bg-slate-950/70 backdrop-blur-md text-xs font-semibold text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20">
                            {tech}
                        </div>
                    ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 relative">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                </p>

                <div className="mt-auto space-y-3">
                    <div className="h-px w-full bg-slate-800 group-hover:bg-indigo-500/30 transition-colors" />
                    <div className="flex justify-between items-center pt-2">
                        <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors">
                            <Layers size={16} /> Details
                        </button>
                        <button className="bg-white text-slate-950 p-2 rounded-full hover:bg-indigo-400 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-indigo-500/0 rounded-2xl pointer-events-none group-hover:border-indigo-500/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
