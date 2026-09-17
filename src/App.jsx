import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { MotionConfig } from "framer-motion";
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
import { usePreferences, applyTheme } from "./hooks/usePreferences";

const Opensource = lazy(() => import("./components/Opensource"));
const Dsa = lazy(() => import("./components/Dsa"));
const Blogs = lazy(() => import("./components/Blogs"));
const AboutMeTeaser = lazy(() => import("./components/AboutMeTeaser"));

// Fixed homepage section order — blog leads right after the hero, then the
// rest follow. No more per-visitor lens reordering.
const HOME_SECTIONS = [
  { id: "blog", Section: () => <Suspense fallback={null}><Blogs /></Suspense> },
  { id: "about", Section: () => <Suspense fallback={null}><AboutMeTeaser /></Suspense> },
  { id: "impact", Section: () => <ImpactStory /> },
  { id: "skills", Section: () => <HomeHighlights /> },
  { id: "dsa", Section: () => <Suspense fallback={null}><Dsa /></Suspense> },
  { id: "opensource", Section: () => <Suspense fallback={null}><Opensource /></Suspense> },
];

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

const Home = () => {
  const [prefs] = usePreferences();

  // Cinematic is a pure CSS redesign of the same section content — a
  // wrapper class reflows spacing and layout, not the content itself.
  const isCinematic = prefs.viewMode === "cinematic";

  return (
    <div className={isCinematic ? "view-cinematic" : undefined}>
      <Hero />
      {HOME_SECTIONS.map(({ id, Section }) => (
        <div key={id} data-view-section={id}>
          <Section />
        </div>
      ))}
    </div>
  );
};

const AppShell = () => {
  const [prefs] = usePreferences();

  // A scoping hook only — the vertical rail doesn't occupy any horizontal
  // band at the top like the horizontal bar does, so pages no longer need
  // the top padding that exists purely to clear that bar. This class does
  // NOT shift layout (see the vertical-nav floating-overlay fix); it only
  // lets index.css reduce top padding on lg+ when the rail is active.
  const isVerticalNav = prefs.navOrientation === "vertical";

  return (
    <div className={`relative z-0 bg-primary/70 ${isVerticalNav ? "has-vertical-nav" : ""}`}>
      <AmbientEffect effect={prefs.effect} />
      <Navbar />

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

      <Footer />
      <AchievementTracker />
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
