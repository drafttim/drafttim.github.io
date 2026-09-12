import type React from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactLinkProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    action?: () => void;
    status: string;
    isCopied?: boolean;
}

export const ContactLink: React.FC<ContactLinkProps> = ({ icon, label, value, href, action, status, isCopied }) => {
    const content = (
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
    );

    return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full text-left group">
            {content}
        </a>
    ) : (
        <button onClick={action} className="block w-full text-left group">
            {content}
        </button>
    );
};
