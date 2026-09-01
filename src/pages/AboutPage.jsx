import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { aboutIntro, aboutPillars, aboutClosing } from "../constants";
import { ArchitectureIllustration, WhitepaperIllustration, FoundationIllustration } from "../components/effects/AboutIllustrations";
import RateLimiterPlayground from "../components/RateLimiterPlayground";

const illustrations = { architecture: ArchitectureIllustration, whitepaper: WhitepaperIllustration, foundation: FoundationIllustration };

const AboutPage = () => (
  <div className="pt-[100px] pb-[10vh]">
    <main className="site-page-section">
      <div className="page-intro max-w-3xl">
        <p className="section-eyebrow">ABOUT</p>
        <h1 className="page-title">The habit behind the systems.</h1>
        <p className="page-copy">{aboutIntro}</p>
      </div>
      <div className="about-principles mt-14">
        {aboutPillars.map((pillar, index) => {
          const Illustration = illustrations[pillar.illustration];
          return (
            <article className="about-principle" key={pillar.title}>
              <p className="about-principle-index">0{index + 1}</p>
              <Illustration className="h-24 w-32 shrink-0" />
              <div><h2>{pillar.title}</h2><p>{pillar.description}</p></div>
            </article>
          );
        })}
      </div>
      <div className="about-closing mt-14"><p>{aboutClosing}</p><Link to="/contact" className="text-link">Start a conversation <FaArrowRight aria-hidden="true" /></Link></div>
    </main>

    <RateLimiterPlayground />
  </div>
);

export default AboutPage;
