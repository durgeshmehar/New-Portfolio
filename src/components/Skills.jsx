import { HoverEffect } from "./effects/card-hover-effect";
import { SectionWrapper } from "../hoc";
import { skills } from "../constants";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";

const Skills = () => {
  return (
      <div className="max-w-6xl w-full mt-6 mx-auto md:px-8 text-center flex flex-col justify-center items-center -mb-[50px] md:mb-[0px]">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>What I Know</p>
          <h2
            className={`${styles.sectionHeadText} text-center blue-pink-gradient-text`}
          >
            SKILLS
          </h2>
        </motion.div>
        <HoverEffect items={skills} />
      </div>
  );
};

const WrappedAbout = SectionWrapper(Skills, "");

export default WrappedAbout;
