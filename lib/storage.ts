"use client";

/**
 * Safely access localStorage to prevent crashes in browsers with restricted storage
 * Or during server-side rendering.
 */
export const storage = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`Local storage access failed for key "${key}":`, e);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`Local storage set failed for key "${key}":`, e);
    }
  },
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Local storage removal failed for key "${key}":`, e);
    }
  },
};
