import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Decorative Component: Animated Tape Player
export const TapePlayer = () => {
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
