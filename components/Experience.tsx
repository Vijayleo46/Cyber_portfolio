import React, { useRef, useState, useEffect } from 'react';
import { portfolioApi } from '../api';
import type { Experience as ExperienceType } from '../types';
import {
  Terminal,
  Calendar,
  Building,
  ChevronRight,
  Database,
  Cpu,
  Shield,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi.getExperience()
      .then(setExperience)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // Or a themed loader

  return (
    <section id="experience" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* HUD Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <Database size={16} className="text-emerald-500/60" />
            <span className="text-emerald-500/40 font-mono text-xs tracking-[0.4em] uppercase">
              Core_System.Deployment_History
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            CAREER <span className="text-transparent bg-clip-text bg-emerald-400" style={{ WebkitTextStroke: '1px rgba(16,185,129,0.5)' }}>LOGS</span>
          </h2>
        </div>

        {/* Experience Stream */}
        <div className="max-w-4xl mx-auto space-y-12">
          {experience.map((exp, idx) => {
            const isLast = idx === experience.length - 1;
            return (
              <motion.div
                key={idx}
                className="relative group pb-12"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                {/* Connection Line */}
                {!isLast && (
                  <div className="absolute left-[31px] top-[70px] bottom-0 w-px bg-emerald-500/10 group-hover:bg-emerald-500/30 transition-colors" />
                )}

                <div className="flex gap-8">
                  {/* Status Indicator */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-center justify-center group-hover:border-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500">
                      {idx === 0 ? (
                        <Zap size={24} className="text-emerald-400 animate-pulse" />
                      ) : (
                        <Shield size={20} className="text-emerald-500/40" />
                      )}
                    </div>
                  </div>

                  {/* Log Content */}
                  <div className="flex-1">
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8 group-hover:border-emerald-500/20 transition-all duration-500 relative">

                      {/* Brackets */}
                      <div className="absolute top-4 right-4 text-[10px] font-mono text-emerald-500/20">
                        LOG_ID: #00{idx + 1}
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-emerald-500/60 font-mono text-xs uppercase">
                            <Building size={12} />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-mono text-emerald-500/60 uppercase">
                          {exp.period}
                        </div>
                      </div>

                      {/* Impact Details */}
                      <div className="space-y-4">
                        {exp.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex gap-4 group/detail">
                            <ChevronRight size={14} className="mt-1 text-emerald-500/30 group-hover/detail:text-emerald-500 transition-colors" />
                            <p className="text-emerald-50/40 text-sm leading-relaxed font-mono group-hover/detail:text-emerald-50/80 transition-colors">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Technical Status Footer */}
                      <div className="mt-8 pt-6 border-t border-emerald-500/10 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                          <span className="text-[10px] font-mono text-emerald-500/40 uppercase">Archived_Success</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Cpu size={12} className="text-emerald-500/20" />
                          <span className="text-[10px] font-mono text-emerald-500/40 uppercase">Stability: 100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
