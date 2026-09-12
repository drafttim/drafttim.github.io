import React, { useState } from 'react';
import { Github, AtSign, Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '../../types';
import { contactContent } from '../../content/contact';
import { ContactLink } from '../contact/ContactLink';
import { IdentityCard } from '../contact/IdentityCard';
import { StatusWidget } from '../contact/StatusWidget';
import wechat from '../src/assets/wechat.png'

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const t = contactContent[language];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-12 max-w-4xl relative min-h-[50vh]">
      
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-2 border-retro-dark pb-4">
        <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight">{t.title}</h2>
            <span className="font-mono text-xs text-retro-dim mb-1.5">{t.subtitle}</span>
        </div>
        <StatusWidget />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 pt-4">
        
        {/* Left Col: Identity */}
        <div className="space-y-8">
            <div onClick={() => setShowQR(true)} className="cursor-pointer group">
                <IdentityCard language={language} />
                <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-retro-dim tracking-widest">
                    [CLICK_TO_OPEN_QR_CODE]
                </div>
            </div>
        </div>

        {/* Right Col: Interactive Channels */}
        <div className="space-y-4">
             <div className="flex items-center gap-2 font-mono text-xs text-retro-dim uppercase tracking-widest mb-4">
                <Activity size={14} className="animate-pulse text-retro-accent" /> 
                {t.freq}
             </div>

             <ContactLink 
                icon={<AtSign size={18} />}
                label={t.mailbox}
                value="xiaochiliu@mail.bnu.edu.cn"
                action={() => handleCopy("xiaochiliu@mail.bnu.edu.cn", "email")}
                status={copied === 'email' ? 'COPIED' : 'SECURE'}
                isCopied={copied === 'email'}
             />

             <ContactLink 
                icon={<Github size={18} />}
                label={t.repository}
                value="github.com/drafttim"
                href="https://github.com/drafttim"
                status="PUBLIC"
             />
        </div>

      </div>

      <AnimatePresence>
        {showQR && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowQR(false)}
                    className="fixed inset-0 bg-retro-bg/80 backdrop-blur-sm z-50"
                />
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 p-4">
                    <motion.div
                         initial={{ opacity: 0, scale: 0.95, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.95, y: 20 }}
                         transition={{ duration: 0.3, ease: "easeOut" }}
                         className="bg-white p-8 border border-retro-dark shadow-[20px_20px_0px_#E6E2D6] relative pointer-events-auto max-w-sm w-full flex flex-col items-center"
                    >
                        {/* Tape decoration */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#E8E5D8]/90 shadow-sm rotate-1 border-l border-r border-[#D6D2C4]" />

                        <button 
                            onClick={() => setShowQR(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-retro-surface transition-colors rounded-full"
                        >
                            <X size={20} className="text-retro-dark" />
                        </button>
                        
                        <h3 className="text-xl font-bold uppercase tracking-widest text-retro-dark mb-6 mt-2">{t.digitalKey}</h3>
                        
                        <div className="bg-white p-2 border-2 border-dashed border-retro-border mb-6">
                            <img 
                                src={wechat}
                                className="w-48 h-48 mix-blend-multiply"
                            />
                        </div>

                        <div className="w-full space-y-2">
                             <div className="flex justify-between text-[10px] font-mono text-retro-dim border-b border-dashed border-retro-border pb-1">
                                <span>{t.type}</span>
                                <span className="text-retro-dark">VCARD_3.0</span>
                             </div>
                             <div className="flex justify-between text-[10px] font-mono text-retro-dim">
                                <span>{t.size}</span>
                                <span className="text-retro-dark">2KB</span>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
};
