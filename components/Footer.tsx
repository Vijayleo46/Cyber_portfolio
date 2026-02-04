import React, { useState, useEffect } from 'react';
import { portfolioApi } from '../api';
import type { ContactInfo } from '../types';
import { Mail, Github, Linkedin, MapPin, Terminal, Cpu, Globe, ArrowUpRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [profile, setProfile] = useState<ContactInfo | null>(null);

  useEffect(() => {
    portfolioApi.getContact()
      .then(setProfile)
      .catch(console.error);
  }, []);

  const socialLinks = profile ? [
    { name: 'Terminal_Mail', icon: Mail, href: `mailto:${profile.email}`, label: 'SMTP_Ready' },
    { name: 'Node_GitHub', icon: Github, href: profile.github, label: 'GIT_Active' },
    { name: 'Core_LinkedIn', icon: Linkedin, href: profile.linkedin, label: 'PROF_Auth' }
  ] : [];

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-32 pb-16 bg-transparent border-t border-emerald-500/10">

      {/* Background HUD elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">

          {/* Left: Contact Hub */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-emerald-500" />
              <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">
                System_Output.Finalize
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              INITIALIZE<br />
              <span className="text-transparent bg-clip-text bg-emerald-400" style={{ WebkitTextStroke: '1px rgba(16,185,129,0.5)' }}>COLLABORATION</span>
            </h2>

            <p className="text-emerald-50/40 font-mono text-sm max-w-md leading-relaxed">
              Currently available for new deployments, architectural consultations,
              and high-scale software engineering. Establish a secure link below.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                href={`mailto:${profile?.email || 'vijaymartin72@gmail.com'}`}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-emerald-500 text-black font-black uppercase text-xs rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-colors"
              >
                Establish_Link
              </motion.a>
              <motion.button
                onClick={handleDownload}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase text-xs rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Cpu size={14} />
                {downloading ? "Compiling..." : "Download_Tech_Specs"}
              </motion.button>
            </div>
          </div>

          {/* Right: Network Nodes */}
          <div className="grid gap-4">
            <span className="text-[10px] font-mono text-emerald-500/30 uppercase tracking-[0.4em] mb-2 block">Network_Nodes</span>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all duration-500"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit group-hover:bg-emerald-500 group-hover:text-black transition-all">
                        <Icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white uppercase tracking-tighter">{social.name}</div>
                        <div className="text-[10px] font-mono text-emerald-500/40 uppercase">{social.label}</div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* System Status Display */}
            <div className="mt-8 p-6 bg-black/40 border border-emerald-500/10 rounded-3xl font-mono text-[10px] text-emerald-500/30 space-y-2 uppercase overflow-hidden">
              <div className="flex justify-between items-center group">
                <span className="group-hover:text-emerald-500 transition-colors tracking-widest">Memory_Load:</span>
                <span className="text-emerald-500/60">24%</span>
              </div>
              <div className="w-full h-1 bg-emerald-500/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: ['20%', '24%', '22%'] }} className="h-full bg-emerald-500/20" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="tracking-widest">Protocol:</span>
                <span className="text-emerald-500/60 font-bold">W_SECURE_v4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-10 border-t border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-6 text-[9px] font-mono tracking-widest text-emerald-500/60 uppercase">
            <span>© {new Date().getFullYear()} V_MARTIN_SYSTEMS</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Engine: REACT_THREExTS</span>
          </div>

          <div className="flex items-center gap-4 text-[9px] font-mono uppercase text-emerald-500/30">
            <div className="flex items-center gap-2">
              <Globe size={10} />
              <span>Region: IND_SOUTH</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Shield size={10} />
              <span>Secured: SSL_256</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
