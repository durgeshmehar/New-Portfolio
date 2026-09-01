import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";
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
    <div className="max-w-6xl mt-6 mx-auto md:px-8 text-center flex flex-col justify-center items-center">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
          Projects
        </h2>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center mt-8">
        {navlist.map((item) => (
          <button
            key={item}
            onClick={() => setToggle(item)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border ${
              toggle === item
                ? "bg-white/10 border-white/30 text-white"
                : "border-white/10 text-secondary hover:text-white hover:border-white/20"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="w-[90%] mt-2 md:mt-11 md:w-full gap-12 flex flex-wrap justify-center items-center">
        <ProjectHoverEffect projects={filteredProjects} />
      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Projects, "projects");

export default WrappedAbout;
