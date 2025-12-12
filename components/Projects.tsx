
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Layers, Github, Rocket, Zap, Star, Code, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const featureCounts = PROJECTS.map((p) => p.features?.length ?? 0);
    const totalFeatures = featureCounts.reduce((sum, n) => sum + n, 0);

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'baseline',
        hypothesisId: 'H3',
        location: 'Projects.tsx:15',
        message: 'Projects density and features',
        data: {
          totalProjects: PROJECTS.length,
          avgFeatures: Number((totalFeatures / PROJECTS.length).toFixed(2)),
          maxFeatures: Math.max(...featureCounts),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    fetch('http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0', {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'baseline-compat',
        hypothesisId: 'H3',
        location: 'Projects.tsx:31',
        message: 'Projects density (compat)',
        data: {
          totalProjects: PROJECTS.length,
          maxFeatures: Math.max(...featureCounts),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    const beaconPayload = {
      sessionId: 'debug-session',
      runId: 'baseline-beacon',
      hypothesisId: 'H3',
      location: 'Projects.tsx:47',
      message: 'Projects density beacon',
      data: {
        totalProjects: PROJECTS.length,
        maxFeatures: Math.max(...featureCounts),
      },
      timestamp: Date.now(),
    };
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0', new Blob([JSON.stringify(beaconPayload)], { type: 'application/json' }));
      }
    } catch {
      // silent
    }
    // #endregion
  }, []);

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

          // Smooth scroll to next position
          if (currentScroll >= maxScroll) {
            // Reset to start smoothly
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll by card width (380px + gap)
            scrollContainer.scrollBy({ left: 388, behavior: 'smooth' });
          }
        }
      }, 3000); // Change card every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startProjectAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startProjectAnimation = async () => {
    try {
      // Import Motion One locally (animate + stagger helpers)
      const { animate, stagger } = await import('motion');
      const anim = animate as any;
      const stag = stagger as any;
      
      if (!pathRef.current || !projectsRef.current) return;

      // Animate the path drawing by stroke dash offset
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${pathLength}`;
      pathRef.current.style.strokeDashoffset = `${pathLength}`;
      anim(
        pathRef.current,
        { strokeDashoffset: [pathLength, 0] },
        { duration: 3, easing: 'linear', delay: 0.5 }
      );

      // Floating elements gentle drift
      const floatingElements = Array.from(document.querySelectorAll('.floating-element'));
      floatingElements.forEach((element, index) => {
        anim(
          element as HTMLElement,
          { translateX: [-12, 12], translateY: [-16, 16], rotate: [-6, 6] },
          { duration: 8 + index, easing: 'ease-in-out', direction: 'alternate', loop: true, delay: index * 0.4 }
        );
      });

      // Animate project cards with staggered entrance
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      anim(
        projectCards,
        { translateX: [-150, 0], translateY: [80, 0], opacity: [0, 1], scale: [0.7, 1], rotate: [8, 0] },
        { easing: 'cubic-bezier(.2,1,.3,1)', duration: 1.2, delay: stag(0.3, { start: 1.5 }) }
      );

      // Continuous floating animation for icons
      anim(
        '.project-icon',
        { translateY: [-12, 12], rotate: [-8, 8], scale: [0.95, 1.05] },
        { easing: 'ease-in-out', direction: 'alternate', loop: true, duration: 4, delay: stag(0.4) }
      );

      // Sparkle effects
      anim(
        '.sparkle-effect',
        { scale: [0, 1.4, 0], opacity: [0, 1, 0], rotate: [0, 180, 360] },
        { easing: 'ease-in-out', duration: 2, loop: true, delay: stag(0.6, { start: 2 }) }
      );

    } catch (error) {
      console.log('Anime.js not loaded, using fallback animations');
      // Fallback to CSS animations if anime.js fails to load
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      projectCards?.forEach((card, index) => {
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
          (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
        }, 500 + (index * 200));
      });
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-gradient-to-br from-black via-dark-500 to-dark-300 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-ping" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-50 animate-bounce" />
      </div>

      {/* Enhanced Animated SVG Path with Motion Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main animated path */}
          <path
            ref={pathRef}
            d="M100,500 Q300,200 600,400 Q900,150 1100,350"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="15,10"
            opacity="0.8"
            filter="url(#glow)"
          />
          
          {/* Secondary decorative paths */}
          <path
            d="M150,450 Q400,250 700,380 Q950,180 1050,320"
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.4"
          />
          <path
            d="M80,520 Q350,300 650,420 Q880,200 1120,380"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8,4"
            opacity="0.3"
          />
        </svg>
        
        {/* Floating elements that follow the motion path */}
        <div className="floating-element absolute w-6 h-6 -ml-3 -mt-3">
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg">
            <Rocket size={16} className="text-white p-1" />
          </div>
        </div>
        
        <div className="floating-element absolute w-5 h-5 -ml-2.5 -mt-2.5">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg">
            <Code size={12} className="text-white p-0.5" />
          </div>
        </div>
        
        <div className="floating-element absolute w-4 h-4 -ml-2 -mt-2">
          <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
            <Sparkles size={10} className="text-white p-0.5" />
          </div>
        </div>
      </div>

      {/* Sparkle Effects */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="sparkle-effect absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            opacity: 0
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-6"
            >
                <Rocket className="text-indigo-400 project-icon" size={32} />
                <motion.h2 
                    className="text-4xl md:text-6xl font-black text-white"
                >
                    FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">PROJECTS</span>
                </motion.h2>
                <Zap className="text-purple-400 project-icon" size={32} />
            </motion.div>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed"
            >
                Journey through my digital creations where <span className="text-indigo-400 font-semibold">innovation meets execution</span>. 
                Each project represents a milestone in my development adventure.
            </motion.p>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Scroll Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrollable Projects */}
          <div 
            ref={projectsRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              className="project-card group relative flex flex-col items-center flex-shrink-0 w-[380px] snap-center"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px", amount: 0.3 }}
              transition={{ 
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Browser Mockup Container */}
              <div className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl overflow-hidden border border-gray-700 group-hover:border-indigo-500/50 transition-all duration-500 shadow-2xl">
                {/* Browser Header */}
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 mx-4 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400 truncate">
                    {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                  </div>
                </div>

                {/* Project Screenshot */}
                <div className="relative h-64 overflow-hidden bg-black">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ 
                      scale: hoveredIndex === idx ? 1.1 : 1,
                      filter: hoveredIndex === idx ? "brightness(1.1)" : "brightness(0.9)"
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ExternalLink size={28} className="text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full text-center mt-6 space-y-4">
                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-500">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed px-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center gap-2 px-4">
                  {project.technologies.map((tech, techIdx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + techIdx * 0.05 }}
                      className="text-xs font-medium text-gray-300 px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 pt-2">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                    >
                      Demo
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white text-sm font-semibold rounded-full transition-all duration-300"
                    >
                      Repository
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-2 mt-8"
          >
            {PROJECTS.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-2 h-2 rounded-full bg-gray-600"
                whileHover={{ scale: 1.5, backgroundColor: "#6366f1" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + idx * 0.1 }}
              />
            ))}
          </motion.div>

          {/* Auto-scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPaused ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-sm hidden lg:flex items-center gap-2"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <span className="text-xs">Auto-scrolling</span>
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Pause hint on hover */}
          <AnimatePresence>
            {isPaused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 text-xs text-gray-300"
              >
                Paused - Hover away to resume
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
        >
            <motion.button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <Github size={20} />
                View All Projects on GitHub
                <ExternalLink size={18} />
            </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
