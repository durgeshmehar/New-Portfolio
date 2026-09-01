import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { aboutIntro, aboutPillars } from "../constants";
import {
  ArchitectureIllustration,
  WhitepaperIllustration,
  FoundationIllustration,
} from "./effects/AboutIllustrations";

const illustrationMap = {
  architecture: ArchitectureIllustration,
  whitepaper: WhitepaperIllustration,
  foundation: FoundationIllustration,
};

const AboutMeTeaser = () => (
  <section className="portfolio-section mx-auto max-w-7xl text-center">
    <motion.div variants={textVariant()}>
      <p className="section-eyebrow">BEYOND THE CODE</p>
      <h2 className="section-title mt-4">What drives me</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("up", "tween", 0.1, 0.6)}
      className="text-slate-400 text-[16px] md:text-[18px] leading-relaxed max-w-3xl mt-6 mx-auto"
    >
      {aboutIntro}
    </motion.p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      {aboutPillars.map((pillar, index) => {
        const Illustration = illustrationMap[pillar.illustration];
        return (
          <motion.div
            key={pillar.title}
            variants={fadeIn("up", "tween", 0.15 * index, 0.6)}
            className="content-panel p-6 transition-colors"
          >
            <Illustration className="w-full h-20 mb-4" />
            <h3 className="text-white font-bold text-lg">{pillar.title}</h3>
          </motion.div>
        );
      })}
    </div>

    <Link to="/about" className="text-link mt-10">Read more about me</Link>
  </section>
);

const WrappedAboutMeTeaser = SectionWrapper(AboutMeTeaser, "about-me");

export default WrappedAboutMeTeaser;
