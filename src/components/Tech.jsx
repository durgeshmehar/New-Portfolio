import { HoverEffect } from "./card-hover-effect";
import { SectionWrapper } from "../hoc";
import { skills } from "../constants";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";

const Tech = () => {
  return (
    <div className="max-w-5xl -mb-[50px] md:mb-[0px] mx-auto md:px-8">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I Know
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          SKILLS.
        </h2>
      </motion.div>
      <HoverEffect items={skills} />
    </div>
  );
};

const WrappedAbout = SectionWrapper(Tech, "");

export default WrappedAbout;
