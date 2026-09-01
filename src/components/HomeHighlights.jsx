import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { skills } from "../constants";
import { HoverEffect } from "./effects/card-hover-effect";

const HomeHighlights = () => (
  <div className="max-w-6xl w-full mx-auto md:px-8 text-center flex flex-col items-center">
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>What I Know</p>
      <h2 className={`${styles.sectionHeadText} text-center blue-pink-gradient-text`}>
        Skills
      </h2>
    </motion.div>
    <HoverEffect items={skills} className="!grid-cols-3 md:!grid-cols-5" />
  </div>
);

const WrappedHighlights = SectionWrapper(HomeHighlights, "highlights");

export default WrappedHighlights;
