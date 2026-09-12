import { Disc, Globe } from 'lucide-react';
import type { Language } from '../../types';
import { ProfilePhoto } from './ProfilePhoto';

interface IdentityBlockProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const IdentityBlock = ({ language, onLanguageChange }: IdentityBlockProps) => {
  return (
    <div className="space-y-4 relative">
      {/* Tape visual */}
      <div className="absolute -top-6 -left-6 w-24 h-8 bg-[#E8E5D8]/90 shadow-sm -rotate-6 z-10 pointer-events-none border-l-2 border-r-2 border-[#D6D2C4] opacity-80" />

      <div className="border-l-4 border-retro-accent pl-6 py-2 relative">

        <ProfilePhoto />

        <div className="flex items-center justify-between mb-2">
           <div className="flex items-center gap-2 text-retro-accent">
              <Disc className="animate-spin-slow w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.2em] font-mono">Shenzhen China</span>
           </div>

           {/* Language Toggle */}
           <button
              onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-1 text-[10px] font-mono font-bold border border-retro-border px-1.5 py-0.5 hover:bg-retro-dark hover:text-white transition-colors"
           >
              <Globe size={10} />
              {language === 'en' ? 'CN' : 'EN'}
           </button>
        </div>

        <h1 className="text-4xl font-bold leading-none tracking-tighter uppercase text-retro-dark">
          {language === 'en' ? (
              <>Xiaochi Liu<br/>刘 骁驰</>
          ) : (
              <>Xiaochi Liu<br/>刘 骁驰</>
          )}
        </h1>
        <p className="text-sm text-retro-dim mt-2 font-mono">
          {language === 'zh' ? <>北京师范大学 本科四年级<br/>算法与大模型</> : <>Beijing Normal University<br/>Senior Undergraduate<br/>Algorithms &amp; LLMs</>}
        </p>
      </div>
    </div>
  );
};
