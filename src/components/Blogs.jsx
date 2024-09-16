"use client";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, slideIn } from "../utils/motion";
import { blogs } from "../constants";
import { cn } from "../utils/cn";
import { profile_blog } from "../assets";

function CardDemo({ title, description, bloglink, tags, image }) {
  return (
    <motion.div variants={slideIn("left", "tween", 0, 0.8)} className="">
      <div className="max-w-sm md:max-w-sm group/card text-left">
        <a href={bloglink} target="_blank">
          <div
            className={cn(
              " cursor-pointer overflow-hidden relative card h-96 md:h-[50vh] rounded-md shadow-3xl  max-w-xs md:max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 bg-cover"
            )}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
            <div className="flex flex-row items-center space-x-4 z-10">
              <img
                height="120"
                width="150"
                alt="Avatar"
                src={profile_blog}
                className="bg-blue-500 h-14 w-14 rounded-full  object-cover"
              />
              <div className="flex flex-col">
                <p className="font-normal text-lg text-gray-50 relative z-10">
                  Durgesh Mehar
                </p>
                <p className="text-md text-gray-400">2 min read</p>
              </div>
            </div>
            <div className="text content">
              <h1 className="font-extrabold text-xl md:text-2xl text-cyan-300 relative z-10">
                {title}
              </h1>
              <p className="font-normal text-base text-gray-300 relative z-10 my-4">
                {description}
              </p>
              <div className="px-0 text-center flex flex-wrap gap-2">
              {tags.map((tag) => (
                <p key={`${name}-${tag.name}`} className={`text-[16px]`}>
                  #
                  <span className={`text-[17px] ${tag.color}`}>
                    {tag.name}&nbsp;
                  </span>
                </p>
              ))}
            </div>
            </div>

            
          </div>
        </a>
      </div>
    </motion.div>
  );
}

const Blogs = () => {
  return (
    <div className="max-w-6xl md:mt-0 mx-auto md:px-8 text-center flex flex-col justify-center items-center">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>How I&apos;m share knowledge</p>
        <h2 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
          Blogs
        </h2>
      </motion.div>

      <div
        className={`mt-8 flex justify-center items-center flex-col md:flex-row pb-14 ${styles.paddingX} gap-14`}
      >
        {blogs.map((blog, index) => (
          <div
            key={blog.title}
            className={`w-full md:w-auto ${
              index % 2 === 0 ? "self-start" : "self-end"
            }`}
          >
            <CardDemo key={blog.title} index={index} {...blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Blogs, "blogs");

export default WrappedAbout;
