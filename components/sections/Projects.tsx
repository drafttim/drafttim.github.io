import React, { useState } from 'react';
import type { Project, Language } from '../../types';
import { Github, Folder, ArrowUpRight, X, Maximize2, Terminal, Cpu, Target, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectList } from '../../data/projects';
import { projectsContent } from '../../content/projects';

interface ProjectsProps {
  language: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const t = projectsContent[language];

  return (
    <div className="space-y-12 relative">
      <header className="flex items-end gap-4 pb-4 border-b-2 border-retro-dark max-w-2xl">
        <h2 className="text-3xl font-bold uppercase tracking-tight">{t.title}</h2>
        <span className="font-mono text-xs text-retro-dim mb-1.5">{t.subtitle}</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectList.map((project, idx) => (
          <motion.div 
            key={idx} 
            onClick={() => setSelectedId(idx)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="group relative bg-retro-surface p-1 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
             
             {/* Decorative Tape Corners */}
             <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-retro-dim/30"></div>
             <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-retro-dim/30"></div>
             
             <div className="bg-[#FDFCF8] border border-retro-border p-8 h-full flex flex-col relative z-10">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Maximize2 size={16} className="text-retro-dim" />
                </div>

                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-retro-bg border border-retro-border rounded-sm">
                        <Folder className="text-retro-dark" size={24} />
                    </div>
                    <span className={`
                        text-[10px] font-bold uppercase tracking-widest px-2 py-1 border
                        ${project.status === 'Complete' ? 'border-green-800/20 text-green-800 bg-green-50' :
                        project.status === 'In Progress' ? 'border-yellow-700/20 text-yellow-800 bg-yellow-50' :
                        'border-gray-500/20 text-gray-600 bg-gray-50'}
                    `}>
                        {t.statusLabels[project.status]}
                    </span>
                </div>
                
                <h3 className="text-xl font-bold text-retro-dark mb-3 group-hover:text-retro-accent transition-colors flex items-center gap-2">
                    {project.title[language]}
                </h3>
                
                <p className="text-retro-dark/70 font-light leading-relaxed mb-8 flex-1">
                    {project.description[language]}
                </p>

                <div className="space-y-6 pt-6 border-t border-retro-border/40">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                            <span key={t} className="text-[10px] font-mono uppercase text-retro-dim bg-retro-surface px-2 py-1 border border-retro-border/50">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-retro-bg/80 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 p-4">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full max-w-4xl pointer-events-auto bg-white border border-retro-border p-1 shadow-[20px_20px_0px_#E6E2D6] relative"
               >
                  <div className="bg-[#FDFCF8] p-8 md:p-10 h-full border border-retro-border relative overflow-y-auto max-h-[85vh]">
                       <button 
                          onClick={() => setSelectedId(null)}
                          className="absolute top-4 right-4 p-2 hover:bg-retro-surface transition-colors rounded-full z-20"
                       >
                          <X size={20} className="text-retro-dark" />
                       </button>

                       <ProjectDetails project={projectList[selectedId]} language={language} />
                  </div>
               </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProjectDetailsProps {
  project: Project;
  language: Language;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, language }) => {
  const t = projectsContent[language];

  return (
    <div className="space-y-8">
       {/* Header */}
       <div className="flex items-start gap-6 border-b border-dashed border-retro-border pb-6">
           <div className="p-4 bg-retro-bg border border-retro-border rounded-sm shrink-0 hidden md:block">
               <Folder className="text-retro-dark" size={32} />
           </div>
           <div className="flex-1">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <h3 className="text-4xl font-bold text-retro-dark leading-none uppercase tracking-tight">
                     {project.title[language]}
                  </h3>
                  <span className={`
                                            text-[10px] font-bold uppercase tracking-widest px-2 py-1 border self-start md:self-auto
                                            ${project.status === 'Complete' ? 'border-green-800/20 text-green-800 bg-green-50' :
                                            project.status === 'In Progress' ? 'border-yellow-700/20 text-yellow-800 bg-yellow-50' :
                                            'border-gray-500/20 text-gray-600 bg-gray-50'}
                                        `}>
                     {t.statusLabels[project.status]}
                 </span>
               </div>
               <div className="flex gap-2 flex-wrap">
                  {project.tech.map(t => (
                     <span key={t} className="text-[10px] font-mono uppercase text-retro-accent border border-retro-accent/20 px-2 py-0.5">
                         {t}
                     </span>
                  ))}
               </div>
           </div>
       </div>

       {/* Video Player */}
       {project.details?.videoUrl && (
         <div className="relative group bg-retro-dark border border-retro-border p-1">
             <div className="absolute top-0 left-0 bg-retro-accent text-white text-[9px] font-mono px-2 py-0.5 z-10 tracking-widest flex items-center gap-2">
                 <PlayCircle size={10} className="animate-pulse" />
                 {t.demoTape}
             </div>
             <div className="aspect-video w-full bg-black overflow-hidden relative">
                 <video
                     controls
                     className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                     src={project.details.videoUrl}
                 />
                 {/* Scanline overlay effect */}
                 <div className="absolute inset-0 pointer-events-none bg-[url('https://transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay"></div>
             </div>
         </div>
       )}

       {/* Detailed Breakdown */}
       <div className="grid md:grid-cols-2 gap-8 md:gap-12">
         <div className="space-y-3">
           <h4 className="font-mono text-xs text-retro-dim uppercase tracking-widest flex items-center gap-2">
             <Target size={14}/> {t.problem}
           </h4>
           <p className="text-sm text-retro-dark/80 leading-relaxed border-l-2 border-retro-border pl-4">
             {project.details?.problem[language] || project.description[language]}
           </p>
         </div>

         <div className="space-y-3">
           <h4 className="font-mono text-xs text-retro-dim uppercase tracking-widest flex items-center gap-2">
             <Cpu size={14}/> {t.solution}
           </h4>
           <p className="text-sm text-retro-dark/80 leading-relaxed border-l-2 border-retro-accent pl-4">
             {project.details?.solution[language] || "Solution details restricted."}
           </p>
         </div>
       </div>

       {/* System Capabilities */}
       {project.details?.features && (
         <div className="bg-retro-surface/30 p-6 border border-retro-border relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Terminal size={100} />
             </div>

             <h4 className="font-mono text-xs text-retro-dark uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                <Terminal size={14} /> {t.capabilities}
             </h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 relative z-10">
                 {project.details.features[language].map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-xs font-mono text-retro-dark/80">
                         <span className="w-1.5 h-1.5 bg-retro-accent"></span>
                         {feature}
                     </li>
                 ))}
             </ul>
         </div>
       )}

       <div className="pt-6 border-t border-retro-border/40 flex gap-4">
           {project.repoUrl && (
             <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-retro-dark text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-retro-accent transition-colors">
                 <Github size={16} /> {t.viewRepo}
             </a>
           )}
           {project.demoUrl && (
             <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-retro-dark text-retro-dark font-mono text-xs font-bold uppercase tracking-wider hover:bg-retro-bg transition-colors">
                 <ArrowUpRight size={16} /> {t.liveDemo}
             </a>
           )}
       </div>
    </div>
  );
};
