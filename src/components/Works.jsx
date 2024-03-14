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

{
  /*
const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <div>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[340px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </div>
  );
};
*/
}
const Works = () => {
  const [toggle, setToggle] = useState("Fullstack");

  return (
    <>
      <div className="max-w-6xl md:mt-0 mx-auto md:px-8 text-center">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        </motion.div>

        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[17px] leading-[30px]"
          >
            Following projects showcases my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos in it. It reflects my
            ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </motion.p>
        </div>

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
