import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useMemo } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import {
  Hero,
  Navbar,
  HomeHighlights,
  Footer,
} from "./components";
import ImpactStory from "./components/ImpactStory";
import AchievementTracker from "./components/AchievementTracker";
import CustomizerPanel from "./components/CustomizerPanel";
import AmbientEffect from "./components/AmbientEffect";
import TerminalMode from "./components/viewmodes/TerminalMode";
import { useLens } from "./hooks/useLens";
import { usePreferences, applyTheme } from "./hooks/usePreferences";
import { getLens } from "./constants/lenses";

const Opensource = lazy(() => import("./components/Opensource"));
const Dsa = lazy(() => import("./components/Dsa"));
const Blogs = lazy(() => import("./components/Blogs"));
const AboutMeTeaser = lazy(() => import("./components/AboutMeTeaser"));

// Maps a lens's section id to the component that renders it.
const SECTION_COMPONENTS = {
  impact: () => <ImpactStory />,
  journal: () => <Suspense fallback={null}><Blogs /></Suspense>,
  about: () => <Suspense fallback={null}><AboutMeTeaser /></Suspense>,
  skills: () => <HomeHighlights />,
  opensource: () => <Suspense fallback={null}><Opensource /></Suspense>,
  dsa: () => <Suspense fallback={null}><Dsa /></Suspense>,
};

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ExternalBlogPost = lazy(() => import("./pages/ExternalBlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));


const PageLoader = () => (
  <div className="pt-[160px] pb-[20vh] text-center text-secondary">
    Loading...
  </div>
);

const VISUAL_MODE_CLASSES = {
  editorial: "view-editorial",
  bento: "view-bento",
  cinematic: "view-cinematic",
};

const Home = () => {
  const [lensKey] = useLens();
  const [prefs, setPrefs] = usePreferences();

  const sectionIds = useMemo(() => getLens(lensKey).sections, [lensKey]);

  const exitViewMode = () => setPrefs((p) => ({ ...p, viewMode: "normal" }));

  if (prefs.viewMode === "terminal") {
    return <TerminalMode onExit={exitViewMode} />;
  }

  // Editorial/Bento/Cinematic are pure CSS redesigns of the same section
  // content — a wrapper class reflows spacing, type, and (for Bento) a
  // grid-area layout per section, rather than duplicating each section's
  // content into three parallel component trees.
  const visualModeClass = VISUAL_MODE_CLASSES[prefs.viewMode] || "";

  return (
    <div className={visualModeClass || undefined}>
      <Hero />
      {/* Each section keeps its own identity across a lens switch (keyed by
          section id, not the lens), so switching lenses smoothly reshuffles
          existing sections into their new order instead of unmounting and
          replaying every section's own scroll-in animation at once. */}
      {sectionIds.map((id) => {
        const Section = SECTION_COMPONENTS[id];
        if (!Section) return null;
        return (
          <motion.div
            key={id}
            data-view-section={id}
            layout="position"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Section />
          </motion.div>
        );
      })}
    </div>
  );
};

const AppShell = () => {
  const [prefs] = usePreferences();
  const location = useLocation();

  // Terminal mode is a full-screen takeover of the homepage — the regular
  // chrome (nav, footer, achievement widget) would fight with it visually.
  const isTerminalTakeover = location.pathname === "/" && prefs.viewMode === "terminal";

  // A scoping hook only — the vertical rail doesn't occupy any horizontal
  // band at the top like the horizontal bar does, so pages no longer need
  // the top padding that exists purely to clear that bar. This class does
  // NOT shift layout (see the vertical-nav floating-overlay fix); it only
  // lets index.css reduce top padding on lg+ when the rail is active.
  const isVerticalNav = !isTerminalTakeover && prefs.navOrientation === "vertical";

  return (
    <div className={`relative z-0 bg-primary/70 ${isVerticalNav ? "has-vertical-nav" : ""}`}>
      {!isTerminalTakeover && <AmbientEffect effect={prefs.effect} />}
      {!isTerminalTakeover && <Navbar />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/admin" element={<BlogAdmin />} />
          <Route path="/blog/external/:key" element={<ExternalBlogPost />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Suspense>

      {!isTerminalTakeover && <Footer />}
      {!isTerminalTakeover && <AchievementTracker />}
      <CustomizerPanel />
      <Analytics />
    </div>
  );
};

function App() {
  const [prefs] = usePreferences();

  useEffect(() => {
    applyTheme(prefs);
  }, [prefs]);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
