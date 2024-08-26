import { motion } from "framer-motion";
import { useState } from "react";
// import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
// import { github } from "../assets";
import { fadeIn , textVariant } from "../utils/motion";
import { ProjectHoverEffect } from "./project-hover-effect";

const navlist = ["All", "Fullstack", "React"];

const Works = () => {
  const [toggle, setToggle] = useState("Fullstack");

  return (
    <>
      <div className="max-w-6xl md:mt-0 mx-auto md:px-8 text-center">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        </motion.div>

        <div className="overflow-hidden mt-10 w-fit  mx-auto flex flex-nowrap justify-start items-start border-2 rounded-xl">
          {navlist.map((item, index) => (
            <div
              key={index}
              className={`h-14 p-4 cursor-pointer
               ${index == 2 ? "" : "border-r-4"} ${
                toggle === item
                  ? "bg-tertiary font-bold"
                  : "hover:bg-tertiary/100"
              } `}
              onClick={() => {
                setToggle(item);
              }}
              name={item.name}
            >
              <p
                className={`h-full text-base cursor-pointer flex justify-center items-center`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2 md:mt-4 w-full gap-7  flex flex-wrap justify-center items-center ">
          

          {toggle === "All" ? (
            <ProjectHoverEffect projects={projects} />
          ) : (
            <ProjectHoverEffect
              projects={projects.filter(
                (project) => project.category === toggle
              )}
            />
          )}
        </div>
      </div>
    </>
  );
};

const WrappedAbout = SectionWrapper(Works, "projects");

export default WrappedAbout;
