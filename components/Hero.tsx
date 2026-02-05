import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import LaptopMockup from "./LaptopMockup";
import { portfolioApi } from "../api";
import type { ContactInfo } from "../types";

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [profile, setProfile] = useState<ContactInfo | null>(null);

    useEffect(() => {
        portfolioApi.getContact()
            .then(setProfile)
            .catch(console.error);
    }, []);

    const nameParts = profile?.name.split(' ') || ["VIJAY", "MARTIN"];

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#020202]"
        >
            {/* Background Atmosphere Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* HUD Grid */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,5px_100%]" />

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />

                {/* Secondary Grid Lines */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                {/* Layered Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 blur-[150px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Corner Decorative Brackets - Hero Wrapper */}
            <div className="absolute inset-10 border border-emerald-500/5 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500/20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/20" />
            </div>

            {/* Floating Technical HUD Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [0, -20, 0],
                            x: [0, 10, 0]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute hidden md:block"
                        style={{
                            top: `${15 + (i * 15)}%`,
                            left: i % 2 === 0 ? '5%' : '85%',
                        }}
                    >
                        <div className="border border-emerald-500/10 p-2 rounded-sm bg-black/20 backdrop-blur-sm">
                            <div className="flex gap-2 items-center mb-1">
                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-mono text-emerald-500/40 uppercase tracking-widest">Node_0{i}</span>
                            </div>
                            <div className="w-16 h-[1px] bg-emerald-500/10 mb-1" />
                            <div className="text-[8px] font-mono text-emerald-500/20 tracking-tighter uppercase whitespace-nowrap">
                                LAT_0.42_LNG_1.2<br />STABILITY: 99.8%
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Subtitle with Scanline Effect */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-6"
                >
                    <span className="text-xs md:text-sm font-bold text-emerald-500/60 uppercase tracking-[0.8em]">
                        {profile?.job_title || "Software Developer"}
                    </span>
                    <div className="absolute -inset-x-4 h-[1px] bottom-0 bg-emerald-500/20" />
                </motion.div>

                {/* Primary Name: VIJAY */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="relative group mb-8 md:mb-12 flex flex-col items-center"
                >
                    <div className="flex flex-col items-center">
                        <h1
                            className="text-5xl sm:text-7xl md:text-[12rem] font-black text-white leading-none tracking-tighter uppercase relative z-10"
                            style={{
                                textShadow: "0 0 50px rgba(16,185,129,0.2)",
                                background: "linear-gradient(to bottom, #fff 50%, #d1d5db 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            {nameParts[0]}
                        </h1>
                        <h1
                            className="text-5xl sm:text-7xl md:text-[10rem] font-black text-white leading-none tracking-tighter uppercase relative z-10 -mt-2 md:-mt-8"
                            style={{
                                textShadow: "0 0 50px rgba(16,185,129,0.2)",
                                background: "linear-gradient(to right, #fbbf24, #f472b6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            {nameParts.slice(1).join(' ')}
                        </h1>
                    </div>

                    {/* Retro Ghosting Effect behind H1 */}
                    <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 opacity-5 blur-[2px] pointer-events-none flex flex-col items-center">
                        <span className="text-5xl sm:text-7xl md:text-[12rem] font-black text-emerald-50 tracking-tighter uppercase">{nameParts[0]}</span>
                        <span className="text-5xl sm:text-7xl md:text-[10rem] font-black text-emerald-50 tracking-tighter uppercase -mt-2 md:-mt-8">{nameParts.slice(1).join(' ')}</span>
                    </div>

                    {/* Technical Crosshairs around name */}
                    <div className="absolute -top-10 -left-10 w-4 h-4 border-t-2 border-l-2 border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block" />
                    <div className="absolute -top-10 -right-10 w-4 h-4 border-t-2 border-r-2 border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block" />
                    <div className="absolute -bottom-10 -left-10 w-4 h-4 border-b-2 border-l-2 border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block" />
                    <div className="absolute -bottom-10 -right-10 w-4 h-4 border-b-2 border-r-2 border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block" />
                </motion.div>


                {/* Central Laptop Mockup Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    className="w-full max-w-6xl relative"
                >
                    {/* Under-laptop shadow/glow */}
                    <div className="absolute inset-x-0 bottom-0 h-2 bg-emerald-500/20 blur-2xl rounded-full" />

                    <LaptopMockup />
                </motion.div>
            </div>

            {/* Global Scanlines */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px]" />

            <style>{`
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                }
            `}</style>
        </section>
    );
};

export default Hero;
