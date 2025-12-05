import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
