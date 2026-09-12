import type { Localized, Paper } from '../types';

interface ResearchContent {
  title: string;
  subtitle: string;
  archive: string;
  abstract: string;
  keywords: string;
  download: string;
  viewSource: string;
  status: string;
  authors: string;
  statusLabels: Record<Paper['status'], string>;
}

export const researchContent: Localized<ResearchContent> = {
  en: {
    title: 'Research Log',
    subtitle: '/// PUBLICATIONS',
    archive: 'ARCHIVE_COPY',
    abstract: 'Abstract',
    keywords: 'Keywords',
    download: 'Download PDF',
    viewSource: 'View Source',
    status: 'STATUS',
    authors: 'AUTHORS',
    statusLabels: {
      Published: 'Published',
      'Pre-print': 'Pre-print',
      Submitted: 'Submitted',
    },
  },
  zh: {
    title: '研究日志',
    subtitle: '/// 发表论文 PUBLICATIONS',
    archive: 'ARCHIVE_COPY',
    abstract: '摘要',
    keywords: '关键词',
    download: '下载 PDF',
    viewSource: '查看源',
    status: '状态',
    authors: '作者',
    statusLabels: {
      Published: '已发表',
      'Pre-print': '预印本',
      Submitted: '已提交',
    },
  },
};
