import { BrowserRouter } from "react-router-dom";

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
  Dsa
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0  bg-black">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <About />
        <Education />
        <Skills />
        <Opensource />
        <Dsa />
        <Projects />
        <Blogs />

        <div className="relative z-0">
          <Contact />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
