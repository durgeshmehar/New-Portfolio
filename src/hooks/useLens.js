import { createPersistentStore } from "./createPersistentStore";
import { LENSES, DEFAULT_LENS } from "../constants/lenses";

const sanitize = (value, fallback) =>
  typeof value === "string" && LENSES[value] ? value : fallback;

const store = createPersistentStore("dm-portfolio-lens", DEFAULT_LENS, sanitize);

export const getLensKey = store.get;
export const setLensKey = store.set;
export const useLens = store.useStore;
