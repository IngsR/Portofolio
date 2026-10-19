export type PageId = "home" | "portfolio" | "about" | "contact";
export type Locale = "id" | "en";

export interface ProjectTranslations {
  title?: string;
  shortDescription?: string;
  category?: string;
  period?: string;
  role?: string;
  problem?: string;
  solution?: string;
  metrics?: { label?: string; value?: string }[];
  markdownContent?: string;
}

export interface CertificationTranslations {
  title?: string;
  issuer?: string;
  issueDate?: string;
  period?: string;
  category?: string;
  description?: string;
}

export interface ExperienceTranslations {
  role?: string;
  period?: string;
  type?: string;
  description?: string;
  achievements?: string[];
}

export interface EducationTranslations {
  degree?: string;
  period?: string;
  details?: string;
}

export interface SkillCategoryTranslations {
  title?: string;
  description?: string;
  alsoUsedLabel?: string;
}

export type ProjectCategory = string;

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: string[];
  image: string;
  imageFull?: string; // varian 1280w untuk modal/detail
  fallbackImage?: string;
  featured?: boolean;
  publishedDate: string;
  period?: string;
  role?: string;
  demoUrl?: string;
  githubUrl?: string;
  problem?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
  markdownContent: string;
  translations?: Partial<Record<Locale, ProjectTranslations>>;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  coreStack: string[];
  alsoUsed: string[];
  alsoUsedLabel?: string;
  translations?: Partial<Record<Locale, SkillCategoryTranslations>>;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Full-time" | "Freelance" | "Contract" | "Remote" | string;
  description?: string;
  achievements: string[];
  techStack: string[];
  translations?: Partial<Record<Locale, ExperienceTranslations>>;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  details?: string;
  translations?: Partial<Record<Locale, EducationTranslations>>;
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
  translations?: Partial<Record<Locale, CertificationTranslations>>;
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
  category:
    | "Web Development"
    | "Konsultasi"
    | "Proyek Next.js"
    | "Kerja Sama"
    | "Lainnya";
  message: string;
  createdAt: string;
}

export interface EngineeringMindsetSkill {
  id: string;
  category: string;
  title: string;
  narrative: string;
  technologies: string[];
  iconName:
    | "Layers"
    | "Layout"
    | "Server"
    | "Database"
    | "Terminal"
    | "Binary"
    | "Cpu"
    | "Workflow"
    | string;
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

export interface FaqItem {
  question: string;
  answer: string;
}

export type CVLanguage = "id" | "en";

export interface CVExperienceItem {
  id: string;
  role: string;
  company: string;
  link?: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  techStack: string[];
}

export interface CVProjectItem {
  id: string;
  title: string;
  role: string;
  link?: string;
  period?: string;
  description: string;
  techStack: string[];
}

export interface CVContent {
  header: {
    name: string;
    title: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    website: string;
    location: string;
    birthInfo: string;
  };
  summary: string;
  labels: {
    modalTitle: string;
    modalSubtitle: string;
    printButton: string;
    downloadPdf: string;
    downloadDocx: string;
    downloading: string;
    internship: string;
    projects: string;
    education: string;
    certifications: string;
    technicalSkills: string;
    techStackLabel: string;
    liveDemoLabel: string;
    langId: string;
    langEn: string;
  };
  internship: CVExperienceItem[];
  projects: CVProjectItem[];
  education: {
    id: string;
    degree: string;
    institution: string;
    period: string;
    details?: string;
  }[];
  certificationsByIssuer: Record<
    string,
    {
      id: string;
      title: string;
      issueDate: string;
    }[]
  >;
  skills: {
    category: string;
    items: string;
  }[];
}

export interface PortfolioData {
  userProfile: UserProfile;
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  engineeringMindsetSkills: EngineeringMindsetSkill[];
  contactFaq: FaqItem[];
}
