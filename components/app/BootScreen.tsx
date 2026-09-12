import { motion } from 'framer-motion';

export const BootScreen = () => (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-retro-bg font-mono text-retro-dark">
        <div className="w-64 space-y-4">
          <div className="flex justify-between text-xs text-retro-dim tracking-widest">
             <span>INITIALIZING</span>
             <span>...</span>
          </div>
          <div className="h-1 w-full bg-retro-border overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-retro-accent"
            />
          </div>
          <div className="font-mono text-[10px] text-retro-dim text-center opacity-70">
            LOADING ASSETS // TAPE_DRIVE_A
          </div>
        </div>
      </div>
);
