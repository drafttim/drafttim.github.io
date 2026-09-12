import type React from 'react';
import { Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactContent } from '../../content/contact';
import type { Language } from '../../types';

export const IdentityCard: React.FC<{language: Language}> = ({ language }) => {
    const t = contactContent[language];

    return (
        <motion.div
            whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
            className="perspective-1000 w-full"
        >
            <div className="relative bg-white border border-retro-border p-6 shadow-md overflow-hidden">
                 {/* Card Header */}
                 <div className="flex justify-between items-start border-b-2 border-retro-dark pb-4 mb-4">
                     <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-retro-dark text-white flex items-center justify-center font-bold text-xl font-mono">
                            XC
                         </div>
                         <div className="leading-none">
                             <div className="text-[10px] font-mono text-retro-dim uppercase">Identity_Ref</div>
                             <div className="font-bold text-retro-dark uppercase">
                                {t.name}
                             </div>
                         </div>
                     </div>
                     <Radio size={16} className="text-retro-accent animate-pulse" />
                 </div>

                 <div className="space-y-3 font-mono text-xs text-retro-dark/80">
                     <div className="flex justify-between">
                         <span className="text-retro-dim">{t.role}</span>
                         <span className="font-bold">{t.roleValue}</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-retro-dim">{t.unit}</span>
                         <span className="font-bold">{t.unitValue}</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-retro-dim">WECHAT_ID</span>
                         <span className="font-bold tracking-widest">L1025036046</span>
                     </div>
                 </div>

                 {/* Barcode Strip */}
                 <div className="mt-6 h-8 bg-retro-dark opacity-10 flex items-center justify-center overflow-hidden">
                     <div className="w-full h-full repeating-linear-gradient-90 opacity-50" />
                 </div>
            </div>
        </motion.div>
    );
};
