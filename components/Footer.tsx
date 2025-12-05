
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 pt-32 pb-12 border-t border-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Collaborate?</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12">
            I'm currently available for freelance projects and full-time opportunities. Let's build something scalable and intelligent together.
        </p>

        <div className="flex justify-center gap-6 mb-16">
            <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-white hover:bg-white hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-lg"
            >
                <Mail size={24} />
            </a>
            <a 
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all duration-300 shadow-lg"
            >
                <Linkedin size={24} />
            </a>
            <a 
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-white hover:bg-white hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-lg"
            >
                <Github size={24} />
            </a>
        </div>

        <div className="inline-flex items-center gap-2 text-slate-500 mb-12 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
            <MapPin size={16} /> {CONTACT_INFO.location}
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
            <div>© {new Date().getFullYear()} Vijay Martin. All rights reserved.</div>
            <div className="flex gap-6">
                <span>Designed with React & Tailwind</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
