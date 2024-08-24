import { motion } from "framer-motion";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { profile, blob } from "../assets";
import { github, linkedin, gmail } from "../assets";
import { Link } from "react-router-dom";

const isLaptop = () => {
  // Assuming a device is a laptop if its width is greater than 1024px
  return window.innerWidth > 1024;
};

const Hero = () => {
  const [isLaptopDevice, setIsLaptopDevice] = useState(isLaptop());

  useEffect(() => {
    // Update the state when the window is resized
    const handleResize = () => {
      setIsLaptopDevice(isLaptop());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically import ComputersCanvas only if it's a laptop device
  const [ComputersCanvas, setComputersCanvas] = useState(null);
  useEffect(() => {
    if (isLaptopDevice) {
      import("./canvas").then((module) => {
        setComputersCanvas(() => module.ComputersCanvas);
      });
    }
  }, [isLaptopDevice]);

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
              Hi 👋, I'm <span className="text-[#915EFF]">Durgesh</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I build efficient backends <br className="sm:block hidden" />
              and web applications
            </p>

            {/* Buttons Section */}
            <div className="mt-8 md:mt-14 flex flex-wrap gap-4">
              <a
                href="https://drive.google.com/file/d/15E-_4cEhQnmU4g9LvlqmH8My-yYIoGBh/view?usp=drive_link" // Replace with your CV link
                download
                className="bg-[#915EFF] text-white py-2 px-6 rounded-lg text-md xs:text-lg  xs:font-medium hover:bg-[#7a4dd8] transition duration-300 transform hover:scale-105"
              >
                Download CV
              </a>

              <div className="flex gap-2 md:gap-6 lg:ml-4 group  rounded-md ">
                <a href="mailto:durgeshmehar2002@gmail.com" target="_blank" className="bg-gray-800 text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105">
                  <img src={gmail} className="h-7 w-7 md:h-9 md:w-9" />
                </a>
                <Link to="https://github.com/durgeshmehar" target="_blank" className="bg-gray-800 text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105">
                  {" "}
                  <img src={github} className="h-7 w-7 md:h-9 md:w-9" />{" "}
                </Link>
                <Link
                  to="https://www.linkedin.com/in/durgeshmehar/"
                  target="_blank"
                  className="bg-gray-800 text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
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
              className="absolute mx-auto w-[90%] h-[20vh] xs:w-[100%] xs:h-[30vh] sm:h-[35vh] md:w-[70%] md:h-[40vh] lg:h-[42vh] top-0 right-0  object-contain rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* {ComputersCanvas && (
        <>
          <ComputersCanvas />

          <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
            <a href="#about">
              <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                <motion.div
                  animate={{
                    y: [0, 24, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="w-3 h-3 rounded-full bg-secondary mb-1"
                />
              </div>
            </a>
          </div>
        </>
      )} */}
    </section>
  );
};

export default Hero;
