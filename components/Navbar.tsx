import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Navbar slide down and flicker boot
    const tl = gsap.timeline();
    tl.fromTo(navRef.current,
      { y: -100, opacity: 0, filter: "brightness(0)" },
      { y: 0, opacity: 1, filter: "brightness(1.5)", duration: 0.8, ease: "power4.out" }
    ).to(navRef.current, { filter: "brightness(1)", duration: 0.4 });

    // Initial links stagger with glitch effect
    if (linksRef.current) {
      gsap.from(linksRef.current.children, {
        x: -10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.8,
        ease: "power2.out"
      });
    }

    // Logo pulsing emerald
    gsap.to(".logo-dot", {
      opacity: 0.4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: navRef });

  const navLinks = [
    { name: 'HOME', href: '#home', code: '01' },
    { name: 'SKILLS', href: '#skills', code: '02' },
    { name: 'EXPERIENCE', href: '#experience', code: '03' },
    { name: 'PROJECTS', href: '#projects', code: '04' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-500 ${isScrolled ? 'pt-2' : 'pt-4'}`}
      >
        {/* Top Slim HUD Line */}
        <div className="w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-1 opacity-50" />

        <div
          className={`
            flex items-center justify-between px-8 py-3 rounded-xl
            ${isScrolled
              ? 'bg-black/60 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] w-full max-w-6xl'
              : 'bg-emerald-500/[0.02] backdrop-blur-md border border-white/5 w-full max-w-7xl'}
            transition-all duration-700
          `}
        >
          {/* Logo / System ID */}
          <div className="flex items-center gap-6">
            <a
              ref={logoRef}
              href="#"
              className="group flex flex-col items-start"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-[0.2em] group-hover:text-emerald-400 transition-colors">
                  V_MARTIN
                </span>
                <div className="logo-dot w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>
              <span className="text-[8px] font-mono text-emerald-500/40 uppercase tracking-[0.5em] -mt-1">System Core v4.2</span>
            </a>

            {/* System Status Decorative Icons (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-white/10 opacity-40">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-white/20'}`} />)}
              </div>
              <span className="text-[9px] font-mono text-emerald-500 tracking-widest uppercase">Signal: High</span>
            </div>
          </div>

          {/* Desktop HUD Nav Links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group px-6 py-2 flex flex-col items-center relative"
              >
                <span className="text-[8px] font-mono text-emerald-500/40 group-hover:text-emerald-400/60 transition-colors">[{link.code}]</span>
                <span className="text-[11px] font-black tracking-[0.2em] text-slate-400 group-hover:text-white transition-all uppercase">
                  {link.name}
                </span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 group-hover:w-1/2 transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </a>
            ))}
          </div>

          {/* Right Section: Time + CTA */}
          <div className="flex items-center gap-8">
            {/* Real-time Clock */}
            <div className="hidden xl:flex flex-col items-end pr-6 border-r border-white/10">
              <span className="text-[10px] font-mono text-emerald-400/80 tracking-widest">{currentTime}</span>
              <span className="text-[7px] font-mono text-emerald-500/30 uppercase tracking-[0.3em]">Synchronized</span>
            </div>

            <a
              href="#contact-form"
              className="group relative px-8 py-2.5 bg-emerald-500 text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all hover:bg-white hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-10">Initialize_Contact</span>
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-emerald-500 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Decorative HUD Corner (Desktop) */}
        <div className="w-full max-w-6xl flex justify-between px-2 -mt-1 opacity-20 pointer-events-none hidden md:flex">
          <div className="w-4 h-4 border-l border-b border-emerald-500" />
          <div className="w-4 h-4 border-r border-b border-emerald-500" />
        </div>
      </nav>

      {/* Mobile Menu - Futuristic Glitch Style */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 flex items-center justify-center md:hidden"
        >
          {/* Background Grid for Mobile Menu */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 flex flex-col gap-10 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-link group flex flex-col items-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-[10px] font-mono text-emerald-500/40 group-hover:text-emerald-400">00{link.code}</span>
                <span className="text-4xl font-black text-white hover:text-emerald-400 transition-colors uppercase tracking-[0.1em]">
                  {link.name}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              className="mobile-link text-xl font-bold text-emerald-400 mt-4 border border-emerald-400/30 px-8 py-3 rounded-full hover:bg-emerald-400 hover:text-black transition-all"
              onClick={() => setIsOpen(false)}
            >
              INITIALIZE CONTACT
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
