import { useCallback, useEffect, useMemo } from "react";
import portfolioDataJson from "../data/portfolio.json";
import { projectsStore } from "../store/portfolio";
import type { ProjectItem } from "../types";
import { isProjectItem } from "../utils/guard";
import { useStore } from "../utils/store";

const initialProjects = portfolioDataJson.projects as ProjectItem[];
let isProjectsInitialized = false;

export function useProjects() {
  const projects = useStore(projectsStore);

  // Sinkronisasi data proyek kustom dari localStorage saat hidrasi
  useEffect(() => {
    if (typeof window === "undefined" || isProjectsInitialized) return;
    try {
      const savedProjects = localStorage.getItem("portfolio_projects_list");
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed)) {
          const validProjects = parsed.filter(isProjectItem);
          if (validProjects.length > 0) {
            const customProjects = validProjects.filter(
              (p: ProjectItem) => !initialProjects.some((bp) => bp.id === p.id),
            );
            projectsStore.set([...customProjects, ...initialProjects]);
          }
        }
      }
    } catch (e) {
      console.warn("Could not parse saved projects", e);
    } finally {
      isProjectsInitialized = true;
    }
  }, []);

  const featuredProjects = useMemo(() => {
    const list = [...projects];
    const ingstore = list.find((p) => p.id === "proj-4");
    if (ingstore && !list.some((p) => p.id === "proj-4")) {
      list.push(ingstore);
    }
    return list.filter((p) => p.featured || p.id === "proj-4").slice(0, 4);
  }, [projects]);

  const saveProject = useCallback((newProject: ProjectItem) => {
    projectsStore.set((current) => {
      const updated = [newProject, ...current];
      try {
        localStorage.setItem(
          "portfolio_projects_list",
          JSON.stringify(updated),
        );
      } catch (err) {
        console.error("Failed to persist new project", err);
      }
      return updated;
    });
  }, []);

  const getProjectBySlug = useCallback(
    (slug: string) => {
      return projects.find((p) => p.slug === slug) ?? null;
    },
    [projects],
  );

  const getProjectById = useCallback(
    (id: string) => {
      return projects.find((p) => p.id === id) ?? null;
    },
    [projects],
  );

  return {
    projects,
    featuredProjects,
    saveProject,
    getProjectBySlug,
    getProjectById,
  };
}
