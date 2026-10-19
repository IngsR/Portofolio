import portfolioDataJson from "../data/portfolio.json";
import { CertificationItem, PageId, ProjectItem } from "../types";
import { createStore } from "../utils/store";

const initialProjects = portfolioDataJson.projects as ProjectItem[];

export const isDarkStore = createStore<boolean>(false);
export const activePageStore = createStore<PageId>("home");
export const projectsStore = createStore<ProjectItem[]>(initialProjects);

// Modals
export const selectedProjectForMarkdownStore = createStore<ProjectItem | null>(
  null,
);
export const isCreateModalOpenStore = createStore<boolean>(false);
export const isCVModalOpenStore = createStore<boolean>(false);

// Details
export const selectedProjectForDetailStore = createStore<ProjectItem | null>(
  null,
);
export const selectedCertForDetailStore = createStore<CertificationItem | null>(
  null,
);
export const isDetailOpenStore = createStore<boolean>(false);

// Quick card preview (island-scoped, agar halaman utama tidak re-render saat modal buka/tutup)
export type PreviewItem = ProjectItem | CertificationItem;
export const selectedPreviewItemStore = createStore<PreviewItem | null>(null);
export const isPreviewOpenStore = createStore<boolean>(false);
