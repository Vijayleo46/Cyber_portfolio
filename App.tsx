import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'baseline',
        hypothesisId: 'H1',
        location: 'App.tsx:12',
        message: 'App mounted with sections',
        data: {
          sections: ['Navbar', 'Hero', 'Skills', 'Experience', 'Projects', 'Footer', 'ChatBot'],
        },
        timestamp: Date.now(),
      }),
    }).catch(() => { });
    fetch('http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0', {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'baseline-compat',
        hypothesisId: 'H1',
        location: 'App.tsx:24',
        message: 'App mounted (compat log)',
        data: { fallback: true },
        timestamp: Date.now(),
      }),
    }).catch(() => { });
    const sendBeaconFallback = (body: Record<string, unknown>) => {
      const url = 'http://127.0.0.1:7242/ingest/12665dff-7b7f-4a7e-9198-1ecad55a1eb0';
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob([JSON.stringify(body)], { type: 'application/json' }));
        }
      } catch {
        // silent fallback failure
      }
    };
    const beaconPayload = {
      sessionId: 'debug-session',
      runId: 'baseline-beacon',
      hypothesisId: 'H1',
      location: 'App.tsx:38',
      message: 'App mounted beacon fallback',
      data: { beacon: true },
      timestamp: Date.now(),
    };
    sendBeaconFallback(beaconPayload);
    const onLoad = () => {
      sendBeaconFallback({
        ...beaconPayload,
        runId: 'baseline-load',
        message: 'Window load fired',
        timestamp: Date.now(),
      });
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
    // #endregion
  }, []);

  return (
    <div className="relative bg-[#020202] min-h-screen text-emerald-50 selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Cinematic OS Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />


      {/* Ambient animated background - Cyber OS Atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Deep Emerald Radial Glows */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(16,185,129,0.15), transparent 35%), radial-gradient(circle at 85% 85%, rgba(6,182,212,0.15), transparent 35%), radial-gradient(circle at 50% 50%, rgba(16,185,129,0.05), transparent 50%)",
            filter: "blur(40px)",
          }}
        />

        {/* Futuristic HUD Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-screen animate-[gridShift_20s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle at 50% 50%, black 0%, black 40%, transparent 80%)",
          }}
        />

        {/* Floating Light Particles Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
      <ChatBot />

      <style>
        {`
          @keyframes gridShift {
            0% { transform: translateY(0); }
            100% { transform: translateY(60px); }
          }
          ::selection {
            background: rgba(16, 185, 129, 0.3);
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}

export default App;
