import { create } from 'zustand';
import type { PageId } from '../types';

interface AppState {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  isDark: boolean;
  setDark: (dark: boolean) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activePage: 'home',
  setActivePage: (page) => set({ activePage: page }),
  isDark: false,
  setDark: (dark) => {
    set({ isDark: dark });
    try {
      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
      }
    } catch (e) {
      console.warn('Could not save theme preference to localStorage', e);
    }
  },
  toggleTheme: () => {
    const state = get();
    state.setDark(!state.isDark);
  },
  initTheme: () => {
    if (typeof window === 'undefined') return;
    try {
      const savedTheme = localStorage.getItem('portfolio_theme');
      const shouldBeDark = savedTheme === 'dark';
      get().setDark(shouldBeDark);
    } catch {
      // Ignore if blocked by browser
    }
  },
}));
