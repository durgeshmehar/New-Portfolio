import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BackgroundAnimation } from "./components/effects/BackgroundAnimation";

import {
  About,
  Hero,
  Navbar,
  HomeHighlights,
  Footer,
} from "./components";

const Opensource = lazy(() => import("./components/Opensource"));
const Dsa = lazy(() => import("./components/Dsa"));
const Blogs = lazy(() => import("./components/Blogs"));
const AboutMeTeaser = lazy(() => import("./components/AboutMeTeaser"));

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ExternalBlogPost = lazy(() => import("./pages/ExternalBlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));

import AOS from "aos";
import "aos/dist/aos.css";

const PageLoader = () => (
  <div className="pt-[160px] pb-[20vh] text-center text-secondary">
    Loading...
  </div>
);

const Home = () => (
  <>
    <div className="relative flex flex-col items-center w-full overflow-hidden">
      <BackgroundAnimation
        top="top-64"
        right="-right-1/4"
        left="-left-1/4"
        animation="animate-spin-slow"
      />
      <Hero />
      <About />
    </div>

    <div className="relative flex flex-col items-center w-full overflow-hidden">
      <BackgroundAnimation
        top="top-[20vw]"
        right="-right-1/4"
        left="-left-1/4"
      />
      <Suspense fallback={null}>
        <AboutMeTeaser />
      </Suspense>
    </div>

    <div className="relative flex flex-col items-center w-full overflow-hidden">
      <BackgroundAnimation
        top="top-[20vw]"
        right="-right-1/4"
        left="-left-1/4"
      />
      <HomeHighlights />
    </div>

    <Suspense fallback={null}>
      <Opensource />
      <Dsa />
    </Suspense>

    <div className="relative flex flex-col items-center w-full overflow-hidden">
      <BackgroundAnimation
        top="top-[20vw]"
        right="-right-1/7"
        left="-left-1/7"
      />
      <Suspense fallback={null}>
        <Blogs />
      </Suspense>
    </div>
  </>
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary/70 ">
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
        <Analytics />
      </div>
    </BrowserRouter>
  );
}

export default App;
