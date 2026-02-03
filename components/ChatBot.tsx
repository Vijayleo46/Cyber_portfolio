import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, Terminal, Shield, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; timestamp: string }[]>([
    {
      role: 'model',
      text: "SYSTEM_READY: AI Assistant v4.2 initialized. Accessing developer archives. How can I assist with your inquiry?",
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const now = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp: now }]);
    setInput('');
    setIsLoading(true);

    // Simulated response for now (since we don't have the API key in this environment)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'model',
        text: `LOG_ERROR: AI_MODULE_OFFLINE. Please consult manual archives or establish direct link via 'Initialize_Contact'.`,
        timestamp: now
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
              onClick={() => setIsOpen(true)}
              className="bg-emerald-500 p-4 rounded-2xl shadow-2xl flex items-center justify-center border border-emerald-400/50"
            >
              <Terminal size={28} className="text-black" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="fixed bottom-10 right-10 z-50 w-full max-w-sm md:w-[450px] bg-black/80 backdrop-blur-2xl border border-emerald-500/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[600px]"
          >
            {/* HUD Header */}
            <div className="bg-emerald-500/10 p-6 flex justify-between items-center border-b border-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                  <Cpu size={20} className="text-emerald-500 relative" />
                </div>
                <div>
                  <span className="font-black text-white uppercase tracking-tighter text-sm">ARCHIVE_AI_v4</span>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-500/60 uppercase">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    <span>System_Sync: Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-emerald-500/20 p-2 rounded-xl text-emerald-500/60 hover:text-emerald-500 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Console */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/10 no-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-30">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500">
                      {msg.role === 'user' ? 'USER_INPUT' : 'SYSTEM_LOG'}
                    </span>
                    <span className="font-mono text-[9px] text-emerald-500">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[85%] p-4 rounded-3xl text-xs md:text-sm font-mono border transition-all duration-300 ${msg.role === 'user'
                      ? 'bg-emerald-500/5 text-emerald-100 border-emerald-500/10 rounded-tr-none'
                      : 'bg-white/[0.02] text-emerald-400 border-white/5 rounded-tl-none group hover:border-emerald-500/20'
                      }`}
                  >
                    <span className="opacity-40 mr-2">{msg.role === 'user' ? '>' : '#'}</span>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/10 flex items-center gap-3">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Terminal Input */}
            <div className="p-6 bg-black/40 border-t border-emerald-500/10">
              <div className="flex gap-4 items-center bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-3 focus-within:border-emerald-500/30 transition-all">
                <span className="font-mono text-emerald-500/40">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="EX: Describe Project Alpha..."
                  className="flex-1 bg-transparent text-emerald-50 text-xs font-mono focus:outline-none placeholder-emerald-500/20 uppercase"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="text-emerald-500 hover:text-emerald-400 disabled:opacity-30 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center opacity-20 px-2 font-mono text-[8px] uppercase tracking-widest text-emerald-500">
                <span>Buffer_Status: Clear</span>
                <span>Encrypted: AES_GCM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
