import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";
import {MacbookScroll} from "./effects/macbook-scroll";
import { leetcode } from "../assets";

const Dsa = () => {
  return (
    <div className="max-w-5xl mt-8  mb-[20vh] md:mb-[78vh]  mx-auto md:px-8">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Problem Solving
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          DSA <span className="blue-pink-gradient-text">Statastic </span>
        </h2>
      </motion.div>

      {/* <div className="w-[80%] h-[50vh] mx-auto"> */}
      <div className="-mt-[20vh] md:mt-[0]">

      <MacbookScroll src="https://leetcard.jacoblin.cool/durgeshmehar?ext=heatmap" showGradient={false} title="Total 700+ coding questions solved on various platform" page={leetcode} />
      </div>
{/* 
        <img
          src="https://leetcard.jacoblin.cool/durgeshmehar?ext=heatmap"
          alt="LeetCode Stats"
          className="w-full mt-8 lg:mt-16"
        /> */}
        {/* <p className="mt-6 !text-[18px] font-semibold">
          {" "}
          Total 700+ coding questions solved on various platform{" "}
        </p> */}
      {/* </div> */}
    </div>
  );
};

const WrappedAbout = SectionWrapper(Dsa, "");

export default WrappedAbout;
