import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { github } from "../../assets";

export const ProjectHoverEffect = ({ projects, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3  gap-4 mt-6",
        className
      )}
    >
      {projects.map((project, idx) => {
        const { name, description, tags, image, source_code_link, live_link } =
          project;

        return (
          <div
            key={idx}
            className="relative h-full group block p-3 gap-2 w-full "
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

            <div className="rounded-lg w-full h-full p-3 overflow-hidden border border-transparent dark:border-white/[0.2]  violet-gradient  relative z-20 transition-all duration-700">
              <div className="py-1 z-50 relative space-y-2">
                <div className="">
                  <div className="hover:scale-110  relative w-full cursor-pointer transition-all duration-800"  onClick={() => window.open(live_link, "_blank")}>

                      <img
                        src={image}
                        alt="project_image"
                        className="transition-all duration-300 w-full h-[300px] object-cover rounded-lg cursor-pointer  "
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

                  <div className="mt-5 relative -top-[10px]">
                    <h3 className="text-white opacity-70 p-1 font-bold text-base mb-6 md:text-[24px]">{name}</h3>
                    <p className="mt-4 pt-4 text-secondary text-[14px] text-left">
                      {description}
                    </p>
                  </div>

                  <div className="-mt-[50px] flex flex-wrap gap-2">
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
