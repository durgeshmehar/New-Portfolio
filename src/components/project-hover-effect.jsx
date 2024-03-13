import { cn } from "../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { github } from "../assets";

export const ProjectHoverEffect = ({ projects, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {projects.map((project, idx) => {
        const { name, description, tags, image, source_code_link, live_link } =
          project;

        return (
          <div
            key={idx}
            className="relative group  block p-3 gap-2 h-full w-full "
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
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
            </AnimatePresence>

            <div className="rounded-md w-full p-4 overflow-hidden border border-transparent dark:border-white/[0.2]  bg-primary  relative z-20 transition-all duration-700">
              <div className="py-4 z-50 relative space-y-5">
                {/*  */}
                <div>
                  <div className="relative w-full h-[230px] cursor-pointer transition-all duration-500"  onClick={() => window.open(live_link, "_blank")}>

                      <img
                        src={image}
                       
                        alt="project_image"
                        className="w-full h-full object-cover rounded-2xl cursor-pointer"
                      />
                    

                    <div className=" absolute inset-0 flex justify-end m-3 card-img_hover">
                      <div
                        onClick={() => window.open(source_code_link, "_blank")}
                        className=" black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                      >
                        <img
                          src={github}
                          alt="source code"
                          className=" w-6 h-6 object-contain"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="mt-5">
                    <h3 className="text-white font-bold text-[24px]">{name}</h3>
                    <p className="mt-2 text-secondary text-[14px]">
                      {description}
                    </p>
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
