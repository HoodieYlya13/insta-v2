"use client";

let isLoggingOut = false;
const listeners = new Set<() => void>();

export const authStore = {
  subscribe: (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  getSnapshot: () => isLoggingOut,
  setLoggingOut: (value: boolean) => {
    isLoggingOut = value;
    listeners.forEach((l) => l());
  },
};
