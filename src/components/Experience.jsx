import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import { textVariant } from "../utils/motion";
import { experiences } from "../constants";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

const ExperienceCard = React.memo(({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgb(19,17,26)",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "15px solid  #232631" }}
      date={
        <span className="text-[16px] md:text-[18px] font-bold text-white">
          {experience.date}
        </span>
      }
      iconStyle={{ background: experience.iconBg }}
      icon={<experience.icon className="relative top-0 left-0 scale-75" />}
    >
      <div>
        <h3 className="text-[#2190FF] mb-2 text:base text-[20px] md:text-[24px] font-bold">
          {experience.title}
        </h3>
        <p className="text-white !text-[18px] md:!text-[22px] font-extrabold">
          {experience.company_name}
        </p>
        <p className="!text-[16px] md:!text-[18px] text-secondary mb-4">
          {experience.location}
        </p>

        <ul className="list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 !text-[14px] md:!text-[16px] pl-1 tracking-wide"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
});

ExperienceCard.displayName = "ExperienceCard";

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I&apos;ve Been Building
        </p>
        <h2
          className={`${styles.sectionHeadText} text-center blue-pink-gradient-text`}
        >
          Experience
        </h2>
      </motion.div>

      <div className="w-[100%] sm:w-[80%] mx-auto lg:w-[100%] mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

const WrappedExperience = SectionWrapper(Experience, "experience");

export default WrappedExperience;
