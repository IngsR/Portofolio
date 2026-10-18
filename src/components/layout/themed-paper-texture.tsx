"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PaperTexture } from "@paper-design/shaders-react";

export const ThemedPaperTexture: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark((prev) => (prev !== dark ? dark : prev));
    };

    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.addEventListener("astro:after-swap", updateTheme);

    return () => {
      observer.disconnect();
      document.removeEventListener("astro:after-swap", updateTheme);
    };
  }, []);

  // Light mode: soft cream #f3ede6 & velvet charcoal #36454f
  // Dark mode: kembalikan theme paper asli (#f7f2e9, #e9e0d2, #786953)
  const themeColors = useMemo(
    () =>
      isDark
        ? {
            colorPaper: "#f7f2e9",
            colorBack: "#e9e0d2",
            colorShadow: "#786953",
          }
        : {
            colorPaper: "#f3ede6",
            colorBack: "#e5ddd3",
            colorShadow: "#36454f",
          },
    [isDark],
  );

  return (
    <PaperTexture
      className="paper-texture-background"
      aria-hidden="true"
      maxPixelCount={240000}
      speed={0}
      colorBack={themeColors.colorBack}
      colorPaper={themeColors.colorPaper}
      colorShadow={themeColors.colorShadow}
      roughness={0.8}
      roughnessSize={0.72}
      fiber={0.62}
      fiberSize={0.7}
      folds={0}
      wrinkles={0.95}
      wrinkleSize={0.82}
      crumples={0.24}
      crumpleCount={7}
      drops={0}
    />
  );
};
