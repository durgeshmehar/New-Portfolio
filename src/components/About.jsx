import { Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className=' w-full xs:w-[230px]  md:w-[240px]'
  options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full  green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div  
        className='bg-tertiary min-h-[190px] rounded-[20px] py-4 px-8 md:min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-base md:text-[20px] font-bold text-center '>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I{"'"}m a skilled software developer with experience in C++ and
        JavaScript, and expertise in frameworks like React, Nextjs, Node.js, and
        Express.js. I{"'"}m a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let{"'"}s work together to bring your ideas to life!
      </motion.p>

      <div className='mt-20 grid grid-cols-2 lg:grid-cols-4 gap-10 place-items-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};
const WrappedAbout = SectionWrapper(About, "about");

export default WrappedAbout;