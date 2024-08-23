import { motion } from "framer-motion";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { profile, blob } from "../assets";

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

        <div className="flex overflow-visible relative">
          <div className="w-[50%] h-[50%] md:w-[40%] md:h-[50%] rounded-full z-40">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi 👋, I'm <span className="text-[#915EFF]">Durgesh</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I build efficient backends <br className="sm:block hidden" />
              and web applications
            </p>
          </div>

          <div
            className="my-auto ml-auto w-[100%] h-[80%] md:w-[40%] md:h-[20%] rounded-full overflow-visible relative"
            style={{
              backgroundImage: `url(${blob})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={profile}
              alt="Profile"
              className="mx-auto w-[75%] h-[50%]"
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
