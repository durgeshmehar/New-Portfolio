// Plain-text content shown by Terminal mode for each section id. Kept short
// and hand-written (not scraped from the JSX) since a terminal reads best as
// prose, not component markup.
export const TERMINAL_SECTIONS = {
  about: {
    label: "about",
    lines: [
      "Durgesh Mehar — backend engineer, Bangalore, India.",
      "I turn difficult backend problems into reliable, fast systems —",
      "from healthcare search to AI-assisted clinical workflows.",
      "Genuinely curious, learns in public, enjoys the trade-off conversations",
      "as much as the shipping.",
    ],
  },
  impact: {
    label: "impact",
    lines: [
      "EkaScribe — voice-to-prescription platform. Used by 300+ doctors daily.",
      "Assessments — internal workflow platform for management + AI creation.",
      "Medical autosuggest — Go search API, 84 indices, 711 ES shards,",
      "  10+ partner integrations.",
      "Stripe subscriptions — end-to-end payments, webhook-driven lifecycle.",
    ],
  },
  skills: {
    label: "skills",
    lines: [
      "Backend: Go, Python (Django), Node.js, PostgreSQL, Elasticsearch.",
      "Infra: AWS (SQS, EC2, S3), Docker, CI/CD.",
      "Also comfortable in: React, Tailwind, system design, API design.",
    ],
  },
  journal: {
    label: "journal",
    lines: [
      "Notes on what I'm building and learning, written as I go.",
      "Run `open journal` to read the full posts on the site.",
    ],
  },
  opensource: {
    label: "opensource",
    lines: [
      "Public repos and contributions — code in the open.",
      "Run `open opensource` to browse them on the site.",
    ],
  },
  dsa: {
    label: "dsa",
    lines: [
      "Problem-solving stats across LeetCode and friends.",
      "Run `open dsa` to see the live numbers on the site.",
    ],
  },
};

export const TERMINAL_ORDER = ["about", "impact", "skills", "journal", "opensource", "dsa"];
