
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioApi } from '../api';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await portfolioApi.sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="contact-form" className="py-20 relative px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-10">
                    <Terminal size={18} className="text-emerald-500" />
                    <span className="text-emerald-500/60 font-mono text-xs tracking-widest uppercase">
                        Secure_Transmission.Protocol
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-white/[0.02] border border-emerald-500/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>
                    </div>

                    {/* Left: Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                                Initialize <span className="text-emerald-500">Contact</span>
                            </h3>
                            <p className="text-emerald-50/40 font-mono text-sm leading-relaxed mb-6">
                                Establish a direct encrypted link for project inquiries, collaborations, or high-level clearances.
                            </p>
                        </div>
                        <div className="space-y-4 font-mono text-xs text-emerald-500/60">
                            <div className="flex justify-between border-b border-emerald-500/10 pb-2">
                                <span>STATUS</span>
                                <span className="text-emerald-500">ONLINE</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-500/10 pb-2">
                                <span>ENCRYPTION</span>
                                <span>AES-256</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-500/10 pb-2">
                                <span>RESPONSE_TIME</span>
                                <span>&lt; 24h</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        {/* Name */}
                        <div className="group">
                            <input
                                type="text"
                                placeholder="IDENTIFIER (NAME)"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-emerald-500/20 rounded-xl p-4 text-emerald-50 font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-emerald-500/20"
                            />
                        </div>

                        {/* Email */}
                        <div className="group">
                            <input
                                type="email"
                                placeholder="COMMS_LINK (EMAIL)"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-black/40 border border-emerald-500/20 rounded-xl p-4 text-emerald-50 font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-emerald-500/20"
                            />
                        </div>

                        {/* Subject */}
                        <div className="group">
                            <input
                                type="text"
                                placeholder="SUBJECT_HEADER"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-black/40 border border-emerald-500/20 rounded-xl p-4 text-emerald-50 font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-emerald-500/20"
                            />
                        </div>

                        {/* Message */}
                        <div className="group">
                            <textarea
                                placeholder="TRANSMISSION_DATA (MESSAGE)"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-black/40 border border-emerald-500/20 rounded-xl p-4 text-emerald-50 font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder-emerald-500/20 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-emerald-500 text-black font-black uppercase text-xs py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    TRANSMITTING...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle size={16} />
                                    TRANSMISSION_COMPLETE
                                </>
                            ) : status === 'error' ? (
                                <>
                                    <AlertCircle size={16} />
                                    TRANSMISSION_FAILED
                                </>
                            ) : (
                                <>
                                    TRANSMIT_DATA
                                    <Send size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
