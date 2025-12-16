import React, { useState } from 'react';
import { ArrowRight, Mail, Cpu, Terminal, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SectionId = 'overview' | 'research' | 'contact';
type Language = 'en' | 'zh';

interface OverviewProps {
    onNavigate: (id: SectionId) => void;
    language: Language;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigate, language }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const t = {
    optimizing: language === 'zh' ? '构建' : 'Building',
    complexity: language === 'zh' ? '与优化' : 'and Optimization',
    academic: language === 'zh' ? '学术现状' : 'Academic Status',
    researchAreas: language === 'zh' ? '研究领域' : 'Research Areas',
    readPapers: language === 'zh' ? '阅读论文' : 'Read Papers',
    contactMe: language === 'zh' ? '联系我' : 'Contact Me',
    available: language === 'zh' ? '无限进步...' : 'Endless progress',
    expGrad: language === 'zh' ? '预计毕业：2026年6月' : 'Exp. Grad: JUNE 2026',
    activeProjects: language === 'zh' ? '进行中的项目' : 'Active Projects',
    systemModules: language === 'zh' ? '技术栈 TOOLKIT' : 'TOOLKIT',
    kernelLog: language === 'zh' ? '内核日志 Kernel_Log' : 'Kernel_Log',
    dept: language === 'zh' ? '系别' : 'Dept',
    role: language === 'zh' ? '角色' : 'Role',
    lab: language === 'zh' ? '实验室' : 'Lab',
    computerScience: language === 'zh' ? '应用统计学' : 'Applied Statistics',
    researchAssistant: language === 'zh' ? '研究助理' : 'Research Assistant',
    sysNetGroup: language === 'zh' ? 'GuanxunLi 研究组' : 'GuanxunLi Group',
    researchInterest: language === 'zh' 
      ? '我对理论与实践的交叉领域特别感兴趣。我的工作通常涉及设计具有可证明保证的算法，这些算法在实际大模型部署中也具有实用性。'
      : 'I am particularly interested in the intersection of theory and practice. My work often involves designing algorithms with provable guarantees that are also practical for deployment in real-world large language models.',
    phdCandidate: language === 'zh' ? '本科四年级' : 'Senior Undergraduate',
    techInstitute: language === 'zh' ? '文理学院，统计学系' : 'College of Arts and Sciences, Dept. of Statistics',
    thesisDescription: language === 'zh'
      ? '目前进行大模型溯源安全的前沿研究。我的论文重点是增强大模型水印掺杂与识别机制的稳健性。'
      : 'Currently conducting advanced research in LLM security. My thesis focuses on strengthening the robustness of watermark embedding and detection mechanisms for large language models.',
    approximationAlgorithms: language === 'zh' ? '大模型安全 LLM Security' : 'LLM Security',
    graphTheory: language === 'zh' ? '迁移学习 Transfer Learning' : 'Transfer Learning',
    distributedConsensus: language === 'zh' ? '大样本理论 Large-sample Theory' : 'Large-sample Theory',
    project1: language === 'zh' ? '基于柯西组合的稳健大模型水印识别' : 'Robust LLM watermark detection based on Cauchy combinations',
    project2: language === 'zh' ? '流处理的动态图分区' : 'Dynamic Graph Partitioning for Stream Processing',
    project3: language === 'zh' ? '分区易发环境中的领导者选举' : 'Leader Election in Partition-Prone Environments',
  };

  const cardData = [
    {
      id: 'academic',
      title: t.academic,
      code: '01',
      content: (
        <>
           <div className="text-lg font-bold mb-1">{t.phdCandidate}</div>
           <div className="text-retro-dim mb-4">{t.techInstitute}</div>
           <div className="text-xs font-mono bg-retro-surface p-2 inline-block border border-retro-border">
              {t.expGrad}
           </div>
        </>
      ),
      details: (
        <div className="mt-6 pt-6 border-t border-dashed border-retro-border space-y-4">
          <p className="text-sm text-retro-dark/80 leading-relaxed">
              {t.thesisDescription}
          </p>
          <div className="grid grid-cols-2 gap-4 bg-retro-surface/30 p-4 border border-retro-border">
              <div>
                  <span className="block text-[10px] font-mono text-retro-dim uppercase">GPA</span>
                  <span className="font-bold text-retro-dark">3.6 / 4.0</span>
              </div>
              <div>
                  <span className="block text-[10px] font-mono text-retro-dim uppercase">{t.dept}</span>
                  <span className="font-bold text-retro-dark">{t.computerScience}</span>
              </div>
              {/* <div>
                  <span className="block text-[10px] font-mono text-retro-dim uppercase">{t.role}</span>
                  <span className="font-bold text-retro-dark">{t.researchAssistant}</span>
              </div>
              <div>
                  <span className="block text-[10px] font-mono text-retro-dim uppercase">{t.lab}</span>
                  <span className="font-bold text-retro-dark">{t.sysNetGroup}</span>
              </div> */}
          </div>
        </div>
      )
    },
    {
      id: 'research',
      title: t.researchAreas,
      code: '02',
      content: (
         <ul className="space-y-2">
            <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-accent"></span>
                {t.approximationAlgorithms}
            </li>
            <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-accent"></span>
                {t.graphTheory}
            </li>
            <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-accent"></span>
                {t.distributedConsensus}
            </li>
         </ul>
      ),
      details: (
        <div className="mt-6 pt-6 border-t border-dashed border-retro-border space-y-4">
          <p className="text-sm text-retro-dark/80 leading-relaxed">
              {t.researchInterest}
          </p>
          <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-retro-dark">{t.activeProjects}</h4>
              <ul className="list-disc list-inside text-sm text-retro-dark/70 space-y-1">
                  <li>{t.project1}</li>
                  {/* <li>{t.project2}</li>
                  <li>{t.project3}</li> */}
              </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-16 max-w-4xl relative">
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative space-y-8"
      >
        {/* Decorative background tape */}
        <div className="absolute top-10 -right-10 w-48 h-12 bg-retro-surface/50 border-t border-b border-retro-border/30 -rotate-3 pointer-events-none" />

        <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-3">
                <span className="w-2 h-2 bg-retro-accent rounded-full animate-pulse"></span>
                <span className="font-mono text-xs text-retro-accent font-bold uppercase tracking-widest">
                    {t.available}
                </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tight text-retro-dark">
              <motion.span
                className="inline-block"
                animate={{ skewX: [0, -10, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
              >
                  {t.optimizing}
              </motion.span>
              <br/>
              <span className="text-retro-dim/80 ml-8 md:ml-16 relative">
                 {t.complexity}.
                 {/* Blinking Block Cursor */}
                 <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute -right-8 bottom-2 w-4 h-12 bg-retro-accent inline-block"
                 />
              </span>
            </h2>
        </div>

        <p className="text-xl md:text-2xl leading-relaxed font-light text-retro-dark/80 max-w-2xl border-l border-retro-border pl-6 py-2">
          {language === 'zh' 
            ? '欢迎来到我的主页！我探索大模型安全与统计学的交叉领域。我的目标是为大模型中的难题找到高效解决方案。'
            : 'Welcome to my home page! I explore the intersection of LLM safety and statistics. My goal is to uncover efficient solutions to hard problems in large language models.'}
        </p>

        <div className="flex flex-wrap gap-6 pt-4">
            <button 
                onClick={() => onNavigate('research')}
                className="group relative bg-retro-dark text-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-2">{t.readPapers} <ArrowRight size={16}/></span>
                <div className="absolute inset-0 bg-retro-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button 
                onClick={() => onNavigate('contact')}
                className="group relative border border-retro-dark text-retro-dark px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider overflow-hidden hover:text-white transition-colors"
            >
                <span className="relative z-10 flex items-center gap-2">{t.contactMe} <Mail size={16}/></span>
                <div className="absolute inset-0 bg-retro-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
        </div>
      </motion.section>

      {/* Info Grid with Expansion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-retro-border/20 pt-12">
        {cardData.map((card, index) => (
            <motion.div
                key={card.id}
                onClick={() => setSelectedId(card.id)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="cursor-pointer relative z-0"
            >
                <InfoCard title={card.title} code={card.code}>
                     {card.content}
                     <div className="mt-4 flex justify-end">
                        <Maximize2 size={14} className="text-retro-dim opacity-50 hover:opacity-100 transition-opacity" />
                     </div>
                </InfoCard>
            </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-retro-bg/80 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 p-4">
                {cardData.filter(c => c.id === selectedId).map((card) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-lg pointer-events-auto"
                    >
                         <div className="relative group h-full">
                            {/* Card Tape */}
                            <div className="absolute -top-3 left-4 w-16 h-4 bg-[#E8E5D8] opacity-80 -rotate-2 z-10 border-l border-r border-[#CDC9BC]" />
                            
                            <div className="bg-white border border-retro-border p-8 h-full shadow-[20px_20px_0px_#E6E2D6] relative overflow-hidden">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="absolute top-4 right-4 p-2 hover:bg-retro-surface transition-colors rounded-full z-20"
                                >
                                    <X size={20} className="text-retro-dark" />
                                </button>

                                <div className="flex justify-between items-start mb-6 border-b border-dashed border-retro-border pb-4">
                                    <h3 className="font-bold uppercase tracking-widest text-retro-dark text-xl">{card.title}</h3>
                                    <span className="font-mono text-xs text-retro-accent font-bold">REF_{card.code}</span>
                                </div>
                                <div className="text-retro-dark/80 leading-relaxed">
                                    {card.content}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {card.details}
                                    </motion.div>
                                </div>
                            </div>
                          </div>
                    </motion.div>
                ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Enrichment Section */}
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
                {['Python', 'PyTorch', 'LLM SFT', 'LLM RAG', 'Docker', 'SQL'].map((tech, i) => (
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
                {[
                    { date: '2025-11-20', event: language === 'zh' ? '毕业论文开题' : 'Thesis Proposal', status: 'PASSED' },
                    { date: '2025-10-28', event: language === 'zh' ? '论文被 STAT 接收' : 'Paper accepted at STAT', status: 'SUCCESS' },
                    { date: '2025-09-25', event: language === 'zh' ? '完成保研流程' : 'Master’s Program Accepted.', status: 'SUCCESS' },
                    // { date: '2025-09-25', event: language === 'zh' ? 'GraphFlow v2.0 发布' : 'GraphFlow v2.0 Release', status: 'DEPLOYED' },
                    // { date: '2023-11-05', event: language === 'zh' ? '获得研究经费' : 'Research Grant Awarded', status: 'RECEIVED' }
                ].map((log, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <span className="text-retro-dim">{log.date}</span>
                        <span className="flex-1 truncate">{log.event}</span>
                        <span className={`
                            px-1.5 py-0.5 border text-[9px]
                            ${log.status === 'SUCCESS' ? 'border-green-800/20 text-green-800 bg-green-50' : 
                              log.status === 'PASSED' ? 'border-green-800/20 text-green-800 bg-green-50' :
                              'border-retro-dim text-retro-dim'}
                        `}>
                            {log.status}
                        </span>
                    </div>
                ))}
            </div>
         </div>

      </motion.div>
    </div>
  );
};

interface InfoCardProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, code, children }) => (
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

export default Overview;