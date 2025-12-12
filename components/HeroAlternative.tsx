import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code, Zap, Cpu, Database, Globe } from "lucide-react";

interface TouchSkill {
  id: number;
  x: number;
  y: number;
  skill: string;
  color: string;
}

const HeroAlternative: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentBg, setCurrentBg] = useState(0);
  const [touchSkills, setTouchSkills] = useState<TouchSkill[]>([]);

  const skillsList = [
    { name: "React", color: "from-cyan-400 to-blue-500" },
    { name: "Flutter", color: "from-blue-400 to-indigo-500" },
    { name: "TypeScript", color: "from-blue-500 to-cyan-400" },
    { name: "Python", color: "from-yellow-400 to-green-500" },
    { name: "Node.js", color: "from-green-400 to-emerald-500" },
    { name: "AI/ML", color: "from-purple-400 to-pink-500" },
    { name: "Next.js", color: "from-gray-400 to-slate-500" },
    { name: "Django", color: "from-green-500 to-teal-500" },
    { name: "Firebase", color: "from-orange-400 to-yellow-500" },
    { name: "Tailwind", color: "from-cyan-400 to-blue-400" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const randomSkill = skillsList[Math.floor(Math.random() * skillsList.length)];
    const newSkill: TouchSkill = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      skill: randomSkill.name,
      color: randomSkill.color,
    };

    setTouchSkills((prev) => [...prev, newSkill]);

    // Remove after animation
    setTimeout(() => {
      setTouchSkills((prev) => prev.filter((s) => s.id !== newSkill.id));
    }, 2000);
  };

  const skills = [
    { name: "React", icon: Code, color: "from-cyan-400 to-blue-500" },
    { name: "Flutter", icon: Zap, color: "from-blue-400 to-indigo-500" },
    { name: "AI/ML", icon: Cpu, color: "from-purple-400 to-pink-500" },
    { name: "Node.js", icon: Database, color: "from-green-400 to-emerald-500" },
    { name: "Python", icon: Globe, color: "from-yellow-400 to-orange-500" },
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Code on screen
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop", // Laptop coding
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop", // Code editor
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden bg-black cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentBg === index ? 1 : 0,
              scale: currentBg === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${img})`,
                filter: "brightness(0.3) blur(3px)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-purple-950/80 to-slate-950/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.15),transparent_50%)]" />
      </div>

      {/* Floating Orbs with Enhanced Glow */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${150 + i * 40}px`,
            height: `${150 + i * 40}px`,
            left: `${15 + i * 14}%`,
            top: `${5 + i * 13}%`,
            background: `linear-gradient(135deg, ${
              i % 3 === 0
                ? "rgba(139, 92, 246, 0.4)"
                : i % 3 === 1
                ? "rgba(6, 182, 212, 0.4)"
                : "rgba(236, 72, 153, 0.4)"
            }, transparent)`,
            opacity: 0.3,
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Animated Code Snippets Floating */}
      {[
        { code: "</>", color: "text-cyan-400" },
        { code: "{}", color: "text-purple-400" },
        { code: "( )", color: "text-yellow-400" },
        { code: "=>", color: "text-green-400" },
        { code: "[ ]", color: "text-pink-400" },
      ].map((snippet, i) => (
        <motion.div
          key={i}
          className={`absolute ${snippet.color} font-mono text-2xl font-bold opacity-20`}
          style={{
            left: `${10 + i * 18}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          {snippet.code}
        </motion.div>
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Available for work</span>
              <Sparkles size={16} className="text-yellow-400" />
            </motion.div>

            {/* Coding Prefix */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-cyan-400 font-mono text-sm"
            >
              <span className="text-gray-500">const</span>
              <span className="text-purple-400">developer</span>
              <span className="text-gray-500">=</span>
              <span className="text-yellow-400">{`{`}</span>
            </motion.div>

            {/* Name with Glassmorphism */}
            <div className="space-y-4 pl-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-gray-500 font-mono text-sm">name:</span>
                  <h1 className="text-6xl md:text-8xl font-black text-white leading-tight" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
                    VIJAY
                  </h1>
                </div>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-2xl -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent leading-tight" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
                  MARTIN
                </h1>
              </motion.div>
            </div>

            {/* Closing Bracket */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-yellow-400 font-mono text-sm"
            >
              {`};`}
            </motion.div>

            {/* Typing Animation - Code Comment */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-mono text-sm text-gray-500"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ delay: 0.8, duration: 2 }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                // Building the future, one line at a time...
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-cyan-400 ml-1"
              />
            </motion.div>

            {/* Code Block - Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="relative p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
              }}
            >
              {/* Code Editor Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500 font-mono ml-2">developer.ts</span>
              </div>

              {/* Code Content */}
              <div className="font-mono text-sm space-y-2">
                <div className="flex gap-3">
                  <span className="text-gray-600 select-none">1</span>
                  <span className="text-purple-400">const</span>
                  <span className="text-cyan-400">role</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-green-400">"Full-Stack Developer"</span>
                  <span className="text-gray-500">;</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600 select-none">2</span>
                  <span className="text-purple-400">const</span>
                  <span className="text-cyan-400">skills</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-yellow-400">[</span>
                  <span className="text-green-400">"Flutter"</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-green-400">"React"</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-green-400">"AI/ML"</span>
                  <span className="text-yellow-400">]</span>
                  <span className="text-gray-500">;</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600 select-none">3</span>
                  <span className="text-purple-400">const</span>
                  <span className="text-cyan-400">passion</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-green-400">"Building innovative solutions"</span>
                  <span className="text-gray-500">;</span>
                </div>
              </div>

              {/* Syntax Highlight Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* CTA Buttons - Terminal Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-bold rounded-lg shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-yellow-300">$</span>
                  view --projects
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-900/50 backdrop-blur-xl border-2 border-cyan-500/30 text-cyan-400 font-mono font-semibold rounded-lg hover:bg-slate-900/80 transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="text-yellow-300">$</span>
                  contact --me
                </span>
              </motion.button>
            </motion.div>

            {/* Terminal Output */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="font-mono text-xs text-green-400 space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-600">→</span>
                <span>Status: Ready to collaborate</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ●
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">→</span>
                <span>Response time: &lt; 24h</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-8 pt-4"
            >
              {[
                { label: "Projects", value: "26+" },
                { label: "Clients", value: "14+" },
                { label: "Years", value: "4+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Skills Cards */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Center Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-64 h-64 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-3xl"
              />
            </div>

            {/* Orbiting Skill Cards */}
            {skills.map((skill, i) => {
              const angle = (i / skills.length) * Math.PI * 2;
              const radius = 200;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={skill.name}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    x: x - 60,
                    y: y - 60,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                >
                  <motion.div
                    className="relative w-32 h-32 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer"
                    whileHover={{
                      scale: 1.2,
                      rotate: 0,
                      boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
                    }}
                    animate={{
                      rotate: [0, -360],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5,
                      },
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                    >
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-semibold">
                      {skill.name}
                    </span>

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 blur-xl`}
                      whileHover={{ opacity: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Center Avatar/Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl">
                <div className="w-28 h-28 rounded-full bg-slate-950 flex items-center justify-center">
                  <span className="text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                    VM
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Touch/Click Skill Animations */}
      <AnimatePresence>
        {touchSkills.map((skill) => (
          <motion.div
            key={skill.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: skill.x,
              top: skill.y,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              scale: [0, 1.2, 1, 0.8],
              y: [0, -100],
              rotate: [0, 360],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Skill Badge */}
            <div className={`relative px-6 py-3 rounded-full bg-gradient-to-r ${skill.color} shadow-2xl`}>
              <span className="text-white font-bold text-lg font-mono">
                {skill.skill}
              </span>
              
              {/* Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} blur-xl opacity-50`}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              {/* Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${25 + i * 20}%`,
                    top: `${-10 + i * 5}%`,
                  }}
                  animate={{
                    y: [-20, -40],
                    x: [0, (i - 2) * 10],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}
            </div>

            {/* Code Brackets */}
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-2xl font-bold"
              animate={{ x: [-10, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1 }}
            >
              {"<"}
            </motion.div>
            <motion.div
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-2xl font-bold"
              animate={{ x: [10, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1 }}
            >
              {"/>"}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Touch Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        className="absolute top-20 right-10 text-gray-500 text-sm font-mono hidden md:flex items-center gap-2"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 border-2 border-cyan-400/50 rounded-full flex items-center justify-center"
        >
          <Sparkles size={16} className="text-cyan-400" />
        </motion.div>
        <span>Click anywhere to reveal skills</span>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroAlternative;
