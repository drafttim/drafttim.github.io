import React, { useState } from 'react';
import { Paper, Language } from '../../types';
import { Download, ExternalLink, Hash, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// The Paper type is inferred to be updated to include optional pdfUrl and sourceUrl.
// For example:
// interface Paper {
//   ...
//   authors: string[];
//   status: 'Published' | 'Pre-print' | 'Submitted';
//   pdfUrl?: string;
//   sourceUrl?: string;
// }

const papers: Paper[] = [
  {
    title: "Adaptive Testing for Segmenting Watermarked Texts From Language Models",
    conference: "STAT",
    year: 2025,
    abstract: "The rapid adoption of large language models (LLMs), such as GPT-4 and Claude 3.5, underscores the need to distinguish LLM-generated text from human-written content to mitigate the spread of misinformation and misuse in education. One promising approach to address this issue is the watermark technique, which embeds subtle statistical signals into LLM-generated text to enable reliable identification. In this paper, we first generalize the likelihood-based LLM detection method of a previous study by introducing a flexible weighted formulation, and further adapt this approach to the inverse transform sampling method. Moving beyond watermark detection, we extend this adaptive detection strategy to tackle the more challenging problem of segmenting a given text into watermarked and non-watermarked substrings. In contrast to the approach in a previous study, which relies on accurate estimation of next-token probabilities that are highly sensitive to prompt estimation, our proposed framework removes the need for precise prompt estimation. Extensive numerical experiments demonstrate that the proposed methodology is both effective and robust in accurately segmenting texts containing a mixture of watermarked and non-watermarked content.",
    tags: ["LLM Security", "Watermark"],
    authors: ["Xingchi Li", "Xiaochi Liu", "Guanxun Li"],
    status: "Published",
    pdfUrl: "https://arxiv.org/pdf/2511.06645", // Has both PDF and source
    sourceUrl: "https://arxiv.org/abs/2511.06645"
  },
//   {
//     title: "Graph Partitioning in Dynamic Networks",
//     conference: "/",
//     year: 2025,
//     abstract: "Analyzing the stability of spectral clustering methods when the underlying graph topology undergoes continuous discrete changes.",
//     tags: ["Graph Theory", "Spectral Analysis"],
//     authors: ["D. Researcher", "E. Colleague"],
//     status: "Published",
//     sourceUrl: "#link-to-source-2" // Only has source
//   },
//   {
//     title: "Resource Allocation in Asynchronous Environments",
//     conference: "arXiv Pre-print",
//     year: 2024,
//     abstract: "A study on deadlock prevention mechanisms in systems without a global clock. We introduce a token-based approach that guarantees liveness.",
//     tags: ["OS", "Concurrency"],
//     authors: ["F. Candidate", "G. Supervisor"],
//     status: "Pre-print",
//     pdfUrl: "#link-to-pdf-3.pdf" // Only has PDF
//   }
];

interface ResearchProps {
  language: Language;
}

export const Research: React.FC<ResearchProps> = ({ language }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const t = {
    title: language === 'zh' ? '研究日志' : 'Research Log',
    subtitle: language === 'zh' ? '/// 发表论文 PUBLICATIONS' : '/// PUBLICATIONS',
    archive: language === 'zh' ? 'ARCHIVE_COPY' : 'ARCHIVE_COPY',
    abstract: language === 'zh' ? '摘要' : 'Abstract',
    keywords: language === 'zh' ? '关键词' : 'Keywords',
    download: language === 'zh' ? '下载 PDF' : 'Download PDF',
    viewSource: language === 'zh' ? '查看源' : 'View Source',
    status: language === 'zh' ? '状态' : 'STATUS',
    authors: language === 'zh' ? '作者' : 'AUTHORS',
  };

  const getPaperStatus = (status: string) => {
    if (language !== 'zh') return status;
    switch (status) {
        case 'Published': return '已发表';
        case 'Pre-print': return '预印本';
        case 'Submitted': return '已提交';
        default: return status;
    }
  };

  return (
    <div className="space-y-12 relative">
      <header className="flex items-end gap-4 pb-4 border-b-2 border-retro-dark max-w-2xl">
        <h2 className="text-3xl font-bold uppercase tracking-tight">{t.title}</h2>
        <span className="font-mono text-xs text-retro-dim mb-1.5">{t.subtitle}</span>
      </header>

      <div className="space-y-8">
        {papers.map((paper, idx) => (
          <motion.div
            key={idx}
            onClick={() => setSelectedId(idx)}
            className="relative pl-0 md:pl-8 group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-retro-border dashed-line hidden md:block"></div>
            <div className="absolute left-[-4px] top-6 w-2 h-2 bg-retro-dark rounded-full hidden md:block group-hover:bg-retro-accent transition-colors"></div>

            <div className="bg-white border border-retro-border p-6 md:p-8 relative hover:border-retro-dark transition-colors duration-300">
                {/* Visual Tape Strip */}
                <div className="absolute -top-2 right-8 w-24 h-5 bg-[#F0EFEB] border border-retro-border/40 rotate-1 flex items-center justify-center opacity-90 z-10">
                    <span className="text-[8px] font-mono text-retro-dim uppercase tracking-widest">{t.archive}</span>
                </div>

                {/* Expansion Hint */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={14} className="text-retro-dim" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 space-y-2">
                        <div className="font-mono text-4xl font-bold text-retro-border/40 group-hover:text-retro-accent/20 transition-colors">
                            {paper.year}
                        </div>
                        <div className="inline-block bg-retro-primary/10 text-retro-primary px-3 py-1 text-xs font-bold border border-retro-primary/20 uppercase tracking-wide">
                            {paper.conference}
                        </div>
                    </div>
                    
                    <div className="md:col-span-9 space-y-4">
                        <h3 className="text-2xl font-bold text-retro-dark leading-tight group-hover:text-retro-accent transition-colors">
                            {paper.title}
                        </h3>
                        <p className="text-retro-dark/70 leading-relaxed font-light line-clamp-3">
                            {paper.abstract}
                        </p>
                        
                        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-retro-border">
                            <div className="flex gap-3">
                                {paper.tags.map(tag => (
                                    <span key={tag} className="flex items-center text-xs font-mono text-retro-dim">
                                        <Hash size={10} className="mr-0.5" />{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
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
                {/* Selected Card Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-3xl pointer-events-auto bg-white border border-retro-border p-8 md:p-12 shadow-[20px_20px_0px_#E6E2D6] relative overflow-y-auto max-h-[85vh]"
                >
                    {/* Tape Decoration */}
                    <div className="absolute -top-4 -left-12 w-48 h-12 bg-[#E8E5D8] opacity-80 -rotate-12 z-10 border-b border-[#CDC9BC] flex items-end justify-center pb-2">
                        <span className="text-[9px] font-mono text-retro-dim/60 tracking-[0.2em]">CONFIDENTIAL_RECORD</span>
                    </div>

                    <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 p-2 hover:bg-retro-surface transition-colors rounded-full z-20"
                    >
                        <X size={24} className="text-retro-dark" />
                    </button>

                    {(() => {
                        const paper = papers[selectedId];
                        return (
                            <div className="space-y-8 pt-4 relative z-10">
                                {/* Header Section */}
                                <div className="border-b border-dashed border-retro-border pb-6 space-y-4">
                                    <div className="flex items-center gap-4 text-retro-dim font-mono text-sm">
                                        <span className="text-retro-accent font-bold">REF_{paper.year}</span>
                                        <span>//</span>
                                        <span className="uppercase tracking-wider">{paper.conference}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-retro-dark leading-tight">
                                        {paper.title}
                                    </h3>
                                </div>

                                {/* Expanded Content */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="prose prose-sm max-w-none text-retro-dark/80 leading-relaxed">
                                            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-retro-dark">{t.abstract}</h4>
                                            <p className="text-base">{paper.abstract}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-4">
                                            {/* Conditionally render Download PDF button */}
                                            {paper.pdfUrl && (
                                                <a 
                                                    href={paper.pdfUrl}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-retro-dark text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-retro-accent transition-colors"
                                                >
                                                    <Download size={16} /> {t.download}
                                                </a>
                                            )}
                                            {/* Conditionally render View Source button */}
                                            {paper.sourceUrl && (
                                                <a 
                                                    href={paper.sourceUrl}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 border border-retro-dark text-retro-dark font-mono text-xs font-bold uppercase tracking-wider hover:bg-retro-bg transition-colors"
                                                >
                                                    <ExternalLink size={16} /> {t.viewSource}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 space-y-6">
                                        <div className="bg-retro-surface/30 p-4 border border-retro-border">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-retro-dim">{t.keywords}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {paper.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-mono text-retro-dark bg-white px-2 py-1 border border-retro-border/50">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="font-mono text-[10px] text-retro-dim space-y-2 p-4 border border-dashed border-retro-border/50">
                                            <div>ID: {paper.year}-{paper.conference.split(' ')[0]}</div>
                                            <div>{t.status}: {getPaperStatus(paper.status)}</div>
                                            <div>{t.authors}: {paper.authors.join(', ')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};