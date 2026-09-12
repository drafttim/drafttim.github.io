import type { Localized } from '../types';

export const toolkit = ['Python', 'PyTorch', 'LLM SFT', 'LLM RAG', 'Docker', 'SQL'];

interface ActivityLog {
  date: string;
  event: Localized;
  status: string;
}

export const activityLogs: ActivityLog[] = [
  { date: '2026-05-09', event: { en: 'Undergraduate Thesis Defense: Outstanding Thesis', zh: '本科毕业答辩获评优秀论文' }, status: 'SUCCESS' },
  { date: '2025-11-20', event: { en: 'Undergraduate Thesis Proposal', zh: '本科毕业论文开题' }, status: 'PASSED' },
  { date: '2025-10-28', event: { en: 'Paper accepted at STAT', zh: '论文被 STAT 接收' }, status: 'SUCCESS' },
  { date: '2025-09-25', event: { en: 'Master’s Program Accepted.', zh: '完成保研流程' }, status: 'SUCCESS' },
];
