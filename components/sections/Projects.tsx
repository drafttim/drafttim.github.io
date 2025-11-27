import React, { useState } from 'react';
import { Project, Language } from '../../types';
import { Github, Folder, ArrowUpRight, X, Maximize2, Terminal, Cpu, Target, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import demoMp4 from '../src/assets/demo.mp4';

const projectList = [
  {
    title: {
      en: "SOFT-Cauchy Watermark Detection",
      zh: "水印识别 SOFT-Cauchy"
    },
    description: {
      en: "An innovative watermark detection scheme that addresses the critical performance degradation of watermark signals under adversarial attacks.",
      zh: "一个创新的水印方案，解决当前水印信号在面临人为攻击时检验性能急剧下降的问题。"
    },
    tech: ["PyTorch", "Soft Prompting", "Statistical Analysis"],
    status: 'In Progress',
    repoUrl: 'https://github.com/drafttim/llm-watermark-adaptive-cauthy-main',
    // demoUrl: 'https://example.com',
    details: {
      problem: {
        en: "Existing watermark detection systems suffer severe performance drops when facing adversarial attacks, as traditional methods struggle with output probability prediction and are vulnerable to localized manipulations.",
        zh: "现有水印检测系统在面对对抗性攻击时性能严重下降，传统方法难以准确预测输出概率，且易受局部操纵攻击的影响。"
      },
      solution: {
        en: "Implemented soft prompt training approach to overcome output probability prediction challenges, combined with Cauchy combination strategy to defend against localized attacks.",
        zh: "采用软提示词训练思路攻克输出概率预测难题，结合柯西组合策略有效防御局部攻击。"
      },
      features: {
        en: [
          "Soft Prompt-Based Training",
          "Cauchy Combination Defense",
          "Robust Output Probability Prediction",
          "Localized Attack Resistance"
        ],
        zh: [
          "基于软提示词的训练",
          "柯西组合防御机制",
          "鲁棒的输出概率预测",
          "局部攻击抵抗能力"
        ]
      }
    }
  },
  {
    title: {
      en: "CardioSentinel",
      zh: "心鉴 CardioSentinel"
    },
    description: {
      en: "An AI-powered system for early detection of chronic heart disease and personalized healthcare guidance using multimodal deep learning and LLM fine-tuning.",
      zh: "一套完整的系统，能够实现慢性心脏病的早期识别并针对患者个人情况提供个性化建议。"
    },
    tech: ["PyTorch", "LoRA/QLoRA", "VAE", "DPO"],
    status: 'Complete',
    // repoUrl: 'https://github.com', // Example URL
    // demoUrl: 'https://example.com',   // Example URL
    details: {
      problem: {
        en: "Traditional cardiovascular diagnosis relies on manual interpretation of heterogeneous medical data (ECG, imaging, lab results), lacking early detection and personalized treatment recommendations. Existing AI models struggle to integrate multimodal data effectively.",
        zh: "传统心血管疾病诊断依赖人工解读异构医疗数据（心电图、影像、生化指标），缺乏早期预警能力和个性化治疗建议。现有AI模型难以有效整合多模态数据。"
      },
      solution: {
        en: "Developed VAE-driven multimodal fusion model encoding cardiac data into unified latent space, achieving 1% accuracy improvement. Fine-tuned Llama-3.0-8B using LoRA/QLoRA with 8,851 GPT-4-generated, clinician-verified samples, applying DPO alignment and safety filtering.",
        zh: "开发基于VAE的多模态融合模型将心脏数据编码到统一潜在空间，准确率提升1%。采用LoRA/QLoRA微调Llama-3.0-8B，使用8,851条GPT-4生成并经医生审核的样本，通过DPO对齐与安全过滤确保可靠性。"
      },
      features: {
        en: [
          "VAE-Based Multimodal Fusion",
          "Parameter-Efficient LLM Fine-Tuning (LoRA/QLoRA)",
          "GPT-4 Knowledge Distillation",
          "Direct Preference Optimization (DPO)"
        ],
        zh: [
          "基于VAE的多模态融合",
          "参数高效的大模型微调（LoRA/QLoRA）",
          "GPT-4知识蒸馏",
          "直接偏好优化（DPO）"
        ]
      },
      videoUrl: demoMp4
    }
  }
  // {
  //   title: {
  //     en: "Distributed-KV",
  //     zh: "分布式键值存储"
  //   },
  //   description: {
  //     en: "A fault-tolerant key-value store implementing Raft consensus algorithm. Designed to simulate network partitions and leader election failures.",
  //     zh: "一个实现Raft共识算法的容错键值存储系统。旨在模拟网络分区和领导者选举失败等场景。"
  //   },
  //   tech: ["Go", "gRPC"],
  //   status: 'Archived',
  //   repoUrl: 'https://github.com', // Example URL
  //   demoUrl: 'https://example.com',   // Example URL
  //   details: {
  //     problem: {
  //       en: "Understanding distributed consensus requires observing failure modes that are difficult to reproduce reliably in standard development environments.",
  //       zh: "理解分布式共识需要观察在标准开发环境中难以可靠复现的故障模式。"
  //     },
  //     solution: {
  //       en: "Built a deterministic simulation harness that allows injecting specific network faults (latency, packet loss, partitions) to verify Raft safety and liveness properties.",
  //       zh: "构建了一个确定性的模拟工具，允许注入特定的网络故障（如延迟、丢包、分区），以验证Raft算法的安全性和活性属性。"
  //     },
  //     features: {
  //       en: [
  //         "Raft Consensus Implementation",
  //         "Log Replication & Snapshotting",
  //         "Deterministic Fault Injection",
  //         "Linearizability Checker"
  //       ],
  //       zh: [
  //         "Raft共识算法实现",
  //         "日志复制与快照",
  //         "确定性故障注入",
  //         "线性一致性检查器"
  //       ]
  //     }
  //   }
  // }
];

interface ProjectsProps {
  language: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const t = {
    title: language === 'zh' ? '项目展示' : 'Project Deck',
    subtitle: language === 'zh' ? '/// 代码与演示 CODE & DEMO' : '/// CODE & DEMO',
    problem: language === 'zh' ? '问题空间' : 'Problem Space',
    solution: language === 'zh' ? '工程方案' : 'Engineered Solution',
    capabilities: language === 'zh' ? '系统能力' : 'System Capabilities',
    viewRepo: language === 'zh' ? '查看仓库' : 'View Repository',
    liveDemo: language === 'zh' ? '在线演示' : 'Live Demo',
    demoTape: language === 'zh' ? '演示带_01' : 'DEMO_TAPE_01',
  };

  const getStatusLabel = (status: string) => {
      if (language !== 'zh') return status;
      if (status === 'Complete') return '已完成';
      if (status === 'In Progress') return '进行中';
      if (status === 'Archived') return '已归档';
      return status;
  }

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
                        {getStatusLabel(project.status)}
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

                       {(() => {
                         const project = projectList[selectedId];
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
                                            {getStatusLabel(project.status)}
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
                       })()}
                  </div>
               </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};