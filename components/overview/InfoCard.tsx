import type React from 'react';

interface InfoCardProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, code, children }) => (
  <div className="bg-white border border-retro-border p-6 h-full relative group hover:border-retro-accent transition-colors shadow-sm">
      <div className="absolute top-0 left-0 w-1 h-1 bg-retro-dim/30 group-hover:bg-retro-accent transition-colors" />
      <div className="absolute top-0 right-0 w-1 h-1 bg-retro-dim/30 group-hover:bg-retro-accent transition-colors" />
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-retro-dim/30 group-hover:bg-retro-accent transition-colors" />
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-retro-dim/30 group-hover:bg-retro-accent transition-colors" />

      <div className="flex justify-between items-start mb-4 border-b border-dashed border-retro-border pb-2">
          <h3 className="font-bold uppercase tracking-wider text-retro-dark">{title}</h3>
          <span className="font-mono text-[10px] text-retro-dim">REF_{code}</span>
      </div>
      <div className="text-retro-dark/80 text-sm leading-relaxed">
          {children}
      </div>
  </div>
);
