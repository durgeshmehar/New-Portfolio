import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import { aboutIntro, aboutPillars, aboutClosing } from "../constants";
import {
  ArchitectureIllustration,
  WhitepaperIllustration,
  FoundationIllustration,
} from "../components/effects/AboutIllustrations";

const illustrationMap = {
  architecture: ArchitectureIllustration,
  whitepaper: WhitepaperIllustration,
  foundation: FoundationIllustration,
};

const AboutPage = () => (
  <div className="pt-[140px] pb-[15vh] max-w-4xl mx-auto px-6">
    <motion.div
      variants={fadeIn("up", "tween", 0, 0.6)}
      initial="hidden"
      animate="show"
    >
      <p className={styles.sectionSubText}>Get to know me</p>
      <h1 className={`${styles.sectionHeadText} blue-pink-gradient-text !text-[36px] md:!text-[52px]`}>
        About Me
      </h1>

      <p className="text-secondary text-[17px] md:text-[19px] leading-relaxed mt-8">
        {aboutIntro}
      </p>

      <div className="mt-14 flex flex-col gap-10">
        {aboutPillars.map((pillar, index) => {
          const Illustration = illustrationMap[pillar.illustration];
          const reversed = index % 2 === 1;
          return (
            <motion.div
              key={pillar.title}
              variants={fadeIn(reversed ? "left" : "right", "tween", 0.1, 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col-reverse ${
                reversed ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 border border-white/10 rounded-2xl p-8 backdrop-blur-[1rem]`}
            >
              <div className="flex-1">
                <h3 className="text-white font-bold text-2xl mb-3">
                  {pillar.title}
                </h3>
                <p className="text-secondary text-[16px] md:text-[17px] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <Illustration className="w-40 h-32 md:w-48 md:h-36 shrink-0" />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 border border-white/10 rounded-2xl p-8 backdrop-blur-[1rem] text-center">
        <h3 className="text-white font-bold text-xl mb-4">
          Let&apos;s connect
        </h3>
        <p className="text-secondary text-[16px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
          {aboutClosing}
        </p>
        <Link
          to="/contact"
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 px-8 rounded-full font-semibold inline-block mt-6"
        >
          Get in touch
        </Link>
      </div>
    </motion.div>
  </div>
);

export default AboutPage;
