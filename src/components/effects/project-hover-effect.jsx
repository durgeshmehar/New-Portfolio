import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { github } from "../../assets";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ProjectHoverEffect = ({ projects, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3  gap-8 mt-6",
        className
      )}
    >
      {projects.map((project, idx) => {
        const { name, description, tags, image, source_code_link, live_link } =
          project;

        return (
          <div
            key={idx}
            className="relative h-full group block w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.9] block  rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence> */}

            <div className="rounded-lg w-full h-full  overflow-hidden border border-transparent dark:border-white/[0.2]  bg-primary hover:bg-slate-900 relative z-10 transition-all duration-200">
              <div className="py-1 z-10 relative space-y-2">
                <div className="">
                  <div
                    className="relative w-full cursor-pointer transition-all duration-200"
                    onClick={() => window.open(live_link, "_blank")}
                  >
                    <img
                      src={image}
                      alt="project_image"
                      className="transition-all duration-200 w-full h-[220px] md:h-[340px] object-cover rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-3 md:p-8 md:pb-3">
                    <div className="md:mt-4 flex gap-4 justify-center items-center">
                      <h3 className=" text-white opacity-70 p-1 font-bold text-lg md:text-[24px]">
                        {name}
                      </h3>
                      <a className="text-blue-600" href={live_link} target="_blank">
                        {" "}
                        <FaExternalLinkAlt />{" "}
                      </a>
                      <a href={source_code_link} target="_blank">
                        <img
                          src={github}
                          alt="source code"
                          className="w-6 h-6 object-contain cursor-pointer"
                        />
                      </a>
                    </div>
                    <p className="mt-0 pt-4 text-secondary text-[16px] md:text-[18px] text-left">
                      {description}
                    </p>
                  </div>

                  <div className="mb-6 px-3 md:px-8 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <p
                        key={`${name}-${tag.name}`}
                        className={`text-[16px]`}
                      >
                        #<span className={`text-[16px] ${tag.color}`}>{tag.name}&nbsp;</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/*  */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
