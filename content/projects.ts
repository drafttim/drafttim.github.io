import type { Localized, Project } from '../types';

interface ProjectsContent {
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  capabilities: string;
  viewRepo: string;
  liveDemo: string;
  demoTape: string;
  statusLabels: Record<Project['status'], string>;
}

export const projectsContent: Localized<ProjectsContent> = {
  en: {
    title: 'Project Deck',
    subtitle: '/// CODE & DEMO',
    problem: 'Problem Space',
    solution: 'Engineered Solution',
    capabilities: 'System Capabilities',
    viewRepo: 'View Repository',
    liveDemo: 'Live Demo',
    demoTape: 'DEMO_TAPE_01',
    statusLabels: {
      Complete: 'Complete',
      'In Progress': 'In Progress',
      Archived: 'Archived',
    },
  },
  zh: {
    title: '项目展示',
    subtitle: '/// 代码与演示 CODE & DEMO',
    problem: '问题空间',
    solution: '工程方案',
    capabilities: '系统能力',
    viewRepo: '查看仓库',
    liveDemo: '在线演示',
    demoTape: '演示带_01',
    statusLabels: {
      Complete: '已完成',
      'In Progress': '进行中',
      Archived: '已归档',
    },
  },
};
