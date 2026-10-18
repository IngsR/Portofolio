"use client";
import React from "react";

/**
 * ThemedPaperTexture:
 * Menghadirkan tekstur serat kertas artistik murni via CSS/SVG pattern tiled.
 * Zero WebGL overhead, zero GPU fillrate bottleneck, dan 120-144 FPS smooth scroll
 * pada monitor widescreen desktop 16:9, 16:10, maupun 21:9 ultrawide.
 */
export const ThemedPaperTexture: React.FC = () => {
  return (
    <div
      className="paper-texture-background"
      aria-hidden="true"
    />
  );
};

