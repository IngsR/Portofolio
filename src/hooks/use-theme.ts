import { useCallback, useEffect } from "react";
import { isDarkStore } from "../store/portfolio";
import { useStore } from "../utils/store";

let isThemeInitialized = false;

export function useTheme() {
  const isDark = useStore(isDarkStore);

  // Inisialisasi tema saat hidrasi client
  useEffect(() => {
    if (typeof window === "undefined" || isThemeInitialized) return;
    try {
      const savedTheme = localStorage.getItem("portfolio_theme");
      const shouldBeDark = savedTheme === "dark";
      isDarkStore.set(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Abaikan bila storage dicegah oleh izin browser
    } finally {
      isThemeInitialized = true;
    }
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    isDarkStore.set(dark);
    try {
      const root = document.documentElement;
      if (dark) {
        root.classList.add("dark");
        localStorage.setItem("portfolio_theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("portfolio_theme", "light");
      }
    } catch (e) {
      console.warn("Could not save theme preference to localStorage", e);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(!isDarkStore.get());
  }, [setTheme]);

  return {
    isDark,
    setTheme,
    toggleTheme,
  };
}
