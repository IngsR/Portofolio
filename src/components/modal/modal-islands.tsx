"use client";
/**
 * Modal Islands — komponen modal terisolasi (island architecture).
 *
 * Komponen ini sendiri yang subscribe ke global store modal, sehingga
 * membuka/menutup modal TIDAK me-render ulang halaman (Hero/Portfolio)
 * beserta puluhan card di dalamnya. Hanya island ini yang re-render.
 */
import React, { useCallback } from "react";
import {
  isDetailOpenStore,
  isPreviewOpenStore,
  selectedCertForDetailStore,
  selectedPreviewItemStore,
  selectedProjectForDetailStore,
} from "../../store/portfolio";
import { CertificationItem, ProjectItem } from "../../types";
import { useStore } from "../../utils/store";
import { CardPreviewModal } from "./card-preview-modal";
import { Detail } from "./detail";

/**
 * Island untuk Detail modal (project / certificate).
 * Pasang sekali per halaman; tidak butuh props state sama sekali.
 */
export const DetailModalIsland: React.FC<{
  onOpenMarkdown: (project: ProjectItem) => void;
}> = ({ onOpenMarkdown }) => {
  const isOpen = useStore(isDetailOpenStore);
  const project = useStore(selectedProjectForDetailStore);
  const certificate = useStore(
    selectedCertForDetailStore,
  ) as CertificationItem | null;

  const handleClose = useCallback(() => {
    isDetailOpenStore.set(false);
  }, []);

  if (!isOpen) return null;

  return (
    <Detail
      isOpen={isOpen}
      onClose={handleClose}
      project={project}
      certificate={certificate}
      onOpenMarkdown={onOpenMarkdown}
    />
  );
};

/**
 * Island untuk CardPreviewModal (quick preview).
 * Item di dalam store bisa project maupun certificate.
 */
export const PreviewModalIsland: React.FC = () => {
  const isOpen = useStore(isPreviewOpenStore);
  const item = useStore(selectedPreviewItemStore);

  const handleClose = useCallback(() => {
    isPreviewOpenStore.set(false);
  }, []);

  const handleOpenDetail = useCallback(
    (next: ProjectItem | CertificationItem) => {
      isPreviewOpenStore.set(false);
      if ("demoUrl" in next || "role" in next) {
        selectedProjectForDetailStore.set(next);
        selectedCertForDetailStore.set(null);
      } else {
        selectedCertForDetailStore.set(next as CertificationItem);
        selectedProjectForDetailStore.set(null);
      }
      isDetailOpenStore.set(true);
    },
    [],
  );

  if (!isOpen || !item) return null;

  const isProject = "demoUrl" in item || "role" in item;

  return (
    <CardPreviewModal
      isOpen={isOpen}
      onClose={handleClose}
      project={isProject ? (item as ProjectItem) : null}
      certificate={isProject ? null : (item as CertificationItem)}
      onOpenDetail={handleOpenDetail}
    />
  );
};
