import { HoverEffect } from "./effects/card-hover-effect";
import { SectionWrapper } from "../hoc";
import { skills } from "../constants";
import { textVariant } from "../utils/motion";
import { motion } from "framer-motion";

const Skills = () => {
  return (
      <section className="site-page-section max-w-7xl w-full text-center">
        <motion.div variants={textVariant()}>
          <p className="section-eyebrow">TOOLS I REACH FOR</p>
          <h2 className="section-title mt-4">Skills</h2>
        </motion.div>
        <HoverEffect items={skills} />
      </section>
  );
};

const WrappedAbout = SectionWrapper(Skills, "");

export default WrappedAbout;
