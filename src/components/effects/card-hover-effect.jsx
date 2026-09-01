import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "mx-auto mt-8 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2",
        className
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="relative group block h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="content-panel h-full w-full p-5 relative z-10">
              <div className="md:py-4">
                <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
                <p className="pt-3 text-sm md:text-xl font-bold text-center text-gray-300">
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
