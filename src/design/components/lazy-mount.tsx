import React from "react";

interface LazyMountProps {
  children: React.ReactNode;
  className?: string;
  /** Perkiraan tinggi konten (px) agar placeholder tidak menyebabkan layout shift */
  estimatedHeight?: number;
}

/**
 * Wrapper render-optimization untuk section berat (grid sertifikasi):
 * - `content-visibility: auto` → browser melewati render/paint elemen yang
 *   belum masuk viewport, sehingga scroll di HP tetap mulus.
 * - `contain-intrinsic-size` menjaga tinggi section tetap terestimasi
 *   (tidak ada layout jump) sebelum konten di-render.
 * Tanpa JS, tanpa state, tanpa IntersectionObserver — murni CSS containment,
 * jadi tidak menambah biaya hydrate/render React sama sekali.
 */
export const LazyMount: React.FC<LazyMountProps> = ({
  children,
  className,
  estimatedHeight = 1200,
}) => (
  <div
    className={className}
    style={{
      contentVisibility: "auto",
      containIntrinsicSize: `auto ${estimatedHeight}px`,
    }}
  >
    {children}
  </div>
);
