import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../constants'; 
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Zap,
  Code,
  Users,
  Target,
  Sparkles,
  ChevronRight,
  Building,
  ArrowRight,
  X,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';



const Experience = () => {
  const pathRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [openDetail, setOpenDetail] = useState({ open: false, content: '' });
  const [compact, setCompact] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { animate, stagger } = await import('motion');
        const anim = animate as any;
        const stag = stagger as any;

        // DRAWING ANIMATION
        if (pathRef.current) {
          const path = pathRef.current as SVGPathElement;
          const pathLength = path.getTotalLength();
          path.style.strokeDasharray = `${pathLength}`;
          path.style.strokeDashoffset = `${pathLength}`;

          anim(
            path,
            { strokeDashoffset: [pathLength, 0] },
            { duration: 1.2, easing: 'ease-in-out', delay: 0.3 }
          );
        }

        // STAGGERED card entrance
        if (cardsRef.current.length) {
          anim(
            cardsRef.current,
            { translateY: [30, 0], opacity: [0, 1] },
            { delay: stag(0.12), duration: 0.7, easing: 'ease-out' }
          );
        }

        // Dot pulse
        if (dotsRef.current.length) {
          anim(
            dotsRef.current,
            { scale: [1, 1.35], opacity: [1, 0.85] },
            { direction: 'alternate', loop: true, easing: 'ease-in-out', delay: stag(0.2, { start: 0.6 }), duration: 0.9 }
          );
        }
      } catch (error) {
        console.log('Motion not loaded, using fallback animations');
        if (cardsRef.current.length) {
          cardsRef.current.forEach((card, index) => {
            setTimeout(() => {
              if (card) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }
            }, 300 + index * 120);
          });
        }
      }
    };

    initAnimations();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveCard((prev) => (prev === null ? 0 : Math.min(EXPERIENCE.length - 1, prev + 1)));
        document.activeElement?.blur();
      } else if (e.key === 'ArrowLeft') {
        setActiveCard((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
        document.activeElement?.blur();
      } else if (e.key === 'Escape') {
        setOpenDetail({ open: false, content: '' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus active card into view when changed
  useEffect(() => {
    if (activeCard !== null && cardsRef.current[activeCard]) {
      cardsRef.current[activeCard].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [activeCard]);

  return (
    <section id="experience" className="py-24 bg-[#030014] relative overflow-hidden" ref={containerRef}>
      {/* Progress Indicator (left side on desktop) */}
      <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-2 z-30">
        <div className="relative h-full w-full bg-white/3 rounded-full overflow-hidden">
          <motion.div style={{ height: progress }} className="origin-bottom bg-gradient-to-b from-indigo-500 to-purple-500 w-full rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Career <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Odyssey</span></h2>
            <p className="text-sm text-slate-400 mt-2">A curated timeline of roles, impact and growth.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-pressed={compact}
              onClick={() => setCompact((s) => !s)}
              className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/7 text-sm font-medium"
            >
              {compact ? 'Expanded' : 'Compact'}
            </button>

            <div className="flex items-center gap-2">
              <button
                aria-label="previous"
                onClick={() => setActiveCard((prev) => (prev === null ? 0 : Math.max(0, prev - 1)))}
                className="p-2 rounded-md bg-white/5 hover:bg-white/7"
              >
                <ChevronRight className="-scale-x-100" />
              </button>
              <button
                aria-label="next"
                onClick={() => setActiveCard((prev) => (prev === null ? 0 : Math.min(EXPERIENCE.length - 1, prev + 1)))}
                className="p-2 rounded-md bg-white/5 hover:bg-white/7"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline container */}
        <div className={`max-w-7xl mx-auto relative ${compact ? 'space-y-10' : 'space-y-28'}`}>

          {/* Central Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 z-0">
            <svg className="w-full h-full" viewBox="0 0 4 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="timelineGradient2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                  <stop offset="15%" stopColor="#6366f1" stopOpacity="1" />
                  <stop offset="85%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <filter id="glowPath2">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path ref={pathRef} d="M2 0 V 10000" stroke="url(#timelineGradient2)" strokeWidth="2" fill="none" filter="url(#glowPath2)" className="opacity-60" />
            </svg>
          </div>

          {/* Mobile Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent opacity-30" />

          {/* Experience Cards */}
          <div className={`${compact ? '' : 'space-y-32'}`}>
            {EXPERIENCE.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const cardIcons = [Briefcase, Code, Users, Target];
              const CardIcon = cardIcons[idx % cardIcons.length];

              return (
                <div key={idx} className={`relative flex items-center ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>

                  {/* Horizontal connector beam (animated) */}
                  <motion.div
                    className={`hidden lg:block absolute top-1/2 h-[2px] bg-gradient-to-r from-indigo-500/50 to-transparent z-0 ${isEven ? 'left-1/2 right-[50%]' : 'right-1/2 left-[50%]'}`}
                    style={{ width: 'calc(50% - 20px)' }}
                    initial={{ scaleX: 0, originX: isEven ? 0 : 1 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + idx * 0.05 }}
                  />

                  {/* Wrapper for alignment */}
                  <div className={`w-full lg:w-1/2 flex ${isEven ? 'lg:justify-start lg:pl-20' : 'lg:justify-end lg:pr-20'}`}>

                    {/* The Card */}
                    <motion.div
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className={`relative w-full group perspective-1000 pl-16 lg:pl-0 ${compact ? 'py-4' : ''}`}
                      onMouseEnter={() => setActiveCard(idx)}
                      onMouseLeave={() => setActiveCard((prev) => (prev === idx ? null : prev))}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                      tabIndex={0}
                      aria-label={`${exp.role} at ${exp.company}, ${exp.period}`}
                    >
                      {/* Card Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-60 transition duration-400" />

                      <div className="relative bg-[#0a0a0a]/90 border border-white/10 p-6 md:p-8 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:-translate-y-2 backdrop-blur-md">
                        <div className="relative z-10">
                          <div className="flex flex-col gap-3 mb-4 border-b border-white/5 pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{exp.role}</h3>
                                <div className="flex items-center gap-2 mt-1 text-indigo-400 font-medium text-sm">
                                  <Building size={14} />
                                  <span>{exp.company}</span>
                                </div>
                              </div>

                              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 backdrop-blur-md hidden md:inline-block">{exp.period}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1"><MapPin size={14} /> Onsite</span>
                              <span className="flex items-center gap-1 md:hidden"><Calendar size={14} /> {exp.period}</span>
                            </div>
                          </div>

                          {/* Achievements */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3">
                              <Zap size={16} />
                              <span>Key Impact</span>
                            </div>

                            {exp.details.map((detail, dIdx) => (
                              <motion.div
                                key={dIdx}
                                className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * dIdx }}
                                onClick={() => setOpenDetail({ open: true, content: detail })}
                              >
                                <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 group-hover/item:bg-purple-400 transition-colors shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <p className="text-sm text-slate-400 leading-relaxed group-hover/item:text-slate-200 transition-colors">{detail}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Small footer actions for each card */}
                        <div className="mt-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setOpenDetail({ open: true, content: exp.role + ' — ' + exp.company + '\n\n' + exp.details.join('\n') })}
                              className="text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/7"
                              aria-label={`Open details for ${exp.role}`}
                            >
                              Read more
                            </button>

                            <a href={`#`} className="text-sm px-3 py-2 rounded-md bg-white/3 hover:bg-white/6">Contact</a>
                          </div>

                          <div className="text-sm text-slate-500">{idx + 1}/{EXPERIENCE.length}</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Dot (Desktop) */}
                  <motion.div
                    ref={(el) => (dotsRef.current[idx] = el)}
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 z-20"
                  >
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-2 bg-indigo-900/50 rounded-full backdrop-blur-sm border border-indigo-500/50" />

                    <div className={`relative w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] border-2 border-slate-900 transition-transform duration-500 ${activeCard === idx ? 'scale-125' : 'scale-100'}`}>
                      <CardIcon size={14} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Mobile Dot */}
                  <div className="lg:hidden absolute left-8 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#030014] z-20" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-700" />
            <button className="relative flex items-center gap-3 bg-[#0a0a0a] text-white px-8 py-3 rounded-full font-bold text-lg tracking-wide border border-white/10 hover:border-white/20 transition-all">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">View Full Résumé</span>
              <ArrowRight className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {openDetail.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpenDetail({ open: false, content: '' })} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.18 }} className="relative bg-[#071023] max-w-2xl w-full p-6 rounded-2xl border border-white/6 shadow-2xl z-60">
            <div className="flex items-start justify-between gap-4">
              <div className="prose prose-invert text-sm whitespace-pre-wrap">{openDetail.content}</div>
              <button onClick={() => setOpenDetail({ open: false, content: '' })} className="p-2 rounded-md bg-white/5 hover:bg-white/7">
                <X />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Experience;
