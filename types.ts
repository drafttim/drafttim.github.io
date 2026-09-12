export type SectionId = 'overview' | 'research' | 'projects' | 'contact';
export type Language = 'en' | 'zh';
export type Localized<T = string> = Record<Language, T>;

export interface NavItem {
  id: SectionId;
  label: Localized;
}

export interface Paper {
  title: string;
  conference: string;
  year: number;
  abstract: string;
  tags: string[];
  authors: string[];
  status: 'Published' | 'Pre-print' | 'Submitted';
  pdfUrl?: string;
  sourceUrl?: string;
}

export interface Project {
  title: Localized;
  description: Localized;
  tech: string[];
  status: 'Complete' | 'In Progress' | 'Archived';
  repoUrl?: string;
  demoUrl?: string;
  details?: {
    problem: Localized;
    solution: Localized;
    features: Localized<string[]>;
    videoUrl?: string;
  };
}
