import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Overview } from './components/sections/Overview';
import { Research } from './components/sections/Research';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { SectionId, Language } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [bootSequence, setBootSequence] = useState(true);
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    // Simulate a system boot sequence
    const timer = setTimeout(() => {
      setBootSequence(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (bootSequence) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-retro-bg font-mono text-retro-dark">
        <div className="w-64 space-y-4">
          <div className="flex justify-between text-xs text-retro-dim tracking-widest">
             <span>INITIALIZING</span>
             <span>...</span>
          </div>
          <div className="h-1 w-full bg-retro-border overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-retro-accent"
            />
          </div>
          <div className="font-mono text-[10px] text-retro-dim text-center opacity-70">
            LOADING ASSETS // TAPE_DRIVE_A
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* CRT / Analog Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
         {/* Subtle scanlines */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_3px,3px_100%]" />
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.05)_100%)]" />
      </div>

      <Layout 
        activeSection={activeSection} 
        onNavigate={setActiveSection}
        language={language}
        onLanguageChange={setLanguage}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeSection === 'overview' && <Overview onNavigate={setActiveSection} language={language} />}
            {activeSection === 'research' && <Research language={language} />}
            {activeSection === 'projects' && <Projects language={language} />}
            {activeSection === 'contact' && <Contact language={language} />}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
};

export default App;