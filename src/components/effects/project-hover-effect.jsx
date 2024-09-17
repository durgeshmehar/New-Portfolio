import { cn } from "../../utils/cn";
import { github, macbook } from "../../assets";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ProjectHoverEffect = ({ projects, className }) => {

  return (
    <div
      className={cn(
        "overflow-x-scroll scrollbar w-[95vw] mx-auto flex md:grid md:grid-cols-2 3xl:grid-cols-3 lg:w-[100%] gap-6 lg:gap-y-28 mt-6 pb-6",
        className
      )}
    >
      {projects.map((project, idx) => {
        const { name, description, tags, image, source_code_link, live_link } =
          project;

        return (
          <div
            key={idx}
            className="group relative w-[70vw] md:w-[25vw]"
          >
            <div className="rounded-md border-[1px] border-white/20 hover:border-white/40 w-[70vw] md:w-[25vw] h-full overflow-hidden bg-transparent relative z-10 transition-all duration-200">
              <div className="h-full flex flex-col justify-between">

                <div
                  className="w-full aspect-[16/10] relative cursor-pointer"
                  onClick={() => window.open(live_link, "_blank")}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={macbook}
                      alt="MacBook frame"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                    <div className="absolute inset-[3.3%] top-[3%] w-[78%] h-[70%] mt-2 xs:mt-5 md:mt-6 mx-auto overflow-hidden rounded-t-[4%]">
    
                      <img
                        src={image}
                        alt={`${name} project`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative p-4 bg-[rgb(30,25,47)] group-hover:bg-[rgb(43,38,58)] ">
                  <div className="md:pb-3">
                    <div className="md:mt-4 flex gap-4 gap-x-8 justify-center items-center">
                      <h3 className="text-white opacity-90 p-1 font-bold text-lg md:text-[24px]">
                        {name}
                      </h3>
                      <a
                        className="text-blue-600 animate-moveRight"
                        href={live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt className="w-5 h-5 mr-3" />
                      </a>
                      <a
                        href={source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={github}
                          alt="source code"
                          className="w-8 h-8 object-contain cursor-pointer animate-moveLeft"
                        />
                      </a>
                    </div>
                    <p className="mt-0 pt-4 text-secondary text-[16px] md:text-[18px] text-left">
                      {description}
                    </p>
                  </div>

                  <div className="md:mt-14 lg:mt-0 px-0 md:mx-auto md:text-center md:justify-center flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <p key={`${name}-${tag.name}`} className={`text-[16px]`}>
                        #
                        <span className={`text-[16px] ${tag.color}`}>
                          {tag.name}&nbsp;
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
