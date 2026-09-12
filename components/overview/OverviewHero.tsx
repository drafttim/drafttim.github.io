import type React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { overviewContent } from '../../content/overview';
import type { Language, SectionId } from '../../types';

interface OverviewHeroProps {
  language: Language;
  onNavigate: (id: SectionId) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ language, onNavigate }) => {
  const t = overviewContent[language];

  return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative space-y-8"
      >
        {/* Decorative background tape */}
        <div className="absolute top-10 -right-10 w-48 h-12 bg-retro-surface/50 border-t border-b border-retro-border/30 -rotate-3 pointer-events-none" />

        <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-3">
                <span className="w-2 h-2 bg-retro-accent rounded-full animate-pulse"></span>
                <span className="font-mono text-xs text-retro-accent font-bold uppercase tracking-widest">
                    {t.available}
                </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tight text-retro-dark">
              <motion.span
                className="inline-block"
                animate={{ skewX: [0, -10, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
              >
                  {t.optimizing}
              </motion.span>
              <br/>
              <span className="text-retro-dim/80 ml-8 md:ml-16 relative">
                 {t.complexity}.
                 {/* Blinking Block Cursor */}
                 <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute -right-8 bottom-2 w-4 h-12 bg-retro-accent inline-block"
                 />
              </span>
            </h2>
        </div>

        <p className="text-xl md:text-2xl leading-relaxed font-light text-retro-dark/80 max-w-2xl border-l border-retro-border pl-6 py-2">
          {t.introduction}
        </p>

        <div className="flex flex-wrap gap-6 pt-4">
            <button
                onClick={() => onNavigate('research')}
                className="group relative bg-retro-dark text-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-2">{t.readPapers} <ArrowRight size={16}/></span>
                <div className="absolute inset-0 bg-retro-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
                onClick={() => onNavigate('contact')}
                className="group relative border border-retro-dark text-retro-dark px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider overflow-hidden hover:text-white transition-colors"
            >
                <span className="relative z-10 flex items-center gap-2">{t.contactMe} <Mail size={16}/></span>
                <div className="absolute inset-0 bg-retro-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
        </div>
      </motion.section>
  );
};
