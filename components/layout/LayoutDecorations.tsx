import { Battery, Cpu, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SectionId } from '../../types';

export const LayoutBackground = () => {
  return (
    <>
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
    </>
  );
};

export const SystemStatus = () => {
  return (
    <div className="hidden lg:block pt-8 border-t border-retro-border/50">
       <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-retro-dim">
          <div>
            <span className="block opacity-50">UPTIME</span>
            <span className="text-retro-dark">56h 12m</span>
          </div>
          <div>
            <span className="block opacity-50">VERSION</span>
            <span className="text-retro-dark">v2.5.0-RC</span>
          </div>
          <div className="col-span-2 flex gap-4 pt-2">
             <Cpu size={14} className="opacity-50" />
             <Battery size={14} className="opacity-50" />
             <Wifi size={14} className="opacity-50" />
          </div>
       </div>
    </div>
  );
};

export const SectionHeader = ({ activeSection }: { activeSection: SectionId }) => {
  return (
    <div className="flex justify-between items-center mb-12 border-b border-dashed border-retro-border pb-4">
       <div className="font-mono text-xs text-retro-dim tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-retro-accent animate-pulse rounded-sm"></span>
          {'SECTION //'} {activeSection.toUpperCase()}
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
  );
};
