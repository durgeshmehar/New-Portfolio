import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dm-portfolio-achievements";

export const ACHIEVEMENTS = [
  { id: "about", label: "Read the story", hint: "Visit the About page" },
  { id: "experience", label: "Traced the work", hint: "Visit the Experience page" },
  { id: "rate-limiter", label: "Tamed the traffic", hint: "Finish the rate limiter challenge" },
  { id: "stack-builder", label: "Assembled the stack", hint: "Select 3 tools in Skills" },
];

const VALID_IDS = new Set(ACHIEVEMENTS.map((item) => item.id));

const readStored = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cleaned = parsed.filter((id) => VALID_IDS.has(id));
    if (cleaned.length !== parsed.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
};

let listeners = [];
let cache = null;

const getCache = () => {
  if (cache === null) cache = readStored();
  return cache;
};

const notify = () => {
  listeners.forEach((listener) => listener(cache));
};

const persist = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // storage unavailable; keep in-memory only
  }
  notify();
};

export const unlockAchievement = (id) => {
  if (!ACHIEVEMENTS.some((item) => item.id === id)) return;
  const current = getCache();
  if (current.includes(id)) return;
  cache = [...current, id];
  persist();
};

export const lockAchievement = (id) => {
  const current = getCache();
  if (!current.includes(id)) return;
  cache = current.filter((item) => item !== id);
  persist();
};

export const toggleAchievement = (id) => {
  if (getCache().includes(id)) lockAchievement(id);
  else unlockAchievement(id);
};

export const useAchievements = () => {
  const [unlocked, setUnlocked] = useState(() => getCache());

  useEffect(() => {
    const listener = (value) => setUnlocked(value);
    listeners.push(listener);
    setUnlocked(getCache());
    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }, []);

  const unlock = useCallback((id) => unlockAchievement(id), []);
  const lock = useCallback((id) => lockAchievement(id), []);
  const toggle = useCallback((id) => toggleAchievement(id), []);

  return { unlocked, total: ACHIEVEMENTS.length, unlock, lock, toggle, achievements: ACHIEVEMENTS };
};
