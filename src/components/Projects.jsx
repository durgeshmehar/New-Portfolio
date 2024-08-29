import { motion } from "framer-motion";
import { useState } from "react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn , textVariant } from "../utils/motion";
import { ProjectHoverEffect } from "./effects/project-hover-effect";

const navlist = ["All","Django", "NodeJS", "React"];

const Projects = () => {
  const [toggle, setToggle] = useState("Django");

  return (
    <>
      <div className="max-w-6xl md:mt-0 mx-auto md:px-8 text-center">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText} blue-pink-gradient-text` }>Projects</h2>
        </motion.div>

        <div className="border violet-gradient overflow-hidden mt-8 w-fit  mx-auto flex flex-nowrap justify-start items-start rounded-xl">
          {navlist.map((item, index) => (
            <div
              key={index}
              className={`h-14 p-4 cursor-pointer
               ${index == 3 ? "" : "border-r-2"} 
               ${toggle === item ? "bg-violet-900 font-bold": "hover:bg-black"} `}
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

        <div className="mt-2 md:mt-4 w-full gap-12  flex flex-wrap justify-center items-center ">
    
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

const WrappedAbout = SectionWrapper(Projects, "projects");

export default WrappedAbout;
