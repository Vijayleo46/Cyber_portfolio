import React, { useEffect } from 'react';
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
    }).catch(() => {});
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
    }).catch(() => {});
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
    <div className="relative bg-slate-950 min-h-screen text-slate-200 selection:bg-indigo-500/30 overflow-hidden">
      {/* Ambient animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.12), transparent 28%), radial-gradient(circle at 80% 30%, rgba(236,72,153,0.1), transparent 30%), radial-gradient(circle at 40% 70%, rgba(56,189,248,0.12), transparent 32%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-screen animate-[gridShift_16s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage: "radial-gradient(circle at 50% 50%, black 0%, black 45%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />
      </div>

      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
      <ChatBot />

      {/* Keyframes for ambient grid shift */}
      <style>
        {`
          @keyframes gridShift {
            0% { transform: translate3d(0,0,0); }
            50% { transform: translate3d(-30px, -20px, 0); }
            100% { transform: translate3d(0,0,0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
