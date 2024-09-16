import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
"use client";
import { TextGenerateEffect } from "./effects/text-generate-effect"

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    className="w-full xs:w-[230px] md:w-[240px]"
    options={{
      max: 45,
      scale: 1,
      speed: 450,
    }}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full  p-[1px] rounded-[20px] shadow-card border border-gray-700 "
    >
      <div className="bg-tertiary violet-gradient min-h-[150px] rounded-[20px] py-3 px-6 md:min-h-[240px] flex justify-evenly items-center flex-col md:flex-row">
        <motion.img
          src={icon}
          alt={title}
          className="w-16 h-16 object-contain"
          animate={{
            rotate: [0, 360], // Rotate 360 degrees
          }}
          transition={{
            duration: 4, // Rotation duration
            repeat: Infinity, // Loop indefinitely
            ease: "linear", // Linear easing for smooth rotation
          }}
        />

        <h3 className="blue-pink-gradient-text text-base md:text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);


const words = `I am a passionate Software Engineer specializing in Web Development, AI
        and Devops. My core skills include C++, Python, and JavaScript, along
        with frameworks like Django and Node.js. I am also experienced in cloud
        technologies and deployments using Docker, Kubernetes, Jenkins, and AWS.`;


const About = () => {
  return (
    <div id="about" className="-mt-[50vh] xs:-mt-[33vh] md:-mt-[45vh] lg:-mt-[45vh]">
      <h2 className={`${styles.sectionHeadText} text-left blue-pink-gradient-text`}>Overview</h2>
      <p className="text-secondary text-[17px] md:text-[20px] max-w-3xl leading-[30px]">
      <TextGenerateEffect words={words} />
      </p>
      <motion.p variants={fadeIn("", "", 0.2, 0.5)}>
        <div className="mt-28 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </motion.p>
    </div>
  );
};
const WrappedAbout = SectionWrapper(About, "about1");

export default WrappedAbout;

{
  /* I{"'"}m a skilled software developer with experience in C++ and
        JavaScript, and expertise in frameworks like React, Nextjs, Node.js, and
        Express.js. I{"'"}m a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let{"'"}s work together to bring your ideas to life! */
}


// 
// import { TextGenerateEffect } from "../ui/text-generate-effect";

// const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
// `;

// export function TextGenerateEffectDemo() {
//   return <TextGenerateEffect words={words} />;
// }
