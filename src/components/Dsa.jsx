import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";
import {MacbookScroll} from "./effects/macbook-scroll";
import { leetcode } from "../assets";

const Dsa = () => {
  return (
    <div className="max-w-5xl mx-auto md:px-8 relative">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Problem Solving
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          DSA <span className="blue-pink-gradient-text">Statastic </span>
        </h2>
      </motion.div>

      {/* MacbookScroll positions its content via scroll-linked transforms
          (translateY up to 910px), not normal document flow — so the
          space it needs before the next section is roughly a FIXED pixel
          amount, not a percentage of viewport height. A vh-based height
          gives short screens (e.g. 1366x768, 1280x720 laptops) far less
          absolute scroll room than tall screens at the same ratio, which
          is what caused the animation to still be settling when Blogs
          started. Fixed px height avoids that class of bug entirely.

          The component itself is scaled down below md (scale-[0.35] under
          sm, scale-50 from sm to md) — the rendered card is physically
          smaller on screen at those widths, so it needs proportionally
          less scroll track too. Without scaling the container height down
          to match, narrow screens get a huge dead scroll zone where the
          (already-settled, tiny) card just sits there.

          Below sm (scale-[0.35]), the scaled-down content still leaves a
          gap above itself inside the container — pulling the whole block
          up with a negative top margin closes that gap so the card sits
          right under the heading instead of floating with dead space
          above it. Only needed at that smallest scale; sm/md sit flush
          already. */}
      <div className="h-[950px] sm:h-[1150px] md:h-[1900px] -mt-[150px] sm:mt-0">
        <MacbookScroll
          src="https://leetcard.jacoblin.cool/durgeshmehar?ext=heatmap"
          showGradient={false}
          title="Total 700+ coding questions solved on various platform"
          page={leetcode}
        />
      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Dsa, "");

export default WrappedAbout;
