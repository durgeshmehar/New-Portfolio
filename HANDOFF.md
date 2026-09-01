# Portfolio handoff

## Project

React + Vite + Tailwind portfolio for **Durgesh Mehar**, a backend engineer in Bangalore. The site is intentionally moving away from the original generic 3D/gradient template toward a calm, editorial dark interface with cyan accents, clear evidence, and small purposeful interactions.

## Current design direction

- Dark navy background, soft cyan signal color, restrained purple only in the hero portrait.
- Large editorial headlines, thin divider lines, low-noise panels.
- Prioritize real product impact over generic skill or technology claims.
- Keep animation subtle and respect `prefers-reduced-motion`.
- Use accessible native controls, visible labels, and keyboard-friendly interactions.

## Work narrative: exact preferred order

The homepage and experience framing should talk about Durgesh's professional work in this order:

1. **EkaScribe** — voice-to-prescription backend that turns consultations into structured prescriptions and FHIR-compliant clinical notes; used by 300+ doctors daily.
2. **Assessments** — a major internal assessment management/workflow platform. It supports internal management purposes, assessment filling, project-team creation, and AI creation. Django Admin tooling was built for assessment pre-processing and post-processing. This is not a minor project; preserve its prominence.
3. **Medical autosuggest/search** — Go-based search API spanning 84 Elasticsearch indices and 711 shards, with async ingestion and AWS SQS queues; supports custom medical data from 10+ partners in EMR autosuggest results.
4. **Stripe subscriptions** — end-to-end integration including webhook handlers, retries, and transaction lifecycle.

## Implemented in this task

- Replaced the old home hero with a narrative-first hero and a “choose your lens” interaction.
- Added `src/components/ImpactStory.jsx`, with the preferred work order above.
- Replaced the prior abstract “explorable story” chapters with a playable systems challenge (cache → safe fallback → reuse). This was later removed from the homepage and replaced by the Living Portrait interaction — see "Gamification pass" below.
- Removed the three previous homepage boxes:
  - “Make the core dependable”
  - “Find the right thing quickly”
  - “Keep the human in view”
- Redesigned these public surfaces to follow the new theme:
  - Navigation and footer
  - Home supporting sections
  - About
  - Experience
  - Education
  - Projects and project cards
  - Contact
- `/education` now renders **education only**. It no longer includes Skills, GitHub contribution activity, or DSA.
- Increased desktop navigation item font size.

## Important files

- `src/App.jsx` — home composition and routes.
- `src/components/Hero.jsx` — homepage hero.
- `src/components/ImpactStory.jsx` — featured professional work.
- `src/components/Experience.jsx` — redesigned experience page.
- `src/components/Education.jsx` and `src/pages/EducationPage.jsx` — isolated education route.
- `src/components/Projects.jsx` and `src/components/effects/project-hover-effect.jsx` — projects route/cards.
- `src/components/Contact.jsx` — contact page.
- `src/components/Navbar.jsx`, `src/components/Footer.jsx` — shared chrome.
- `src/index.css` — most of the new design system classes.
- `src/constants/index.js` — professional content; Assessments language was updated here too.

## Cleanup already performed

Removed unused legacy/3D-era code and dependencies:

- Packages removed: `aos`, `maath`, `react-tilt`, `react-vertical-timeline-component`.
- Deleted unused components/effects:
  - `src/components/About.jsx`
  - `src/components/ParticleBackground.jsx`
  - `src/components/effects/BackgroundAnimation.jsx`
  - `src/components/effects/Particles_Design.jsx`
  - `src/components/effects/moving-border.jsx`
  - `src/components/effects/text-generate-effect.jsx`
- Removed unused Three.js/role asset exports from `src/assets/index.js`.
- The production CSS bundle dropped from roughly 91 KB to 62 KB during this cleanup.

## Validation already run

These succeeded after the latest implementation:

```bash
npm run lint
npm run build
git diff --check
```

Browser checks completed:

- No fresh runtime errors on the homepage.
- `/education` contains no Skills section.
- Homepage featured work order is EkaScribe → Assessments → Medical autosuggest → Stripe subscriptions.

## Gamification pass (this task)

Added four feel-good/playable additions, all opt-in and skippable, respecting `prefers-reduced-motion` and the existing dark/cyan system. The user asked for all four to be added at once for review/trim feedback, then iterated on placement and format.

- `src/hooks/useAchievements.js` — tiny localStorage-backed achievement store (`ACHIEVEMENTS` list, `unlockAchievement(id)`, `useAchievements()` hook). No backend; per-browser only. Current 8 achievements: about/experience/projects/education/contact page visits, `living-portrait`, `rate-limiter`, `stack-builder`.
- `src/components/AchievementTracker.jsx` — floating bottom-right trophy widget (mounted once in `App.jsx`, outside `<Routes>`). Auto-unlocks page-visit achievements via `useLocation()`, shows a toast on new unlocks, and a panel listing all 8 achievements with hints.
- Hero easter egg: clicking the "Open to meaningful conversations" status dot 5× quickly (in `src/components/Hero.jsx`) shows a small random on-brand message (`hero-spark`). Purely decorative, no achievement tied to it.
- **Living portrait** (`src/hooks/useLivingPortrait.js`, wired into `src/components/Hero.jsx`) — replaced the original homepage systems-quiz game (`SystemsPlayground.jsx`, now deleted) per user request for something nobody else has, aimed at non-technical visitors too. The hero portrait panel subtly tilts toward the cursor (CSS 3D transform, disabled on touch/mobile widths and under `prefers-reduced-motion`), shows an ambient idle message ("Still here? Nice.") after ~25s of no interaction anywhere on the page, and the portrait's label line adapts to local time of day ("Good morning/evening/Building late in Bangalore"). First interaction with the portrait unlocks the `living-portrait` achievement ("Noticed you"). No instructions or win condition — it's meant to be discovered, not solved.
- `src/components/RateLimiterPlayground.jsx` — a second three-round playable challenge themed around rate limiting ("Tame the traffic"), same visual language/mechanics as the original systems quiz (multiple choice, three rounds). Lives at the bottom of the About page (`src/pages/AboutPage.jsx`), after the closing section — moved there from Experience per user feedback ("fits better on About"). Completing it unlocks the `rate-limiter` achievement.
- `src/components/StackBuilder.jsx` — replaces the static `HoverEffect` skills grid on the homepage (`HomeHighlights.jsx`) with a click-to-select "build your stack" interaction: progress meter, per-tile checkmarks, unlocks `stack-builder` achievement at 100%. The old `HoverEffect`/`Skills.jsx` combo is untouched and still used elsewhere (`Skills.jsx` isn't currently routed; only `HomeHighlights` swapped its usage of `HoverEffect` for `StackBuilder`).
- New CSS in `src/index.css`: `.achievement-*`, `.hero-status-trigger`/`.hero-spark`, `.hero-portrait-live`/`.hero-idle-greeting`, `.stack-*`, `.playground-*` (shared by the rate-limiter game) — all follow existing panel/pill conventions (cyan borders, dark translucent backgrounds).

Verified via a hand-rolled headless-Chrome CDP driver script (Playwright wasn't usable — repo's Node 18 vs. Playwright's Node 20+ requirement; the driver and a minimal WS client live under the session scratchpad, not committed). Confirmed: stack builder reaches 15/15 and unlocks its achievement; achievement panel correctly lists progress as features are completed; hero spark message fires after 5 clicks; rate limiter completes with no console errors on the About page (and is confirmed absent from Experience); the living-portrait tilt transform actually changes value with simulated cursor movement (verified via dispatched `Input.dispatchMouseEvent` + reading the computed `transform`), the idle/achievement fires on first interaction, the time-of-day label renders correctly, and the tilt transform computes to `none` at mobile widths.

Not yet done: no dedicated pass on very small/narrow desktop breakpoints beyond the ones already in `index.css`; if the living portrait's idle message or tilt intensity feels off in real use, both are easy single-constant tweaks in `src/hooks/useLivingPortrait.js` (`IDLE_DELAY_MS`, the `rx`/`ry` multipliers).

## Notes / useful next steps

- There is no local résumé or LinkedIn PDF in the repository. Existing professional facts came from the portfolio’s constants and existing CV link.
- Blog and Blog Admin still retain more of the legacy styling than the principal portfolio routes. If continuing the design cleanup, those are the next public-facing surfaces to update.
- `Dsa.jsx` still uses the MacBook scroll interaction. It is intentionally retained because it is active and functional, but it may be redesigned later if it feels too visually different from the new system.
- Do not reintroduce generic “service” cards or the old spinning/3D visuals unless there is a specific portfolio reason.
