export type SectionId = 'overview' | 'research' | 'projects' | 'contact';
export type Language = 'en' | 'zh';

export interface NavItem {
  id: SectionId;
  label: string;
  icon?: string;
}

export interface Paper {
  title: string;
  conference: string;
  year: number;
  abstract: string;
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: 'Complete' | 'In Progress' | 'Archived';
  details?: {
    problem: string;
    solution: string;
    features: string[];
    videoUrl?: string;
  };
}