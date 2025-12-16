import React from 'react';
import { SectionId, Language } from '../types';
import { NavBar } from './NavBar';
import { Disc, Cpu, Battery, Wifi, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import pic from './src/assets/pic.jpg';

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
      <style>{`
        /* 
           Glitch Animation 1 
           0% - 90%: opacity 为 1 (可见)
           100%: opacity 变回 0 (隐藏)
        */
        @keyframes glitch-anim-1 {
          0% { opacity: 1; clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          10% { clip-path: inset(10% 0 85% 0); transform: translate(1px, -1px); }
          20% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          50% { clip-path: inset(65% 0 5% 0); transform: translate(1px, 0px); }
          60% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          90% { opacity: 1; clip-path: inset(85% 0 0% 0); transform: translate(1px, -1px); }
          100% { opacity: 0; clip-path: inset(30% 0 50% 0); transform: translate(0, 0); }
        }
        
        /* Glitch Animation 2 */
        @keyframes glitch-anim-2 {
          0% { opacity: 1; clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          15% { clip-path: inset(15% 0 55% 0); transform: translate(1px, 0px); }
          30% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
          50% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 2px); }
          70% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, -2px); }
          85% { clip-path: inset(25% 0 45% 0); transform: translate(-1px, -1px); }
          95% { opacity: 1; }
          100% { opacity: 0; clip-path: inset(0% 0 80% 0); transform: translate(0, 0); }
        }

        /* 
           Scanline Animation (新增)
           让条纹也只持续 1 秒
        */
        @keyframes scanline-anim {
           0% { opacity: 0; }
           1% { opacity: 1; }   /* 立即显示 */
           90% { opacity: 1; }  /* 保持显示直到快结束 */
           100% { opacity: 0; } /* 结束时隐藏 */
        }

        /* Flash effect */
        @keyframes flash-white {
           0% { opacity: 0; }
           10% { opacity: 0.3; }
           100% { opacity: 0; }
        }

        /* Apply animations on hover */
        .group:hover .glitch-layer-1 {
          animation: glitch-anim-1 1s linear forwards;
        }
        .group:hover .glitch-layer-2 {
          animation: glitch-anim-2 1s linear forwards;
        }
        .group:hover .glitch-flash {
           animation: flash-white 0.5s forwards;
        }
        /* 应用条纹动画 */
        .group:hover .scanline-layer {
           animation: scanline-anim 1s linear forwards;
        }
      `}</style>

      {/* Background Engineering Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ 
            backgroundImage: 'linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} 
      />

      {/* Corner Registration Marks */}
      <div className="fixed top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-retro-dim/50 pointer-events-none z-50"></div>
      <div className="fixed top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-retro-dim/50 pointer-events-none z-50"></div>
      <div className="fixed bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-retro-dim/50 pointer-events-none z-50"></div>
      <div className="fixed bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-retro-dim/50 pointer-events-none z-50"></div>

      {/* Top Decorative Strip */}
      <div className="h-2 w-full bg-retro-border/30 mb-8 md:mb-16 relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-retro-accent/20 skew-x-12"></div>
        <div className="absolute top-0 right-20 h-full w-24 bg-retro-dark/10 repeating-linear-gradient-45"></div>
        <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-20 h-full bg-retro-accent/40 blur-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Sidebar / Navigation */}
        <aside className="lg:col-span-3 relative">
          <div className="lg:sticky lg:top-12 space-y-12">
            
            {/* Identity Block */}
            <div className="space-y-4 relative">
              {/* Tape visual */}
              <div className="absolute -top-6 -left-6 w-24 h-8 bg-[#E8E5D8]/90 shadow-sm -rotate-6 z-10 pointer-events-none border-l-2 border-r-2 border-[#D6D2C4] opacity-80" />
              
              <div className="border-l-4 border-retro-accent pl-6 py-2 relative">
                
                {/* Profile Photo - ONE SHOT GLITCH */}
                <div className="w-28 h-28 mb-6 relative group cursor-pointer">
                    {/* Offset Border Decoration */}
                    <div className="absolute inset-0 border-2 border-retro-dark/20 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative h-full w-full overflow-hidden border border-retro-border bg-retro-surface">
                         
                         {/* 1. Base Image (Normal - Always Visible) */}
                         <img 
                            src={pic}
                            alt="Xiaochi Liu" 
                            className="w-full h-full object-cover relative z-10"
                         />

                         {/* 2. Glitch Layer 1 (Red/Cyan Shift + Slice) */}
                         <div className="glitch-layer-1 absolute inset-0 opacity-0 z-20 mix-blend-hard-light">
                             <img src={pic} className="w-full h-full object-cover filter contrast-150 brightness-125 sepia-[.5] hue-rotate-[-50deg]" alt="" />
                         </div>

                         {/* 3. Glitch Layer 2 (Blue/Magenta Shift + Slice) */}
                         <div className="glitch-layer-2 absolute inset-0 opacity-0 z-20 mix-blend-hard-light">
                             <img src={pic} className="w-full h-full object-cover filter contrast-150 brightness-125 sepia-[.5] hue-rotate-[180deg]" alt="" />
                         </div>

                         {/* 4. White Flash Overlay */}
                         <div className="glitch-flash absolute inset-0 bg-white pointer-events-none z-30 opacity-0 mix-blend-overlay"></div>

                         {/* 5. Scanlines (Now animated for 1s) */}
                         {/* 修改点：去掉了 group-hover:opacity-100，加了类名 scanline-layer */}
                         <div 
                            className="scanline-layer absolute inset-0 opacity-0 z-40 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.4) 50%)', backgroundSize: '100% 3px' }}
                         ></div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-retro-accent"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-retro-accent"></div>
                </div>

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

            {/* Navigation */}
            <nav className="relative">
               <div className="absolute -right-4 top-0 bottom-0 w-px bg-retro-border dashed-line hidden lg:block"></div>
               <NavBar activeSection={activeSection} onNavigate={onNavigate} language={language} />
            </nav>

            {/* Tape Player Decoration */}
            <div className="hidden lg:block pt-8 border-t border-retro-border/50">
               <TapePlayer />
            </div>

            {/* System Status (Decorative) */}
            <div className="hidden lg:block pt-8 border-t border-retro-border/50">
               <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-retro-dim">
                  <div>
                    <span className="block opacity-50">{language === 'zh' ? 'UPTIME' : 'UPTIME'}</span>
                    <span className="text-retro-dark">56h 12m</span>
                  </div>
                  <div>
                    <span className="block opacity-50">{language === 'zh' ? 'VERSION' : 'VERSION'}</span>
                    <span className="text-retro-dark">v2.5.0-RC</span>
                  </div>
                  <div className="col-span-2 flex gap-4 pt-2">
                     <Cpu size={14} className="opacity-50" />
                     <Battery size={14} className="opacity-50" />
                     <Wifi size={14} className="opacity-50" />
                  </div>
               </div>
            </div>

          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 min-h-[50vh] relative">
          {/* Header Markings */}
          <div className="flex justify-between items-center mb-12 border-b border-dashed border-retro-border pb-4">
             <div className="font-mono text-xs text-retro-dim tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-retro-accent animate-pulse rounded-sm"></span>
                {language === 'zh' ? 'SECTION //' : 'SECTION //'} {activeSection.toUpperCase()}
             </div>
             <div className="flex gap-2">
                <div className="w-16 h-2 bg-retro-border/20 relative overflow-hidden">
                    <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 h-full w-1/2 bg-retro-dark/10" 
                    />
                </div>
             </div>
          </div>

          <div className="relative">
             {children}
          </div>
        </main>

      </div>
    </div>
  );
};

// Decorative Component: Animated Tape Player
const TapePlayer = () => {
    return (
      <div className="border border-retro-border p-3 bg-retro-surface/30 relative overflow-hidden group">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-3">
           <span className="text-[9px] font-mono text-retro-dim uppercase tracking-wider">Tape_Drive_B</span>
           <div className="flex gap-1.5">
               <motion.div 
                 animate={{ opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="w-1 h-1 bg-red-500 rounded-full" 
               />
               <div className="w-1 h-1 bg-retro-dim rounded-full opacity-30"></div>
           </div>
        </div>
        
        <div className="flex gap-3 items-center justify-center relative py-2 bg-[#1a1a1a]/5 rounded-sm inner-shadow-sm">
            {/* Left Reel */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-10 h-10 border-[3px] border-retro-dim/40 rounded-full relative"
            >
               <div className="absolute inset-0 border border-dashed border-retro-dim/60 rounded-full"></div>
               <div className="absolute top-1/2 left-0 w-full h-px bg-retro-dim/40 -translate-y-1/2"></div>
               <div className="absolute top-0 left-1/2 h-full w-px bg-retro-dim/40 -translate-x-1/2"></div>
            </motion.div>
            
            {/* Tape Path */}
            <div className="flex-1 h-6 relative overflow-hidden flex items-center">
                <div className="w-full h-px bg-retro-dark/20"></div>
                <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute top-1/2 left-0 w-1/3 h-1 bg-retro-accent/30 -translate-y-1/2 blur-[1px]"
                />
            </div>
  
            {/* Right Reel */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-10 h-10 border-[3px] border-retro-dim/40 rounded-full relative"
            >
               <div className="absolute inset-0 border border-dashed border-retro-dim/60 rounded-full"></div>
               <div className="absolute top-1/2 left-0 w-full h-px bg-retro-dim/40 -translate-y-1/2"></div>
               <div className="absolute top-0 left-1/2 h-full w-px bg-retro-dim/40 -translate-x-1/2"></div>
            </motion.div>
        </div>
        
        <div className="mt-2 flex justify-between text-[8px] font-mono text-retro-dim/70">
            <span className="flex items-center gap-1"><Activity size={8} /> 450 KB/s</span>
            <span>IDX: 302</span>
        </div>
      </div>
    )
}