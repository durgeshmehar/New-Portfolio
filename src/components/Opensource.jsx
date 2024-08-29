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
      
      <img src="https://ghchart.rshah.org/durgeshmehar" className="w-full mt-8 lg:mt-16" alt="Github chart" />
      <p className="mt-6 !text-[18px] font-semibold"> 276 contributions in 2024 </p>


    </div>
  );
};

const WrappedAbout = SectionWrapper(Opensource, "");

export default WrappedAbout;
