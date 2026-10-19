import { useCallback, useEffect } from "react";
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
 *
 * ESC handler dipasang sekali saat ada modal terbuka; membaca state store langsung
 * (tanpa reaktif) untuk menghindari registrasi ulang listener tiap render.
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

  // hasAnyModalOpen dihitung dari nilai reaktif saat ini
  const hasAnyModalOpen =
    isDetailOpen ||
    isPreviewOpen ||
    isCVOpen ||
    !!selectedMarkdownProject ||
    isCreateModalOpen;

  // Global ESC handler: dipasang hanya saat ada modal terbuka.
  // Membaca store langsung di dalam handler (bukan via closure capture)
  // agar listener tidak perlu didaftarkan ulang tiap state berubah.
  useEffect(() => {
    if (!hasAnyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Baca store snapshot langsung — zero re-render cost
      if (isDetailOpenStore.get()) { isDetailOpenStore.set(false); return; }
      if (isPreviewOpenStore.get()) { isPreviewOpenStore.set(false); return; }
      if (isCVModalOpenStore.get()) { isCVModalOpenStore.set(false); return; }
      if (selectedProjectForMarkdownStore.get()) { selectedProjectForMarkdownStore.set(null); return; }
      if (isCreateModalOpenStore.get()) { isCreateModalOpenStore.set(false); return; }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [hasAnyModalOpen]);

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
