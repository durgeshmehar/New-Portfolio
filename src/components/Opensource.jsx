import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useLensCopy } from "../hooks/useLensCopy";

const Opensource = () => {
  const { eyebrow, title } = useLensCopy("opensource", {
    eyebrow: "OPEN SOURCE ACTIVITY",
    title: "GitHub contribution",
  });

  return (
    <section className="portfolio-section max-w-7xl mx-auto">
      <motion.div variants={textVariant()}>
        <p className="section-eyebrow text-center">{eyebrow}</p>
        <h2 className="section-title mt-4 text-center">{title}</h2>
      </motion.div>

      <div className="content-panel w-full mt-11 lg:mt-16 flex flex-col items-center p-5 sm:p-8">
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
    </section>
  );
};

const WrappedAbout = SectionWrapper(Opensource, "");

export default WrappedAbout;
