import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import ParticleBackground from "./components/ParticleBackground";

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
      <div className="relative z-0  bg-primary">
        <Navbar />
          <div className="bg-hero-pattern bg-coover bg-no-repeat bg-center">
            <Hero />
            <About />
          </div>

        <Education />
        <Skills />
        <Opensource />
        <Dsa />
        <Projects />
        <Blogs />
        <Contact />
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
