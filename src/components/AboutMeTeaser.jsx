import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../styles";
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
  <div className="max-w-5xl w-full mx-auto md:px-8 text-center flex flex-col items-center">
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>Beyond the code</p>
      <h2 className={`${styles.sectionHeadText} text-center blue-pink-gradient-text`}>
        What drives me
      </h2>
    </motion.div>

    <motion.p
      variants={fadeIn("up", "tween", 0.1, 0.6)}
      className="text-secondary text-[16px] md:text-[18px] leading-relaxed max-w-3xl mt-6"
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
            className="border border-white/10 hover:border-white/25 rounded-2xl backdrop-blur-[1rem] p-6 transition-colors"
          >
            <Illustration className="w-full h-20 mb-4" />
            <h3 className="text-white font-bold text-lg">{pillar.title}</h3>
          </motion.div>
        );
      })}
    </div>

    <Link
      to="/about"
      className="violet-gradient text-white py-2 px-8 rounded-full font-semibold mt-10"
    >
      Read more about me
    </Link>
  </div>
);

const WrappedAboutMeTeaser = SectionWrapper(AboutMeTeaser, "about-me");

export default WrappedAboutMeTeaser;
