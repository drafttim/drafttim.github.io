import React from 'react';
import { SectionId, Language } from '../types';
import { NavBar } from './NavBar';
import { IdentityBlock } from './layout/IdentityBlock';
import { LayoutBackground, SectionHeader, SystemStatus } from './layout/LayoutDecorations';
import { TapePlayer } from './layout/TapePlayer';
import profileEffects from './layout/profile-effects.css?inline';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate, language, onLanguageChange }) => {
  return (
    <div className="min-h-screen bg-retro-bg text-retro-dark font-sans selection:bg-retro-accent selection:text-white pb-24 relative overflow-hidden">
      
      {/* Custom Styles for 1-SECOND ONE-SHOT Glitch Effect */}
      <style>{profileEffects}</style>

      <LayoutBackground />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Sidebar / Navigation */}
        <aside className="lg:col-span-3 relative">
          <div className="lg:sticky lg:top-12 space-y-12">
            
            <IdentityBlock language={language} onLanguageChange={onLanguageChange} />

            {/* Navigation */}
            <nav className="relative">
               <div className="absolute -right-4 top-0 bottom-0 w-px bg-retro-border dashed-line hidden lg:block"></div>
               <NavBar activeSection={activeSection} onNavigate={onNavigate} language={language} />
            </nav>

            {/* Tape Player Decoration */}
            <div className="hidden lg:block pt-8 border-t border-retro-border/50">
               <TapePlayer />
            </div>

            <SystemStatus />

          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 min-h-[50vh] relative">
          <SectionHeader activeSection={activeSection} />

          <div className="relative">
             {children}
          </div>
        </main>

      </div>
    </div>
  );
};
