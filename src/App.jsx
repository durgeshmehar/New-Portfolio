import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Blogs,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">

        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <About />
        <Experience />
        <Tech />
        <Works />
        <Blogs />

        <div className="relative z-0">
          <Contact />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
