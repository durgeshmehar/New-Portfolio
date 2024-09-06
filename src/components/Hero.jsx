import { motion } from "framer-motion";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { profile, blob } from "../assets";
import { github, linkedin, gmail } from "../assets";
import { Link } from "react-router-dom";
import { Button } from "./effects/moving-border";

const Hero = () => {
  return (
    <section className={`w-full mx-auto pt-[100vh] overflow-visible`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex overflow-visible w-full">
          <div className="w-[60%] md:w-[50%] h-[50%]">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi 👋, I'm{" "}
              <span className="blue-pink-gradient-text">Durgesh</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I build efficient backends <br className="sm:block hidden" />
              and web applications
            </p>

            {/* Buttons Section */}
            <div className="mt-8 md:mt-14 flex flex-wrap gap-4">
              <Button
                borderRadius="1.05rem"
                className="text-white "
                duration={2000}
              >
                <a
                  href="https://drive.google.com/file/d/15E-_4cEhQnmU4g9LvlqmH8My-yYIoGBh/view?usp=drive_link" // Replace with your CV link
                  download
                  // className="bg-[#80aef7] hover:bg-[#92b9f8] flex justify-center content-center text-black py-2 px-6 rounded-lg text-md xs:text-lg  xs:font-semibold  transition duration-300 transform"
                  className="text-base md:text-lg text-white hover:text-white/80"
                >
                  Download CV
                </a>
              </Button>

              <div className="flex gap-2 md:gap-6 lg:ml-4 group  rounded-md ">
                <a
                  href="mailto:durgeshmehar2002@gmail.com"
                  target="_blank"
                  className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center  hover:bg-gray-700 transition duration-300 transform"
                >
                  <img src={gmail} className="h-7 w-7 md:h-9 md:w-9" />
                </a>
                
                <Link
                  to="https://github.com/durgeshmehar"
                  target="_blank"
                  className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform "
                >
                  {" "}
                  <img src={github} className="h-7 w-7 md:h-9 md:w-9" />{" "}
                </Link>
                <Link
                  to="https://www.linkedin.com/in/durgeshmehar/"
                  target="_blank"
                  className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform "
                >
                  {" "}
                  <img src={linkedin} className="h-7 w-7 md:h-9 md:w-9" />{" "}
                </Link>
              </div>


            </div>
          </div>

          <div className="w-[50%] relative ml-auto">
            <img
              src={blob}
              className="w-[100%] md:w-[70%] top-0 right-0 absolute  object-cover"
            />
            <img
              src={profile}
              alt="Profile"
              className="absolute mx-auto w-[90%] h-[23vh] xs:w-[100%] xs:h-[30vh] sm:h-[35vh] md:w-[70%] md:h-[40vh] lg:h-[42vh] top-0 right-0  object-contain rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
