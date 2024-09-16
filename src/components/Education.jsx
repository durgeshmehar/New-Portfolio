import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React, { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { textVariant } from "../utils/motion";
import { educations } from "../constants";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import "aos/dist/aos.css";
import AOS from "aos";

const EducationCard = React.memo(({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgb(19,17,26)",
        color: "#FF0000",
      }}
      contentArrowStyle={{ borderRight: "15px solid  #232631" }}
      date={
        <span className="text-[18px] md:text-[20px] font-bold text-white">
          {education.score}
        </span>
      }
      iconStyle={{ background: education.iconBg }}
      icon={<education.icon className="relative top-0 left-0 scale-125 " />}
    >
      <div>
        <h3 className="text-[#2190FF] mb-5 text:base text-[20px] md:text-[24px] font-bold">
          {education.title}
        </h3>
        <p className="text-white !text-[18px] md:!text-[22px] font-extrabold">
          {education.place}
        </p>

        <div className="w-[100%] md:w-[70%] !text-[16px] text-secondary flex justify-between">
          <p className="!text-[16px] md:!text-[18px]">{education.location}</p>
          <p className="!text-[16px] md:!text-[18px]">{education.year}</p>
        </div>
      </div>
    </VerticalTimelineElement>
  );
});

EducationCard.displayName = "EducationCard";

const Education = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          The Foundation of Knowledge
        </p>
        <h2
          className={`${styles.sectionHeadText} text-center blue-pink-gradient-text`}
        >
          Education
        </h2>
      </motion.div>

      <div className="w-[100%] sm:w-[80%] mx-auto lg:w-[100%] mt-20 flex flex-col">
        <VerticalTimeline>
          {educations.map((education, index) => (
            <EducationCard key={`education-${index}`} education={education} />
          ))}
        </VerticalTimeline>
      </div>

      {showScrollTop && (
        <motion.div
          className="Scroll_Top aos-init aos-animate !bg-[#2190FF] z-50 fixed bottom-4 -right-8 p-7"
          data-aos="fade-up"
          initial={{ y: 0 }}
          animate={{ y: [-280, 0, 0] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        >
          <a className="nav-arrow" onClick={scrollToTop}>
            <FaAngleDoubleUp />
          </a>
        </motion.div>
      )}
    </>
  );
};
const WrappedAbout = SectionWrapper(Education, "education");
 
export default WrappedAbout;
