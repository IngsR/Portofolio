import { create } from "zustand";
interface AppState {
  isDark: boolean;
  setDark: (dark: boolean) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isDark: false,
  setDark: (dark) => {
    set({ isDark: dark });
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
  },
  toggleTheme: () => {
    const state = get();
    state.setDark(!state.isDark);
  },
  initTheme: () => {
    if (typeof window === "undefined") return;
    try {
      const savedTheme = localStorage.getItem("portfolio_theme");
      // Light adalah default untuk kunjungan pertama; preferensi pengunjung
      // hanya dipakai bila sebelumnya sudah memilih tema secara eksplisit.
      const shouldBeDark = savedTheme === "dark";
      get().setDark(shouldBeDark);
    } catch {
      // Bila localStorage diblokir, tetap paksa tampilan terang default.
      get().setDark(false);
    }
  },
}));
