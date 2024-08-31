import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { ProjectHoverEffect } from "./effects/project-hover-effect";

const navlist = ["All", "Django", "NodeJS", "React"];

const Projects = () => {
  const [toggle, setToggle] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = toggle === "All" 
    ? (isMobile ? projects.slice(0, -1) : projects) 
    : projects.filter(project => project.category === toggle);

  return (
    <>
      <div className="max-w-6xl md:mt-0 mx-auto md:px-8 text-center flex flex-col justify-center items-center">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
            Projects
          </h2>
        </motion.div>

        <div className="relative border violet-gradient overflow-hidden mt-8 w-fit  mx-auto flex flex-nowrap justify-start items-start rounded-xl">
          {navlist.map((item, index) => (
            <div
              key={index}
              className={`h-14 p-4 cursor-pointer hover:bg-black ${
                index === 3 ? "" : "border-r-2"
              } 
             ${toggle === item ? "bg-violet-900 font-bold" : "hover:bg-black"} `
            }
              onClick={() => {
                setToggle(item);
              }}
            >
              <p className="h-full text-base flex justify-center items-center">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="w-[90%] mt-2 md:mt-11 md:w-full gap-12  flex flex-wrap justify-center items-center ">
          {toggle === "All" ? (
            <ProjectHoverEffect projects={filteredProjects} />
          ) : (
            <ProjectHoverEffect projects={filteredProjects} />
          )}
        </div>
      </div>
    </>
  );
};

const WrappedAbout = SectionWrapper(Projects, "projects");

export default WrappedAbout;
