import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";

const Opensource = () => {
  return (
    <div className="max-w-5xl -mb-[50px] md:mb-[0px] mx-auto md:px-8">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Opensource in 2024
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Github <span className="blue-pink-gradient-text">Contribution </span>
        </h2>
      </motion.div>

      <div className="w-full mt-11 lg:mt-16">
        <a href="https://github.com/durgeshmehar" target="_blank">
          <img
            src="https://ghchart.rshah.org/durgeshmehar"
            className="w-full h-full min-h-[15vh]"
            alt="Github chart"
          />
        </a>
        <p className="mt-9 !text-[18px] font-semibold text-center">
          276 contributions in 2024{" "}
        </p>
      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Opensource, "");

export default WrappedAbout;
