// src/components/Skills.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

const itemHover = {
  hover: { scale: 1.12, rotate: 2, y: -8, transition: { type: "spring", stiffness: 300, damping: 18 } },
  tap: { scale: 0.96, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

const Skills: React.FC = () => {
  useEffect(() => {
    const totalSkills = SKILLS.reduce((sum, category) => sum + category.skills.length, 0);

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'baseline',
        hypothesisId: 'H2',
        location: 'Skills.tsx:27',
        message: 'Skills render density',
        data: {
          categories: SKILLS.length,
          totalSkills,
          avgPerCategory: Number((totalSkills / SKILLS.length).toFixed(2)),
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
        hypothesisId: 'H2',
        location: 'Skills.tsx:43',
        message: 'Skills density (compat)',
        data: {
          categories: SKILLS.length,
          totalSkills,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    const beaconPayload = {
      sessionId: 'debug-session',
      runId: 'baseline-beacon',
      hypothesisId: 'H2',
      location: 'Skills.tsx:59',
      message: 'Skills beacon fallback',
      data: {
        categories: SKILLS.length,
        totalSkills,
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

  return (
    <section id="skills" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          >
            TECH{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              ARSENAL
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-slate-400 max-w-2xl mx-auto"
          >
            Holographic skill badges with subtle motion. Hover, tap or keyboard-focus to
            interact.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {SKILLS.map((category, idx) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              className="bg-dark-200/40 backdrop-blur-md border border-dark-100 rounded-3xl p-8 hover:border-dark-100/70 transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-200 mb-6 border-b border-dark-100 pb-3">
                {category.name}
              </h3>

              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 gap-6"
                aria-label={`${category.name} skills`}
              >
                {category.skills.map((skill) => (
                  <motion.button
                    key={skill.name}
                    className="flex flex-col items-center gap-3 group focus:outline-none"
                    whileHover={itemHover.hover}
                    whileTap={itemHover.tap}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ background: "transparent", border: "none", padding: 0 }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Skill ${skill.name}`}
                  >
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        // holographic gradient background; we use inline styles for fine control
                        background:
                          "linear-gradient(120deg, rgba(79,70,229,0.18), rgba(6,182,212,0.14), rgba(168,85,247,0.12), rgba(59,130,246,0.14))",
                        backgroundSize: "200% 200%",
                        boxShadow: "0 8px 30px rgba(59,130,246,0.08), inset 0 -6px 14px rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        transition: "box-shadow 250ms ease, transform 250ms ease",
                      }}
                    >
                      {/* Animated hologram gradient layer */}
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(60deg, rgba(79,70,229,0.6), rgba(6,182,212,0.45), rgba(168,85,247,0.45))",
                          mixBlendMode: "overlay",
                          opacity: 0.12,
                          pointerEvents: "none",
                          backgroundSize: "200% 200%",
                          animation: "gradientMove 3.5s ease-in-out infinite",
                        }}
                      />

                      {/* Glow ring */}
                      <div
                        aria-hidden
                        className="pointer-events-none"
                        style={{
                          position: "absolute",
                          inset: -8,
                          borderRadius: 18,
                          boxShadow: "0 8px 40px rgba(79,70,229,0.12)",
                          opacity: 0,
                          transition: "opacity 200ms ease",
                        }}
                      />

                      {/* Icon */}
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-10 h-10 object-contain relative z-10"
                        style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.45))" }}
                      />
                    </div>

                    <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors mt-2">
                      {skill.name}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Keyframes for the holographic gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Small style to make keyboard focus visible */
          .group:focus-visible,
          .group:focus {
            outline: 2px solid rgba(99,102,241,0.18);
            outline-offset: 6px;
            border-radius: 0.75rem;
          }

          /* enhance hover glow */
          .group:hover > div {
            box-shadow: 0 18px 50px rgba(59,130,246,0.12), inset 0 -8px 18px rgba(0,0,0,0.65);
            transform: translateY(-6px) scale(1.02);
          }
        `}
      </style>
    </section>
  );
};

export default Skills;
