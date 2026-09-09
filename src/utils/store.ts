import { useSyncExternalStore } from "react";

export const createStore = <T>(initialValue: T) => {
  let value = initialValue;
  const listeners = new Set<(val: T) => void>();

  return {
    get: () => value,
    set: (newValue: T) => {
      value = newValue;
      listeners.forEach((l) => l(value));
    },
    subscribe: (listener: (val: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const useStore = <T>(store: {
  get: () => T;
  subscribe: (l: (val: T) => void) => () => void;
}) => {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
};
