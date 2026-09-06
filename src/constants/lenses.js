// Each lens reframes the homepage for a different audience: which sections
// appear, in what order, and how each one is introduced.
//
// `sections` ids map to components in src/App.jsx (SECTION_COMPONENTS).
// `copy` overrides a section's eyebrow/title; anything omitted falls back to
// the component's own default text.

export const DEFAULT_LENS = "recruiter";

export const LENSES = {
  recruiter: {
    label: "Recruiter",
    copy: "A concise story of ownership, outcomes, and the problems I am ready to solve next.",
    sections: ["about", "impact", "journal", "skills", "dsa", "opensource"],
    sectionCopy: {
      about: {
        eyebrow: "HOW I WORK",
        title: "What drives me",
      },
      impact: {
        eyebrow: "WHAT I'VE OWNED",
        title: "Work with real stakes, told in the order that matters.",
      },
      journal: {
        eyebrow: "HOW I THINK",
        title: "Journal",
      },
      skills: {
        eyebrow: "WHAT I WORK WITH",
        title: "Skills",
      },
      dsa: {
        eyebrow: "HOW I SOLVE PROBLEMS",
        title: "DSA stats",
      },
      opensource: {
        eyebrow: "CODE IN THE OPEN",
        title: "Open Source",
      },
    },
  },

  engineer: {
    label: "Engineer",
    copy: "The decisions behind the work: resilient systems, search at scale, and thoughtful trade-offs.",
    sections: ["about", "journal", "skills", "dsa", "opensource", "impact"],
    sectionCopy: {
      about: {
        eyebrow: "HOW I APPROACH PROBLEMS",
        title: "What drives me",
      },
      journal: {
        eyebrow: "NOTES FROM THE BUILD",
        title: "Journal",
      },
      skills: {
        eyebrow: "THE STACK I REACH FOR",
        title: "Skills",
      },
      dsa: {
        eyebrow: "HOW I THINK ABOUT PROBLEMS",
        title: "DSA stats",
      },
      opensource: {
        eyebrow: "CODE IN THE OPEN",
        title: "Open Source",
      },
      impact: {
        eyebrow: "SYSTEMS I'VE BUILT",
        title: "The trade-offs behind the work.",
      },
    },
  },

  human: {
    label: "Human",
    copy: "A builder who enjoys learning in public and making complex things a little more useful for people.",
    sections: ["journal", "about", "impact", "skills"],
    sectionCopy: {
      journal: {
        eyebrow: "THINGS I'M LEARNING",
        title: "Journal",
      },
      about: {
        eyebrow: "BEYOND THE CODE",
        title: "What drives me",
      },
      impact: {
        eyebrow: "WHAT I'VE BEEN BUILDING",
        title: "Work that helps someone on the other side.",
      },
      skills: {
        eyebrow: "TOOLS I ENJOY",
        title: "Skills",
      },
    },
  },
};

// Every section the homepage knows about, for the customizer's toggle list.
export const ALL_SECTIONS = [
  { id: "impact", label: "Featured work" },
  { id: "journal", label: "Journal" },
  { id: "about", label: "About me" },
  { id: "skills", label: "Skills" },
  { id: "opensource", label: "Open source" },
  { id: "dsa", label: "DSA stats" },
];

export const getLens = (key) => LENSES[key] || LENSES[DEFAULT_LENS];

// Resolves a section's heading text for the active lens, falling back to the
// component's own default when the lens doesn't override it.
export const lensCopy = (lensKey, sectionId, fallback = {}) => {
  const override = getLens(lensKey).sectionCopy?.[sectionId] || {};
  return { ...fallback, ...override };
};
