import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Wifi, Battery, Bell, Search, Globe, Github, Linkedin, Twitter, Download } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioApi } from "../api";
import type { ContactInfo, Project } from "../types";

gsap.registerPlugin(ScrollTrigger);

const LaptopMockup: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState("");
    const [profile, setProfile] = useState<ContactInfo | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        portfolioApi.getContact()
            .then(setProfile)
            .catch(console.error);

        portfolioApi.getProjects()
            .then(setProjects)
            .catch(console.error);
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // 1. Initial "Power-On" flicker
        tl.fromTo(".screen-content",
            { opacity: 0, filter: "brightness(0)" },
            { opacity: 1, filter: "brightness(1)", duration: 0.1, repeat: 2, yoyo: true }
        )
            .to(".screen-content", { opacity: 1, filter: "brightness(1.1)", duration: 0.5 });

        // 2. Main reveal sequence
        tl.from(".main-ui-element", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.3")
            .from(nameRef.current, {
                opacity: 0,
                scale: 0.9,
                filter: "blur(20px)",
                duration: 1.5,
                ease: "expo.out"
            }, "-=0.8")
            .from(".frame-bracket", {
                opacity: 0,
                scale: 1.2,
                duration: 1,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=1.2");

        // 3. Ambient animations
        gsap.to(".frame-glow", {
            opacity: 0.8,
            boxShadow: "0 0 30px rgba(16,185,129,0.5)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 4. Hover interacton (Tilt)
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(".macbook-body", {
                rotateY: x * 6,
                rotateX: -y * 6,
                duration: 1,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(".macbook-body", {
                rotateY: 0,
                rotateX: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        containerRef.current?.addEventListener("mousemove", handleMouseMove);
        containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

        // 5. Scroll animation for portrait (linked to scroll progress)
        gsap.fromTo(".portrait-image-inner",
            { opacity: 0, y: 80, scale: 0.8 },
            {
                scrollTrigger: {
                    trigger: ".portrait-image-inner",
                    start: "top bottom-=100",
                    end: "top center",
                    scrub: 1, // Smoothly links animation progress to scroll position
                },
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "none" // Essential for scrub animations to feel smooth
            }
        );

        return () => {
            containerRef.current?.removeEventListener("mousemove", handleMouseMove);
            containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="laptop-container relative w-full max-w-5xl mx-auto mb-20 select-none perspective-2000">
            {/* MacBook Body */}
            <div className="macbook-body relative mx-auto bg-[#1a1a1a] rounded-t-[2.5rem] p-3 pb-0 shadow-2xl border-x-[12px] border-t-[12px] border-[#222] transform-style-3d origin-bottom transition-all duration-300">
                {/* Screen/Display */}
                <div className="relative aspect-[16/10] bg-[#020202] rounded-t-xl overflow-hidden shadow-inner">
                    {/* Top Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl z-50 flex items-center justify-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#111]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                    </div>

                    {/* Screen Content */}
                    <div className="screen-content absolute inset-0 flex flex-col bg-[#050505] overflow-hidden">

                        {/* Atmospheric Background Effects */}
                        <div className="absolute inset-0 z-0">
                            {/* Dark Grid Overlay */}
                            <div className="absolute inset-0 bg-grid-white opacity-5" />
                            {/* Radial Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
                            {/* Particles/Sparkles */}
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-px h-px bg-white rounded-full animate-sparkle"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 5}s`,
                                        opacity: Math.random() * 0.5
                                    }}
                                />
                            ))}
                        </div>

                        {/* Main UI Layout Container */}
                        <div ref={contentRef} className="flex-1 flex flex-col p-6 md:p-10 relative z-10">

                            {/* HEADER - Precisely as reference */}
                            <div className="main-ui-element text-center mb-4 pt-2">
                                <span className="text-[10px] md:text-[12px] font-bold text-emerald-400 uppercase tracking-[0.6em] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                    {profile?.job_title || "Software Developer"}
                                </span>
                                <h2
                                    ref={nameRef}
                                    className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mt-2"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        background: "linear-gradient(to bottom, #fff 40%, #a1a1aa 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        filter: "drop-shadow(0 0 15px rgba(16,185,129,0.4))"
                                    }}
                                >
                                    {profile?.name || "VIJAY MARTIN"}
                                </h2>
                            </div>

                            {/* Center Section: Portrait + Sidebar Stats */}
                            <div className="flex-1 flex items-center justify-between gap-4 mt-2">

                                {/* LEFT SIDEBAR: Stats (Precisely as reference) */}
                                <div className="main-ui-element w-48 space-y-10 pl-4">
                                    <div className="flex flex-col gap-1 border-l-2 border-emerald-500/20 pl-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Projects Completed:</span>
                                        </div>
                                        <span className="text-2xl md:text-3xl font-black text-white">{projects.length || "12"}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 border-l-2 border-emerald-500/20 pl-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Tech Stack:</span>
                                        </div>
                                        <span className="text-[10px] md:text-[12px] font-bold text-white tracking-wider uppercase">Python / Flutter / Django</span>
                                    </div>
                                </div>

                                {/* CENTRAL PORTRAIT FRAME (Precisely as reference) */}
                                <div className="relative flex-1 max-w-[340px] aspect-[4/5] mx-auto group/portrait">
                                    {/* Portrait Image Container */}
                                    <div className="absolute inset-1 overflow-hidden z-0">
                                        <img
                                            src="/vijay.png"
                                            alt="Vijay Martin Portrait"
                                            className="portrait-image-inner w-full object-contain object-bottom group-hover/portrait:scale-105 group-hover/portrait:translate-y-0 transition-all duration-[2000ms] ease-out z-10 relative"
                                        />
                                    </div>
                                </div>

                                {/* RIGHT SIDEBAR: Actions (Precisely as reference) */}
                                <div className="main-ui-element w-56 flex flex-col items-end pr-4 text-right">
                                    {/* Available Button */}
                                    <div className="px-6 py-3 bg-emerald-500/10 backdrop-blur-md rounded-xl border border-emerald-400/30 text-[10px] md:text-[12px] font-black text-emerald-400 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-8 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                                        Available for Hire
                                    </div>

                                    {/* Download CV Button */}
                                    <a
                                        href="/resume.pdf"
                                        download
                                        className="px-6 py-3 bg-emerald-500 text-black rounded-xl text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center gap-3 mb-10 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105"
                                    >
                                        <Download className="w-3 h-3" />
                                        Get_Resume.sys
                                    </a>

                                    {/* CTA Text */}
                                    <div className="mb-12">
                                        <p className="text-[12px] md:text-[14px] font-bold text-white uppercase tracking-[0.2em] leading-relaxed">
                                            Let's build<br />something amazing!
                                        </p>
                                    </div>

                                    {/* Services Icons */}
                                    <div className="flex gap-6 mt-4">
                                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                            <div className="p-2 border border-white/10 rounded-lg group-hover:border-emerald-500/50 transition-colors">
                                                <Globe className="w-4 h-4 text-white/40 group-hover:text-emerald-400" />
                                            </div>
                                            <span className="text-[7px] text-white/20 uppercase font-bold tracking-widest">Web Development</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                            <div className="p-2 border border-white/10 rounded-lg group-hover:border-emerald-500/50 transition-colors">
                                                <Github className="w-4 h-4 text-white/40 group-hover:text-emerald-400" />
                                            </div>
                                            <span className="text-[7px] text-white/20 uppercase font-bold tracking-widest">App Design</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                            <div className="p-2 border border-white/10 rounded-lg group-hover:border-emerald-500/50 transition-colors">
                                                <Linkedin className="w-4 h-4 text-white/40 group-hover:text-emerald-400" />
                                            </div>
                                            <span className="text-[7px] text-white/20 uppercase font-bold tracking-widest">UI/UX</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM CONTACT INFO (Precisely as reference) */}
                            <div className="main-ui-element flex justify-between items-end mt-auto pb-4 px-2">
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3 group cursor-pointer">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-white/5 flex items-center justify-center group-hover:border-emerald-500/40 transition-all">
                                            <Search className="w-4 h-4 text-emerald-500/60" />
                                        </div>
                                        <span className="text-[10px] font-mono text-white/60 group-hover:text-white transition-colors">{profile?.email || "vijaymartin72@gmail.com"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-white/5 flex items-center justify-center group-hover:border-emerald-500/40 transition-all">
                                            <Wifi className="w-4 h-4 text-emerald-500/60" />
                                        </div>
                                        <span className="text-[10px] font-mono text-white/60 group-hover:text-white transition-colors">{profile?.phone || "+91 773 647 2576"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="w-12 h-[2px] bg-emerald-500/30" />
                                    <span className="text-[8px] font-mono text-emerald-500/40 uppercase tracking-[0.4em]">system_v_martin</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* MacBook Base */}
            <div className="relative mx-auto h-5 w-[102%] -left-[1%] bg-[#1a1a1a] rounded-b-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-t border-white/10 flex justify-center">
                <div className="absolute top-0 w-[25%] h-1.5 bg-black/60 rounded-b-2xl shadow-inner" />
                <div className="base-reflection absolute inset-0 bg-emerald-500/10 blur-xl opacity-40 pointer-events-none" />
            </div>

            <style>
                {`
          .laptop-container { perspective: 2000px; }
          .macbook-body { transform-style: preserve-3d; transition: transform 0.1s ease-out; }
          .screen-content { box-shadow: inset 0 0 100px rgba(0,0,0,0.9); }
          @keyframes sparkle {
            0%, 100% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.5); opacity: 0.8; }
          }
          .animate-sparkle { animation: sparkle 3s infinite ease-in-out; }
          .bg-grid-white {
            background-image: radial-gradient(circle, #fff 1px, transparent 1px);
            background-size: 30px 30px;
          }
        `}
            </style>
        </div>
    );
};

export default LaptopMockup;
