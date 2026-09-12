import type { Localized } from '../types';

export interface OverviewContent {
  optimizing: string;
  complexity: string;
  academic: string;
  researchAreas: string;
  readPapers: string;
  contactMe: string;
  available: string;
  expGrad: string;
  activeProjects: string;
  systemModules: string;
  kernelLog: string;
  dept: string;
  computerScience: string;
  researchInterest: string;
  phdCandidate: string;
  techInstitute: string;
  thesisDescription: string;
  approximationAlgorithms: string;
  graphTheory: string;
  distributedConsensus: string;
  project1: string;
  introduction: string;
}

export const overviewContent: Localized<OverviewContent> = {
  en: {
    optimizing: 'Building',
    complexity: 'and Optimization',
    academic: 'Academic Status',
    researchAreas: 'Research Areas',
    readPapers: 'Read Papers',
    contactMe: 'Contact Me',
    available: 'Endless progress',
    expGrad: 'Exp. Grad: JUNE 2026',
    activeProjects: 'Active Projects',
    systemModules: 'TOOLKIT',
    kernelLog: 'Kernel_Log',
    dept: 'Dept',
    computerScience: 'Applied Statistics',
    researchInterest: 'I am particularly interested in the intersection of theory and practice. My work often involves designing algorithms with provable guarantees that are also practical for deployment in real-world large language models.',
    phdCandidate: 'Senior Undergraduate',
    techInstitute: 'College of Arts and Sciences, Dept. of Statistics',
    thesisDescription: 'Currently conducting advanced research in LLM security. My thesis focuses on strengthening the robustness of watermark embedding and detection mechanisms for large language models.',
    approximationAlgorithms: 'LLM Security',
    graphTheory: 'Transfer Learning',
    distributedConsensus: 'Large-sample Theory',
    project1: 'Robust LLM watermark detection based on Cauchy combinations',
    introduction: 'Welcome to my home page! I explore the intersection of LLM safety and statistics. My goal is to uncover efficient solutions to hard problems in large language models.',
  },
  zh: {
    optimizing: '构建',
    complexity: '与优化',
    academic: '学术现状',
    researchAreas: '研究领域',
    readPapers: '阅读论文',
    contactMe: '联系我',
    available: '无限进步...',
    expGrad: '预计毕业：2026年6月',
    activeProjects: '进行中的项目',
    systemModules: '技术栈 TOOLKIT',
    kernelLog: '内核日志 Kernel_Log',
    dept: '系别',
    computerScience: '应用统计学',
    researchInterest: '我对理论与实践的交叉领域特别感兴趣。我的工作通常涉及设计具有可证明保证的算法，这些算法在实际大模型部署中也具有实用性。',
    phdCandidate: '本科四年级',
    techInstitute: '文理学院，统计学系',
    thesisDescription: '目前进行大模型溯源安全的前沿研究。我的论文重点是增强大模型水印掺杂与识别机制的稳健性。',
    approximationAlgorithms: '大模型安全 LLM Security',
    graphTheory: '迁移学习 Transfer Learning',
    distributedConsensus: '大样本理论 Large-sample Theory',
    project1: '基于柯西组合的稳健大模型水印识别',
    introduction: '欢迎来到我的主页！我探索大模型安全与统计学的交叉领域。我的目标是为大模型中的难题找到高效解决方案。',
  },
};
