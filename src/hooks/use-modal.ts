import { useCallback, useEffect, useMemo } from "react";
import {
  isCreateModalOpenStore,
  isCVModalOpenStore,
  isDetailOpenStore,
  isPreviewOpenStore,
  selectedCertForDetailStore,
  selectedPreviewItemStore,
  selectedProjectForDetailStore,
  selectedProjectForMarkdownStore,
  type PreviewItem,
} from "../store/portfolio";
import type { CertificationItem, ProjectItem } from "../types";
import { useStore } from "../utils/store";

/**
 * Hook untuk mengelola modal Detail & Preview secara terisolasi tanpa memicu re-render
 * pada parent/komponen list halaman.
 */
export function useModal() {
  const isDetailOpen = useStore(isDetailOpenStore);
  const isPreviewOpen = useStore(isPreviewOpenStore);
  const isCVOpen = useStore(isCVModalOpenStore);
  const isCreateModalOpen = useStore(isCreateModalOpenStore);
  const selectedMarkdownProject = useStore(selectedProjectForMarkdownStore);
  const selectedDetailProject = useStore(selectedProjectForDetailStore);
  const selectedDetailCert = useStore(selectedCertForDetailStore);
  const selectedPreviewItem = useStore(selectedPreviewItemStore);

  // Detail Modal Actions
  const openProjectDetail = useCallback((project: ProjectItem) => {
    selectedProjectForDetailStore.set(project);
    selectedCertForDetailStore.set(null);
    isDetailOpenStore.set(true);
  }, []);

  const openCertDetail = useCallback((cert: CertificationItem) => {
    selectedCertForDetailStore.set(cert);
    selectedProjectForDetailStore.set(null);
    isDetailOpenStore.set(true);
  }, []);

  const closeDetail = useCallback(() => {
    isDetailOpenStore.set(false);
  }, []);

  // Preview Modal Actions
  const openPreview = useCallback((item: PreviewItem) => {
    selectedPreviewItemStore.set(item);
    isPreviewOpenStore.set(true);
  }, []);

  const closePreview = useCallback(() => {
    isPreviewOpenStore.set(false);
  }, []);

  // CV Modal Actions
  const openCV = useCallback(() => {
    isCVModalOpenStore.set(true);
  }, []);

  const closeCV = useCallback(() => {
    isCVModalOpenStore.set(false);
  }, []);

  // Markdown Modal Actions
  const openMarkdown = useCallback((project: ProjectItem) => {
    selectedProjectForMarkdownStore.set(project);
  }, []);

  const closeMarkdown = useCallback(() => {
    selectedProjectForMarkdownStore.set(null);
  }, []);

  // Create Project Modal Actions
  const openCreateModal = useCallback(() => {
    isCreateModalOpenStore.set(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    isCreateModalOpenStore.set(false);
  }, []);

  // Global ESC key handler helper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDetailOpen) closeDetail();
        if (isPreviewOpen) closePreview();
        if (isCVOpen) closeCV();
        if (selectedMarkdownProject) closeMarkdown();
        if (isCreateModalOpen) closeCreateModal();
      }
    };

    const hasAnyModalOpen =
      isDetailOpen ||
      isPreviewOpen ||
      isCVOpen ||
      !!selectedMarkdownProject ||
      isCreateModalOpen;

    if (hasAnyModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [
    isDetailOpen,
    isPreviewOpen,
    isCVOpen,
    selectedMarkdownProject,
    isCreateModalOpen,
    closeDetail,
    closePreview,
    closeCV,
    closeMarkdown,
    closeCreateModal,
  ]);

  return {
    isDetailOpen,
    isPreviewOpen,
    isCVOpen,
    isCreateModalOpen,
    selectedMarkdownProject,
    selectedDetailProject,
    selectedDetailCert,
    selectedPreviewItem,
    openProjectDetail,
    openCertDetail,
    closeDetail,
    openPreview,
    closePreview,
    openCV,
    closeCV,
    openMarkdown,
    closeMarkdown,
    openCreateModal,
    closeCreateModal,
  };
}
