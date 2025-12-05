import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ABOUT_ME, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CONTACT_INFO } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hi! I'm Vijay's AI assistant. Ask me anything about his skills, projects, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
          throw new Error("API Key not found");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct context from constants
      const context = `
        You are an AI assistant for a software developer named Vijay Martin. 
        Here is his resume data:
        Contact: ${JSON.stringify(CONTACT_INFO)}
        About: ${ABOUT_ME}
        Skills: ${JSON.stringify(SKILLS)}
        Projects: ${JSON.stringify(PROJECTS)}
        Experience: ${JSON.stringify(EXPERIENCE)}
        Education: ${JSON.stringify(EDUCATION)}

        System Instructions:
        1. Answer questions strictly based on the provided data.
        2. Be polite, professional, and enthusiastic, reflecting Vijay's motivation.
        3. If asked about contact info, provide it clearly.
        4. Keep answers concise (under 100 words) unless detailed info is requested.
        5. Use a friendly tone.
      `;

      const model = ai.models;
      const response = await model.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: context + "\n\nUser Question: " + userMessage }] }
        ],
      });

      const text = response.text || "I'm having a little trouble connecting right now. Please try again.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I can't access the AI brain right now. Please check the API key configuration." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center"
                >
                    <MessageCircle size={28} />
                </motion.button>
            )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm md:w-[400px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Vijay's Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700">
                    <Loader2 className="animate-spin text-indigo-400" size={18} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Vijay..."
                  className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
