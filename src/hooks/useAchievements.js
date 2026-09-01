import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dm-portfolio-achievements";

export const ACHIEVEMENTS = [
  { id: "about", label: "Read the story", hint: "Visit the About page" },
  { id: "experience", label: "Traced the work", hint: "Visit the Experience page" },
  { id: "projects", label: "Explored the builds", hint: "Visit the Projects page" },
  { id: "education", label: "Checked the roots", hint: "Visit the Education page" },
  { id: "contact", label: "Said hello", hint: "Visit the Contact page" },
  { id: "living-portrait", label: "Noticed you", hint: "Spend a moment with the hero portrait" },
  { id: "rate-limiter", label: "Tamed the traffic", hint: "Finish the rate limiter challenge" },
  { id: "stack-builder", label: "Assembled the stack", hint: "Select every tool in Skills" },
];

const readStored = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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

export const unlockAchievement = (id) => {
  if (!ACHIEVEMENTS.some((item) => item.id === id)) return;
  const current = getCache();
  if (current.includes(id)) return;
  cache = [...current, id];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // storage unavailable; keep in-memory only
  }
  notify();
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

  return { unlocked, total: ACHIEVEMENTS.length, unlock, achievements: ACHIEVEMENTS };
};
