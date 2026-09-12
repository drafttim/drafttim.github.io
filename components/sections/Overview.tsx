import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import type { SectionId, Language } from '../../types';
import { overviewContent } from '../../content/overview';
import { InfoCard } from '../overview/InfoCard';
import { OverviewHero } from '../overview/OverviewHero';
import { OverviewActivity } from '../overview/OverviewActivity';
import { createOverviewCards } from '../overview/overviewCards';

interface OverviewProps {
    onNavigate: (id: SectionId) => void;
    language: Language;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigate, language }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const t = overviewContent[language];

  const cardData = createOverviewCards(t);

  return (
    <div className="space-y-16 max-w-4xl relative">
      
      {/* Hero Section */}
      <OverviewHero language={language} onNavigate={onNavigate} />

      {/* Info Grid with Expansion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-retro-border/20 pt-12">
        {cardData.map((card, index) => (
            <motion.div
                key={card.id}
                onClick={() => setSelectedId(card.id)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="cursor-pointer relative z-0"
            >
                <InfoCard title={card.title} code={card.code}>
                     {card.content}
                     <div className="mt-4 flex justify-end">
                        <Maximize2 size={14} className="text-retro-dim opacity-50 hover:opacity-100 transition-opacity" />
                     </div>
                </InfoCard>
            </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-retro-bg/80 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 p-4">
                {cardData.filter(c => c.id === selectedId).map((card) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-lg pointer-events-auto"
                    >
                         <div className="relative group h-full">
                            {/* Card Tape */}
                            <div className="absolute -top-3 left-4 w-16 h-4 bg-[#E8E5D8] opacity-80 -rotate-2 z-10 border-l border-r border-[#CDC9BC]" />
                            
                            <div className="bg-white border border-retro-border p-8 h-full shadow-[20px_20px_0px_#E6E2D6] relative overflow-hidden">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="absolute top-4 right-4 p-2 hover:bg-retro-surface transition-colors rounded-full z-20"
                                >
                                    <X size={20} className="text-retro-dark" />
                                </button>

                                <div className="flex justify-between items-start mb-6 border-b border-dashed border-retro-border pb-4">
                                    <h3 className="font-bold uppercase tracking-widest text-retro-dark text-xl">{card.title}</h3>
                                    <span className="font-mono text-xs text-retro-accent font-bold">REF_{card.code}</span>
                                </div>
                                <div className="text-retro-dark/80 leading-relaxed">
                                    {card.content}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {card.details}
                                    </motion.div>
                                </div>
                            </div>
                          </div>
                    </motion.div>
                ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Enrichment Section */}
      <OverviewActivity language={language} />
    </div>
  );
};

export default Overview;
