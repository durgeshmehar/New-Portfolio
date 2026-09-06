import { createPersistentStore } from "./createPersistentStore";

export const ACCENTS = [
  { id: "violet", label: "Violet", rgb: "167, 139, 250", soft: "#c4b5fd", strong: "#ddd6fe" },
  { id: "cyan", label: "Cyan", rgb: "103, 232, 249", soft: "#a5f3fc", strong: "#cffafe" },
  { id: "emerald", label: "Emerald", rgb: "52, 211, 153", soft: "#6ee7b7", strong: "#a7f3d0" },
  { id: "amber", label: "Amber", rgb: "251, 191, 36", soft: "#fcd34d", strong: "#fde68a" },
  { id: "rose", label: "Rose", rgb: "251, 113, 133", soft: "#fda4af", strong: "#fecdd3" },
  { id: "sky", label: "Sky", rgb: "56, 189, 248", soft: "#7dd3fc", strong: "#bae6fd" },
];

export const FONTS = [
  { id: "mono", label: "Mono", stack: '"JetBrains Mono", ui-monospace, monospace' },
  { id: "poppins", label: "Poppins", stack: '"Poppins", "Montserrat", sans-serif' },
  { id: "inter", label: "Inter", stack: '"Inter", system-ui, sans-serif' },
  { id: "serif", label: "Serif", stack: '"Source Serif 4", Georgia, serif' },
  { id: "grotesk", label: "Grotesk", stack: '"Space Grotesk", "Inter", sans-serif' },
];

// "Constellation" is the permanent, non-removable ambient effect — it has no
// "None" entry any more, so the chip row always has an active selection.
export const EFFECTS = [
  { id: "constellation", label: "Constellation" },
  { id: "snow", label: "Snow" },
  { id: "rain", label: "Rain" },
  { id: "bubbles", label: "Bubbles" },
  { id: "fireflies", label: "Fireflies" },
];

export const CARD_STYLES = [
  { id: "sharp", label: "Sharp", radius: "0.25rem", borderWidth: "1px" },
  { id: "rounded", label: "Rounded", radius: "1rem", borderWidth: "1px" },
  { id: "soft", label: "Soft", radius: "1.75rem", borderWidth: "0px" },
];

// View modes — alternate ways to browse the whole site, not just tint/spacing.
// Editorial/Bento/Cinematic are pure visual redesigns of the same homepage
// content (a CSS layer, not separate pages) — Focus mode and Map view were
// replaced with these after user feedback that the old modes were novelties
// nobody actually used.
export const VIEW_MODES = [
  { id: "normal", label: "Normal" },
  { id: "editorial", label: "Editorial" },
  { id: "bento", label: "Bento grid" },
  { id: "cinematic", label: "Cinematic" },
  { id: "terminal", label: "Terminal mode" },
];

export const NAV_ORIENTATIONS = [
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
];

export const DEFAULT_PREFERENCES = {
  accent: "violet",
  font: "mono",
  effect: "constellation",
  cardStyle: "sharp",
  viewMode: "cinematic",
  navOrientation: "vertical",
};

const sanitize = (value, fallback) => {
  if (!value || typeof value !== "object") return fallback;
  return {
    accent: ACCENTS.some((a) => a.id === value.accent) ? value.accent : fallback.accent,
    font: FONTS.some((f) => f.id === value.font) ? value.font : fallback.font,
    effect: EFFECTS.some((e) => e.id === value.effect) ? value.effect : fallback.effect,
    cardStyle: CARD_STYLES.some((c) => c.id === value.cardStyle) ? value.cardStyle : fallback.cardStyle,
    viewMode: VIEW_MODES.some((v) => v.id === value.viewMode) ? value.viewMode : fallback.viewMode,
    navOrientation: NAV_ORIENTATIONS.some((n) => n.id === value.navOrientation) ? value.navOrientation : fallback.navOrientation,
  };
};

const store = createPersistentStore(
  "dm-portfolio-preferences",
  DEFAULT_PREFERENCES,
  sanitize
);

export const getPreferences = store.get;
export const setPreferences = store.set;
export const usePreferences = store.useStore;

// Pushes accent/font/structure choices onto :root so the whole stylesheet
// follows. viewMode/navOrientation are read directly by components.
export const applyTheme = (prefs) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const accent = ACCENTS.find((a) => a.id === prefs.accent) || ACCENTS[0];
  const font = FONTS.find((f) => f.id === prefs.font) || FONTS[0];
  const card = CARD_STYLES.find((c) => c.id === prefs.cardStyle) || CARD_STYLES[0];
  root.style.setProperty("--accent-rgb", accent.rgb);
  root.style.setProperty("--accent-soft", accent.soft);
  root.style.setProperty("--accent-strong", accent.strong);
  root.style.setProperty("--font-body", font.stack);
  root.style.setProperty("--card-radius", card.radius);
  root.style.setProperty("--card-border-width", card.borderWidth);
};
