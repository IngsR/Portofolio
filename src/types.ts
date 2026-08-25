export type PageId = 'home' | 'portfolio' | 'about' | 'contact';

export type ProjectCategory = string;

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: string[];
  image: string;
  fallbackImage?: string;
  featured?: boolean;
  publishedDate: string;
  period?: string;
  role?: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  markdownContent: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    icon?: string;
    isPrimary?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Freelance' | 'Contract' | 'Remote';
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  details: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  period?: string;
  credentialUrl?: string;
  badgeCode?: string;
  category?: string;
  skills?: string[];
  description?: string;
  image?: string;
  fallbackImage?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
  colorClass: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: 'Web Development' | 'Konsultasi' | 'Proyek Next.js' | 'Kerja Sama' | 'Lainnya';
  message: string;
  createdAt: string;
}

export interface EngineeringMindsetSkill {
  id: string;
  category: string;
  title: string;
  narrative: string;
  technologies: string[];
  iconName: 'Layers' | 'Layout' | 'Server' | 'Database' | 'Terminal' | 'Binary' | 'Cpu' | 'Workflow';
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  location: string;
  workPreference: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  avatarUrl: string;
  statusText: string;
  isAvailableForHire: boolean;
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    happyClients: number;
    codeCommits: string;
  };
  socials: SocialLink[];
}
