import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { educations } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#291a4a",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "8px solid  #232631" }}
      date={ <span className="text-[18px] md:text-[20px] font-bold text-white">
        {education.score}
      </span>} 
      iconStyle={{ background: education.iconBg }}
      icon={
          < education.icon className="relative top-0 left-0 scale-125 "/>
      }
    >
      <div className="violet-gradient">
        <h3 className='text-[#2190FF] mb-5 text:base text-[20px] md:text-[24px] font-bold'>{education.title}</h3>
        <p className='text-white !text-[18px] md:!text-[22px] font-extrabold'>{education.place}</p>

        <div className="w-[100%] md:w-[70%] !text-[16px] text-secondary flex justify-between">
          <p className="!text-[16px] md:!text-[18px]">{education.location}</p>
          <p className="!text-[16px] md:!text-[18px]">{education.year}</p>
        </div>

      </div>

    </VerticalTimelineElement>
  );
};

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
        The Foundation of Knowledge
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Education
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {educations.map((education, index) => (
            <EducationCard
              key={`education-${index}`}
              education={education}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};
const WrappedAbout = SectionWrapper(Education, "education");

export default WrappedAbout;