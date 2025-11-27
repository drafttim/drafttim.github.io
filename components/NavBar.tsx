import React from 'react';
import { SectionId, NavItem, Language } from '../types';
import { FolderOpen, BookOpen, Grid, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavBarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  language: Language;
}

export const NavBar: React.FC<NavBarProps> = ({ activeSection, onNavigate, language }) => {
  const getLabel = (id: SectionId) => {
    if (language === 'zh') {
      switch (id) {
        case 'overview': return '概览 Overview';
        case 'research': return '研究 Research';
        case 'projects': return '项目 Projects';
        case 'contact': return '联系 Contact';
      }
    }
    // Default English
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  const navItems: NavItem[] = [
    { id: 'overview', label: getLabel('overview'), icon: 'Grid' },
    { id: 'research', label: getLabel('research'), icon: 'BookOpen' },
    { id: 'projects', label: getLabel('projects'), icon: 'FolderOpen' },
    { id: 'contact', label: getLabel('contact'), icon: 'Mail' },
  ];

  return (
    <ul className="space-y-6">
      {navItems.map((item, index) => {
        const isActive = activeSection === item.id;
        
        return (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className="group w-full text-left relative outline-none focus:outline-none flex items-center gap-4"
            >
              {/* Tape Indicator for Active State */}
              {isActive && (
                <motion.div 
                    className="absolute -left-4 w-full h-full bg-[#E8E5D8] -rotate-1 shadow-sm -z-10 border border-retro-border/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
              )}

              {/* Status LED */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden lg:block">
                 <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-retro-accent shadow-[0_0_5px_rgba(224,108,67,0.6)]' : 'bg-retro-dim/20'}`}></div>
                 {isActive && (
                    <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                        className="absolute inset-0 bg-retro-accent rounded-full"
                    />
                 )}
              </div>

              <div className={`
                w-8 h-8 flex items-center justify-center border transition-all duration-300
                ${isActive ? 'border-retro-dark bg-retro-dark text-white' : 'border-retro-border text-retro-dim group-hover:border-retro-dark group-hover:text-retro-dark'}
              `}>
                {getIcon(item.id)}
              </div>

              <div className="flex flex-col">
                  <span className={`
                    font-mono text-xs uppercase tracking-widest transition-colors
                    ${isActive ? 'text-retro-dark font-bold' : 'text-retro-dim group-hover:text-retro-dark'}
                  `}>
                    0{index + 1} //
                  </span>
                  <span className={`
                    text-lg font-bold tracking-tight transition-colors
                    ${isActive ? 'text-retro-dark' : 'text-retro-dark/60 group-hover:text-retro-dark'}
                  `}>
                    {item.label}
                  </span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

function getIcon(id: SectionId) {
  switch (id) {
    case 'overview': return <Grid size={14} />;
    case 'research': return <BookOpen size={14} />;
    case 'projects': return <FolderOpen size={14} />;
    case 'contact': return <Mail size={14} />;
  }
}