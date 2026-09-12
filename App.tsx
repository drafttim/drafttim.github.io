import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/app/BootScreen';
import { AnalogOverlay } from './components/app/AnalogOverlay';
import { Layout } from './components/Layout';
import { Overview } from './components/sections/Overview';
import { Research } from './components/sections/Research';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import type { SectionId, Language } from './types';
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
      <BootScreen />
    );
  }

  return (
    <>
      <AnalogOverlay />

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