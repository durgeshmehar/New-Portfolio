import { cn } from "../../utils/cn";
import { github, macbook } from "../../assets";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ProjectHoverEffect = ({ projects, className }) => {

  return (
    <div
      className={cn(
        "project-grid mx-auto grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {projects.map((project, idx) => {
        const { name, description, tags, image, source_code_link, live_link } =
          project;

        return (
          <div
            key={idx}
            className="group relative min-w-0"
          >
            <div className="project-card h-full overflow-hidden">
              <div className="h-full flex flex-col">

                <div
                  className={`w-full aspect-[16/10] relative ${live_link ? "cursor-pointer" : ""}`}
                  onClick={() => live_link && window.open(live_link, "_blank", "noopener,noreferrer")}
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

                <div className="relative flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-white font-semibold text-xl md:text-[22px] tracking-tight">
                      {name}
                    </h3>
                    <div className="flex items-center gap-3 shrink-0">
                      {live_link && (
                        <a
                          className="text-secondary hover:text-cyan-300 transition-colors"
                          href={live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live demo"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source code"
                      >
                        <img
                          src={github}
                          alt="source code"
                          className="w-6 h-6 object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </div>
                  </div>

                  <p className="mt-3 text-slate-400 text-[15px] md:text-[16px] leading-relaxed text-left">
                    {description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {tags.map((tag) => (
                      <span
                        key={`${name}-${tag.name}`}
                        className="project-tag"
                      >
                        <span className={tag.color}>{tag.name}</span>
                      </span>
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
