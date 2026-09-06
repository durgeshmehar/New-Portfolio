import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { skills } from "../constants";
import { useLensCopy } from "../hooks/useLensCopy";
import StackBuilder from "./StackBuilder";

const HomeHighlights = () => {
  const { eyebrow, title } = useLensCopy("skills", {
    eyebrow: "TOOLS I REACH FOR",
    title: "Skills",
  });

  return (
    <section className="portfolio-section max-w-7xl w-full mx-auto text-center">
      <motion.div variants={textVariant()}>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-4">{title}</h2>
      </motion.div>
      <StackBuilder items={skills} />
    </section>
  );
};

const WrappedHighlights = SectionWrapper(HomeHighlights, "highlights");

export default WrappedHighlights;
