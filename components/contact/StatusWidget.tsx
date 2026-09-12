import type React from 'react';
import { Wifi } from 'lucide-react';

export const StatusWidget: React.FC = () => (
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
