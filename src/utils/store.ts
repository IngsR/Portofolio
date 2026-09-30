import { useSyncExternalStore } from "react";

export interface Store<T> {
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: (val: T) => void) => () => void;
}

export const createStore = <T>(initialValue: T): Store<T> => {
  let value = initialValue;
  const listeners = new Set<(val: T) => void>();

  return {
    get: () => value,
    set: (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === "function" ? (next as (prev: T) => T)(value) : next;
      if (Object.is(value, nextValue)) return;
      value = nextValue;
      listeners.forEach((listener) => listener(value));
    },
    subscribe: (listener: (val: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export function useStore<T>(store: Store<T>): T;
export function useStore<T, S>(store: Store<T>, selector: (state: T) => S): S;
export function useStore<T, S = T>(
  store: Store<T>,
  selector?: (state: T) => S,
): S {
  if (!selector) {
    return useSyncExternalStore(store.subscribe, store.get, store.get) as unknown as S;
  }
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(store.get()),
  );
}

