import React, { useRef, useState, useEffect } from "react";
import { portfolioApi } from "../api";
import { SkillCategory } from "../types";
import LaptopMockup from "./LaptopMockup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Cpu, Code2, Database, Wrench, Shield, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi.getSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryIcons: Record<string, any> = {
    "Languages": Cpu,
    "Frameworks & Tech": Code2,
    "Databases & Cloud": Database,
    "Tools": Wrench,
  };


  return (
    <section ref={containerRef} id="skills" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* HUD Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-12 bg-emerald-500/50" />
            <span className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase opacity-70">
              System_Core.Modules
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            TECH <span className="text-transparent bg-clip-text bg-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ WebkitTextStroke: '1px rgba(16,185,129,0.5)' }}>ARSENAL</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {skills.map((category, idx) => {
            const Icon = categoryIcons[category.name] || Zap;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="skill-category-card group relative bg-black/40 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-500"
              >
                {/* Corners Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-lg group-hover:border-emerald-500 transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-lg group-hover:border-emerald-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/30 rounded-bl-lg group-hover:border-emerald-500 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/30 rounded-br-lg group-hover:border-emerald-500 transition-colors" />

                {/* Scanline Effect on Hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:animate-scan z-20" />

                <div className="flex items-center gap-4 mb-10 pb-4 border-b border-emerald-500/10">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-widest">
                    {category.name.replace(' & ', '_')}
                  </h3>
                  <div className="flex-1" />
                  <span className="text-[10px] font-mono text-emerald-500/40">ID_0{idx + 1}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative flex flex-col items-center p-4 rounded-xl hover:bg-emerald-500/5 transition-colors group/skill"
                    >
                      <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                        {/* Skill Glow */}
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-10 h-10 object-contain relative z-10 grayscale group-hover/skill:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <span className="text-xs font-mono text-emerald-500/60 group-hover/skill:text-emerald-400 transition-colors uppercase tracking-wider">
                        {skill.name}
                      </span>

                      {/* Progress Mini-Bar */}
                      <div className="w-12 h-0.5 bg-emerald-900/40 mt-2 overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          className="h-full bg-emerald-500/60"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style>
        {`
                    @keyframes scan {
                        0% { top: 0; opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .animate-scan {
                        animation: scan 2s linear infinite;
                    }
                `}
      </style>
    </section>
  );
};

export default Skills;
