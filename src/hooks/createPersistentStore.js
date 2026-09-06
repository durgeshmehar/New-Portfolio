import { useEffect, useState } from "react";

// Small shared store: module-level cache + localStorage + subscribers, read
// through a hook. Same shape as useAchievements.js, factored out so the lens
// and visitor-preference stores don't each reimplement it.
export const createPersistentStore = (storageKey, defaultValue, sanitize) => {
  let cache = null;
  let listeners = [];

  const read = () => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return defaultValue;
      const parsed = JSON.parse(raw);
      return sanitize ? sanitize(parsed, defaultValue) : parsed;
    } catch {
      return defaultValue;
    }
  };

  const get = () => {
    if (cache === null) cache = read();
    return cache;
  };

  const set = (next) => {
    const value = typeof next === "function" ? next(get()) : next;
    cache = sanitize ? sanitize(value, defaultValue) : value;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cache));
    } catch {
      // storage unavailable; keep in-memory only
    }
    listeners.forEach((listener) => listener(cache));
  };

  const useStore = () => {
    const [value, setValue] = useState(get);

    useEffect(() => {
      const listener = (next) => setValue(next);
      listeners.push(listener);
      setValue(get());
      return () => {
        listeners = listeners.filter((item) => item !== listener);
      };
    }, []);

    return [value, set];
  };

  return { get, set, useStore };
};
