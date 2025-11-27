import React, { useState } from 'react';
import { Github, AtSign, Copy, Check, ExternalLink, Activity, Wifi, Radio, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../../types';
import wechat from '../src/assets/wechat.png'

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const t = {
    title: language === 'zh' ? '联络方式' : 'Comms Uplink',
    subtitle: language === 'zh' ? '/// 联系我 Contact Me' : '/// Contact Me',
    freq: language === 'zh' ? '可用频率' : 'Available Frequencies',
    digitalKey: language === 'zh' ? 'WECHAT' : 'WECHAT',
    type: language === 'zh' ? '类型' : 'TYPE',
    size: language === 'zh' ? '大小' : 'SIZE',
  };

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
                label={language === 'zh' ? "电子邮箱" : "Mailbox"}
                value="xiaochiliu@mail.bnu.edu.cn"
                action={() => handleCopy("xiaochiliu@mail.bnu.edu.cn", "email")}
                status={copied === 'email' ? 'COPIED' : 'SECURE'}
                isCopied={copied === 'email'}
             />

             <ContactLink 
                icon={<Github size={18} />}
                label={language === 'zh' ? "代码仓库" : "Code Repository"}
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

// Helper Components

const StatusWidget: React.FC = () => (
    <div className="flex items-center gap-4 bg-retro-surface/50 border border-retro-border px-4 py-2">
        <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-retro-dim uppercase">Signal</span>
            <div className="flex gap-0.5 mt-0.5">
                {[1,2,3,4].map(i => (
                    <div key={i} className={`w-1 h-2 ${i < 4 ? 'bg-retro-accent' : 'bg-retro-dim/30'}`} />
                ))}
            </div>
        </div>
        <div className="w-px h-6 bg-retro-border/50" />
        <div className="flex items-center gap-2 text-retro-dark">
            <Wifi size={14} className="animate-pulse" />
            <span className="font-mono text-xs font-bold">594.2 MHz</span>
        </div>
    </div>
);

const IdentityCard: React.FC<{language: Language}> = ({ language }) => {
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
                                {language === 'zh' ? '刘骁驰' : 'XiaochiLiu'}
                             </div>
                         </div>
                     </div>
                     <Radio size={16} className="text-retro-accent animate-pulse" />
                 </div>
                 
                 <div className="space-y-3 font-mono text-xs text-retro-dark/80">
                     <div className="flex justify-between">
                         <span className="text-retro-dim">{language === 'zh' ? '角色' : 'ROLE'}</span>
                         <span className="font-bold">{language === 'zh' ? '研究助理 RESEARCH_FELLOW' : 'RESEARCH_FELLOW'}</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-retro-dim">{language === 'zh' ? '单位' : 'UNIT'}</span>
                         <span className="font-bold">{language === 'zh' ? '北京师范大学 BNU' : 'BEIJING_NORMAL_UNIVERSITY'}</span>
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

interface ContactLinkProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    action?: () => void;
    status: string;
    isCopied?: boolean;
}

const ContactLink: React.FC<ContactLinkProps> = ({ icon, label, value, href, action, status, isCopied }) => {
    const Wrapper = href ? 'a' : 'button';
    const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick: action };

    return (
        <Wrapper 
            {...props as any}
            className="block w-full text-left group"
        >
            <div className="flex items-center justify-between p-4 bg-white border border-retro-border hover:border-retro-dark transition-all duration-300 relative overflow-hidden">
                {/* Hover slide effect */}
                <div className="absolute inset-0 bg-retro-surface/50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0" />
                
                <div className="flex items-center gap-4 relative z-10">
                    <div className={`
                        w-10 h-10 flex items-center justify-center border transition-colors
                        ${isCopied ? 'bg-green-100 border-green-800 text-green-800' : 'bg-retro-bg border-retro-border text-retro-dark group-hover:bg-white'}
                    `}>
                        {isCopied ? <Check size={18} /> : icon}
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-retro-dim uppercase tracking-wider mb-0.5">{label}</div>
                        <div className="font-bold text-retro-dark group-hover:text-retro-accent transition-colors">
                            {value}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                    <motion.span 
                        key={status}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className={`
                            text-[9px] font-mono font-bold px-1.5 py-0.5 border
                            ${isCopied ? 'border-green-800 text-green-800' : 'border-retro-dim/30 text-retro-dim'}
                        `}
                    >
                        {status}
                    </motion.span>
                    {!isCopied && href && <ExternalLink size={12} className="text-retro-dim group-hover:text-retro-dark" />}
                    {!isCopied && !href && <Copy size={12} className="text-retro-dim group-hover:text-retro-dark" />}
                </div>
            </div>
        </Wrapper>
    );
};