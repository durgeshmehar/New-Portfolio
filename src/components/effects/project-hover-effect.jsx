import { cn } from "../../utils/cn";
import { github, macbook } from "../../assets";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ProjectHoverEffect = ({ projects, className }) => {

  return (
    <div
      className={cn(
        "overflow-x-auto scrollbar-hide w-[95vw] mx-auto flex md:grid md:grid-cols-2 3xl:grid-cols-3 gap-8 lg:gap-y-24 lg:w-[100%] mt-6 pb-6",
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
            <div className="rounded-2xl border border-white/10 group-hover:border-white/25 w-[70vw] md:w-[25vw] h-full overflow-hidden bg-tertiary/40 relative z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.35)]">
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

                <div className="relative p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-white font-bold text-xl md:text-[22px] tracking-tight">
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

                  <p className="mt-3 text-secondary text-[15px] md:text-[16px] leading-relaxed text-left">
                    {description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={`${name}-${tag.name}`}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]"
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
