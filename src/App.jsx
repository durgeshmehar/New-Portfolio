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
  Dsa,Footer
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0  bg-primary">
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
        <Contact />
      </div>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
