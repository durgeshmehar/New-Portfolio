import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { BackgroundAnimation } from "./components/effects/BackgroundAnimation";

import {
  About,
  Contact,
  Education,
  Blogs,
  Hero,
  Navbar,
  Skills,
  Projects,
  Opensource,
  Dsa,
  Footer,
} from "./components";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary/70 ">
        <Navbar />

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

        <div className="w-full overflow-hidden">
          <Education />

          <div className="relative flex flex-col items-center w-full ">
            <BackgroundAnimation
              top="top-[10vw]"
              right="-right-1/4"
              left="-left-1/4"
            />
            <Skills />
          </div>
        </div>

        <Opensource />
        <Dsa />

        <div className="relative flex flex-col items-center w-full overflow-hidden">
          <BackgroundAnimation
            top="top-[20vw]"
            right="-right-1/4"
            left="-left-1/4"
          />
          <Projects />
        </div>

        <Blogs />
        <Contact />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
