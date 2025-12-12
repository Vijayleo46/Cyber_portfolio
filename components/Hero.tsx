import React, { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_INFO } from "../constants";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

const Hero: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % 2);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Background scenes - you can replace these with your own images
  const scenes = [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", // Gaming setup
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", // Tech workspace
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Dark base layer */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Neural Network Background - Above base layer */}
      <div className="absolute inset-0 z-10">
        <NeuralNetworkBackground />
      </div>

      {/* Gradient overlays for depth - Above neural network */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-cyan-900/10 z-20" />

      {/* Main Content */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 min-h-screen flex items-center py-20 sm:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Big Bold Title - Name line by line - Mobile Responsive */}
            <div className="space-y-1 md:space-y-2">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight"
                style={{ 
                  fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                  letterSpacing: '0.05em'
                }}
              >
                {/* VIJAY - First line */}
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="block text-white drop-shadow-2xl"
                  style={{
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  VIJAY
                </motion.span>
                
                {/* MARTIN - Second line */}
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                  style={{
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
                    textShadow: '0 0 40px rgba(251, 191, 36, 0.5), 0 0 80px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  MARTIN
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-1 mt-4"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
                  Software Developer
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light">
                  Building the Future
                </p>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            >
              Full-Stack Developer & AI Engineer crafting immersive digital experiences
              with cutting-edge technologies. Specializing in Flutter, React, and intelligent systems.
            </motion.p>

            {/* CTA Buttons - Sequential Animation */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <motion.a
                href="#projects"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}                                                                                                                
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                View Projects
              </motion.a>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm sm:text-base font-bold rounded-full hover:shadow-yellow-500/50 transition-all"
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-8 pt-4"
            >
              
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Character Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="relative hidden lg:block"
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-3xl rounded-full" />

            {/* Character Container */}
            <div className="relative">
              {/* You can replace this with an actual 3D character image or illustration */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                {/* Placeholder for 3D character - replace with your image */}
                <div className="relative w-full h-[600px] flex items-center justify-center">
                  {/* SVG Character Illustration */}
                  <svg
                    viewBox="0 0 400 600"
                    className="w-full h-full drop-shadow-2xl"
                  >
                    <defs>
                      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                      <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                      <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e40af" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Shadow */}
                    <ellipse cx="200" cy="580" rx="80" ry="15" fill="#000" opacity="0.3" />

                    {/* Legs */}
                    <rect x="160" y="380" width="35" height="180" rx="17" fill="url(#pantsGrad)" />
                    <rect x="205" y="380" width="35" height="180" rx="17" fill="url(#pantsGrad)" />

                    {/* Shoes */}
                    <ellipse cx="177" cy="565" rx="25" ry="12" fill="#1e293b" />
                    <ellipse cx="222" cy="565" rx="25" ry="12" fill="#1e293b" />

                    {/* Body/Torso */}
                    <rect x="140" y="220" width="120" height="170" rx="30" fill="url(#shirtGrad)" />

                    {/* Arms */}
                    <motion.rect
                      x="100"
                      y="240"
                      width="35"
                      height="140"
                      rx="17"
                      fill="url(#shirtGrad)"
                      animate={{ rotate: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ originX: "117px", originY: "240px" }}
                    />
                    <motion.rect
                      x="265"
                      y="240"
                      width="35"
                      height="140"
                      rx="17"
                      fill="url(#shirtGrad)"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      style={{ originX: "282px", originY: "240px" }}
                    />

                    {/* Hands */}
                    <circle cx="117" cy="385" r="18" fill="url(#skinGrad)" />
                    <circle cx="282" cy="385" r="18" fill="url(#skinGrad)" />

                    {/* Neck */}
                    <rect x="180" y="200" width="40" height="30" rx="10" fill="url(#skinGrad)" />

                    {/* Head */}
                    <motion.g
                      animate={{ rotate: [-2, 2, -2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      style={{ originX: "200px", originY: "150px" }}
                    >
                      <circle cx="200" cy="150" r="70" fill="url(#skinGrad)" filter="url(#glow)" />

                      {/* Hair */}
                      <path
                        d="M 140 130 Q 130 100 150 90 Q 180 75 200 80 Q 220 75 250 90 Q 270 100 260 130"
                        fill="#1e293b"
                      />

                      {/* Goggles/Glasses */}
                      <g>
                        {/* Left lens */}
                        <rect x="160" y="135" width="35" height="25" rx="12" fill="#06b6d4" opacity="0.7" />
                        <rect x="162" y="137" width="31" height="21" rx="10" fill="#0891b2" opacity="0.5" />

                        {/* Right lens */}
                        <rect x="205" y="135" width="35" height="25" rx="12" fill="#06b6d4" opacity="0.7" />
                        <rect x="207" y="137" width="31" height="21" rx="10" fill="#0891b2" opacity="0.5" />

                        {/* Bridge */}
                        <rect x="195" y="145" width="10" height="4" rx="2" fill="#334155" />

                        {/* Reflection */}
                        <rect x="165" y="138" width="15" height="8" rx="4" fill="#fff" opacity="0.6" />
                        <rect x="210" y="138" width="15" height="8" rx="4" fill="#fff" opacity="0.6" />
                      </g>

                      {/* Nose */}
                      <ellipse cx="200" cy="165" rx="8" ry="12" fill="#f59e0b" />

                      {/* Smile */}
                      <motion.path
                        d="M 175 180 Q 200 195 225 180"
                        stroke="#1e293b"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        animate={{ d: ["M 175 180 Q 200 195 225 180", "M 175 180 Q 200 198 225 180", "M 175 180 Q 200 195 225 180"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      {/* Ears */}
                      <ellipse cx="130" cy="150" rx="15" ry="20" fill="url(#skinGrad)" />
                      <ellipse cx="270" cy="150" rx="15" ry="20" fill="url(#skinGrad)" />
                    </motion.g>

                    {/* Laptop in hands */}
                    <g>
                      <rect x="140" y="350" width="120" height="8" rx="4" fill="#334155" />
                      <rect x="145" y="320" width="110" height="30" rx="4" fill="#1e293b" />
                      <rect x="150" y="325" width="100" height="20" fill="#0891b2" opacity="0.3" />
                      {/* Code lines on screen */}
                      <line x1="155" y1="330" x2="185" y2="330" stroke="#06b6d4" strokeWidth="2" />
                      <line x1="155" y1="335" x2="210" y2="335" stroke="#8b5cf6" strokeWidth="2" />
                      <line x1="155" y1="340" x2="175" y2="340" stroke="#06b6d4" strokeWidth="2" />
                    </g>

                    {/* Floating code symbols */}
                    <motion.text
                      x="80"
                      y="200"
                      fontSize="32"
                      fill="#8b5cf6"
                      animate={{ y: [200, 180, 200], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {"</>"}
                    </motion.text>
                    <motion.text
                      x="310"
                      y="250"
                      fontSize="32"
                      fill="#06b6d4"
                      animate={{ y: [250, 230, 250], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      {"{}"}
                    </motion.text>
                    <motion.text
                      x="320"
                      y="180"
                      fontSize="28"
                      fill="#fbbf24"
                      animate={{ y: [180, 160, 180], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    >
                      {"()"}
                    </motion.text>
                  </svg>
                </div>
              </motion.div>

              {/* Floating tech badges around character - Sequential Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  y: [0, -10, 0], 
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  opacity: { delay: 2.0, duration: 0.4 },
                  scale: { delay: 2.0, duration: 0.4 },
                  x: { delay: 2.0, duration: 0.4 },
                  y: { duration: 3, repeat: Infinity, delay: 2.4 },
                  rotate: { duration: 3, repeat: Infinity, delay: 2.4 }
                }}
                className="absolute top-20 -left-10 bg-purple-600/20 backdrop-blur-md border border-purple-500/30 rounded-2xl px-4 py-2 text-white font-semibold text-sm"
              >
                Flutter
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  y: [0, -15, 0], 
                  rotate: [0, -5, 0] 
                }}
                transition={{ 
                  opacity: { delay: 2.2, duration: 0.4 },
                  scale: { delay: 2.2, duration: 0.4 },
                  x: { delay: 2.2, duration: 0.4 },
                  y: { duration: 3.5, repeat: Infinity, delay: 2.7 },
                  rotate: { duration: 3.5, repeat: Infinity, delay: 2.7 }
                }}
                className="absolute top-40 -right-10 bg-cyan-600/20 backdrop-blur-md border border-cyan-500/30 rounded-2xl px-4 py-2 text-white font-semibold text-sm"
              >
                React
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -12, 0], 
                  rotate: [0, 3, 0] 
                }}
                transition={{ 
                  opacity: { delay: 2.4, duration: 0.4 },
                  scale: { delay: 2.4, duration: 0.4 },
                  y: { duration: 3.2, repeat: Infinity, delay: 2.8 },
                  rotate: { duration: 3.2, repeat: Infinity, delay: 2.8 }
                }}
                className="absolute bottom-40 -left-5 bg-yellow-600/20 backdrop-blur-md border border-yellow-500/30 rounded-2xl px-4 py-2 text-white font-semibold text-sm"
              >
                AI/ML
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom text - "CODING" style - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:block absolute bottom-10 right-10 text-6xl md:text-8xl lg:text-9xl font-black text-white/10 select-none pointer-events-none"
        style={{ 
          fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif"
        }}
      >
        CODING
      </motion.div>

      {/* Scroll indicator - Hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs">Scroll</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
