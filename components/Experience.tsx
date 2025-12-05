
import React from 'react';
import { EXPERIENCE } from '../constants';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white mb-6"
             >
                CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">JOURNEY</span>
             </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 md:pl-0"
            >
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute left-[20px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-800 via-indigo-500/50 to-slate-800" />
                
                <div className="md:ml-12 bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-8 transition-colors duration-300 relative group">
                    {/* Dot */}
                    <div className="hidden md:block absolute left-[-29px] top-8 w-4 h-4 rounded-full bg-slate-950 border-4 border-indigo-500 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-400 mt-1">
                                <Briefcase size={16} />
                                <span className="font-medium">{exp.company}</span>
                            </div>
                        </div>
                        <span className="inline-block bg-indigo-500/10 text-indigo-400 text-sm font-bold px-4 py-2 rounded-lg border border-indigo-500/20 whitespace-nowrap">
                            {exp.period}
                        </span>
                    </div>

                    <ul className="space-y-3">
                        {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-500 transition-colors shrink-0" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
