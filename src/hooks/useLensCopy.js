import { useLens } from "./useLens";
import { lensCopy } from "../constants/lenses";

// Resolves {eyebrow, title} for a homepage section under the active lens,
// falling back to the section's own default copy when the lens has no
// override for it.
export const useLensCopy = (sectionId, fallback) => {
  const [lens] = useLens();
  return lensCopy(lens, sectionId, fallback);
};
