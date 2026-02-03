import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, Rocket, Zap, Code2, Cpu, Globe, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = projectsRef.current;
    if (!scrollContainer) return;

    const startAutoScroll = () => {
      if (scrollIntervalRef.current) return;
      scrollIntervalRef.current = setInterval(() => {
        if (!isPaused && scrollContainer) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;
          if (currentScroll >= maxScroll - 10) {
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
          }
        }
      }, 4000);
    };

    startAutoScroll();
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isPaused]);

  return (
    <section id="projects" className="py-32 bg-transparent relative overflow-hidden">

      {/* Background HUD Grid (Local) */}
      <div className="absolute inset-x-0 top-0 h-px bg-emerald-500/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-emerald-500/20" />

      <div className="container mx-auto px-6 relative z-10">

        {/* OS Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={18} className="text-emerald-500" />
              <span className="text-emerald-500/60 font-mono text-xs tracking-widest uppercase">
                system.executing_archives
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              PROJECT <span className="text-transparent bg-clip-text bg-emerald-400" style={{ WebkitTextStroke: '1px rgba(16,185,129,0.5)' }}>REGISTRY</span>
            </h2>
            <p className="text-emerald-50/40 mt-6 font-mono text-sm leading-relaxed border-l-2 border-emerald-500/20 pl-6">
              Compiling experimental builds and production-grade applications.
              Hover to access decentralized repository nodes.
            </p>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-emerald-500/30 font-mono uppercase">Buffer_Status</span>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-3 h-1 ${i < 4 ? 'bg-emerald-500/40' : 'bg-emerald-500/10 animate-pulse'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative group/container">
          {/* Perspective Overlay */}
          <div className="absolute inset-y-0 -left-6 w-24 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 -right-6 w-24 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

          <div
            ref={projectsRef}
            className="flex gap-10 overflow-x-auto pb-20 pt-10 px-4 no-scrollbar snap-x snap-mandatory"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 w-[400px] snap-center group/card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Glass Card */}
                <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/5 group-hover/card:border-emerald-500/30 transition-all duration-700 overflow-hidden shadow-2xl">

                  {/* Tech Brackets (Corners) */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-emerald-500/20 group-hover/card:border-emerald-500 transition-colors" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-emerald-500/20 group-hover/card:border-emerald-500 transition-colors" />

                  {/* Project Preview */}
                  <div className="relative h-60 overflow-hidden m-4 rounded-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-emerald-900/40 mix-blend-overlay opacity-0 group-hover/card:opacity-100 transition-opacity" />

                  </div>

                  {/* Project Content */}
                  <div className="p-8 pt-2">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white uppercase tracking-tighter group-hover/card:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-[10px] font-mono text-emerald-500/20">0{idx + 1}</div>
                    </div>

                    <p className="text-emerald-50/40 text-sm leading-relaxed mb-6 font-mono h-12 overflow-hidden">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8 h-12 overflow-hidden">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-emerald-500/60 px-2 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded uppercase">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] font-mono text-emerald-500/30 px-2 py-1">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    {/* Action HUD */}
                    <div className="flex items-center gap-4">
                      <a
                        href={project.demoUrl || "#"}
                        className="flex-1 py-3 bg-emerald-500 text-black text-xs font-black uppercase text-center rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      >
                        Launch_Build
                      </a>
                      <a
                        href={project.githubUrl || "#"}
                        className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 text-white transition-all"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Animated Scan Line */}
                  <div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Control Bar */}
        <div className="mt-12 flex justify-between items-center text-[10px] font-mono text-emerald-500/20 uppercase tracking-[0.4em]">
          <div className="flex gap-4">
            <span className="text-emerald-500/40 animate-pulse">● System_Live</span>
            <span>Uptime: 24h 42m</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="hidden sm:inline">Stream_Index</span>
            <div className="w-24 h-1 bg-emerald-500/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500/40"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
    </section>
  );
};

export default Projects;
