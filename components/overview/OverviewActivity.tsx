import type React from 'react';
import { Cpu, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { overviewContent } from '../../content/overview';
import { activityLogs, toolkit } from '../../data/overview';
import type { Language } from '../../types';

export const OverviewActivity: React.FC<{ language: Language }> = ({ language }) => {
  const t = overviewContent[language];

  return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: 0.3, duration: 0.5 }}
         className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4"
      >

         {/* System Config / Tech Stack */}
         <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-dashed border-retro-border pb-2">
                <Cpu size={16} className="text-retro-dim" />
                <span className="font-mono text-xs text-retro-dim uppercase tracking-widest">
                    {t.systemModules}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {toolkit.map((tech, i) => (
                    <motion.div
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-retro-surface/50 border border-retro-border p-3 flex items-center justify-between group hover:border-retro-accent transition-colors"
                    >
                        <span className="font-mono text-xs uppercase text-retro-dark">{tech}</span>
                        <div className="w-1.5 h-1.5 bg-retro-dim rounded-full group-hover:bg-retro-accent transition-colors"></div>
                    </motion.div>
                ))}
            </div>
         </div>

         {/* System Logs */}
         <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-dashed border-retro-border pb-2">
                <Terminal size={16} className="text-retro-dim" />
                <span className="font-mono text-xs text-retro-dim uppercase tracking-widest">
                    {t.kernelLog}
                </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
                {activityLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <span className="text-retro-dim">{log.date}</span>
                        <span className="flex-1 truncate">{log.event[language]}</span>
                        <span className={`
                            px-1.5 py-0.5 border text-[9px]
                            ${log.status === 'SUCCESS' ? 'border-green-800/20 text-green-800 bg-green-50' :
                              log.status === 'PASSED' ? 'border-green-800/20 text-green-800 bg-green-50' :
                              log.status === 'HONORS' ? 'border-green-800/20 text-green-800 bg-green-50' :
                              'border-retro-dim text-retro-dim'}
                        `}>
                            {log.status}
                        </span>
                    </div>
                ))}
            </div>
         </div>

      </motion.div>
  );
};
