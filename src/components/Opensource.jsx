import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

const Opensource = () => {
  return (
    <div className="max-w-5xl mx-auto md:px-8 pb-16 md:pb-24">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Open Source Activity
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Github <span className="blue-pink-gradient-text">Contribution </span>
        </h2>
      </motion.div>

      <div className="w-full mt-11 lg:mt-16 flex flex-col items-center">
        <a
          href="https://github.com/durgeshmehar-dev"
          target="_blank"
          rel="noreferrer"
          className="w-full overflow-x-auto flex justify-center"
        >
          <GitHubCalendar
            username="durgeshmehar-dev"
            colorScheme="dark"
            fontSize={14}
            blockSize={12}
            blockMargin={4}
          />
        </a>
      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Opensource, "");

export default WrappedAbout;
