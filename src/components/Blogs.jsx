import { motion } from "framer-motion";
import { FiExternalLink } from 'react-icons/fi';

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { blogs } from "../constants";
import { Tilt } from "react-tilt";


const BlogCard = ({ index, title, description, bloglink, tags, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className=""
  >
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="md:bg-black-200 border border-transparent dark:border-white/[0.2] p-5 rounded-xl w-[280px]  md:w-[320px]"
    >
      <div className="relative mx-auto h-[170px] w-full md:h-[230px]">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full  rounded-xl"
          // className="w-full h-full object-cover  rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(bloglink, "_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <FiExternalLink className="text-white w-4 h-4" />
          </div>
        </div>
        
      </div>
      {/* <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div> */}

      <div className="mt-7">
        <h3 className="text-white font-bold text-base md:text-[24px]">{title}</h3>
        <p className="mt-5 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag,idx) => (
          <p key={idx} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

const Blogs = () => {
  return (
    <div className={`-mt-6 md:mt-12  -mb-[50px] md:mb-[0px] md:bg-black-100 rounded-[20px] flex justify-center items-center flex-col md:block`}>
      <div
        className={`md:bg-tertiary rounded-xl ${styles.padding} md:min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>How I&apos;m share knowledge</p>
          <h2 className={styles.sectionHeadText}>Blogs.</h2>
        </motion.div>
      </div>

      <div className={`flex justify-center items-center flex-col md:flex-row   md:-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 md:justify-start`}>
        {/*  */}
        {blogs.map((blog, index) => (
          <BlogCard key={blog.title} index={index} {...blog} />
        ))}
        {/*  */}
      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Blogs, "blogs");

export default WrappedAbout;
