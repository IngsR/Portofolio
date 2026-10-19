import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

let isThemeInitialized = false;

export function useTheme() {
  const isDark = useAppStore((state) => state.isDark);
  const setTheme = useAppStore((state) => state.setDark);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const initTheme = useAppStore((state) => state.initTheme);

  // Inisialisasi tema saat hidrasi client
  useEffect(() => {
    if (typeof window === "undefined" || isThemeInitialized) return;
    initTheme();
    isThemeInitialized = true;
  }, [initTheme]);

  return {
    isDark,
    setTheme,
    toggleTheme,
  };
}
