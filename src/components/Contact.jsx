// require("dotenv").config();
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { github, linkedin, gmail } from "../assets";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Link } from "react-router-dom";
import { Button } from "./effects/moving-border";

const isLaptop = () => {
  return window.innerWidth > 1024;
};

const Contact = () => {
  const [isLaptopDevice, setIsLaptopDevice] = useState(isLaptop());

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopDevice(isLaptop());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [EarthCanvas, setEarthCanvas] = useState(null);
  useEffect(() => {
    if (isLaptopDevice) {
      import("./canvas").then((module) => {
        setEarthCanvas(() => module.EarthCanvas);
      });
    }
  }, [isLaptopDevice]);

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Durgesh Mehar",
          from_email: form.email,
          to_email: "durgeshmehar2002@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap:4 md:gap-6 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0, 0.8)}
        className="flex-[0.75] violet-gradient p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
          Contact
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800 font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800 font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800 font-medium"
            />
          </label>
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex justify-center">
              <Button borderRadius="1.2rem" className="text-white font-bold text-[16px] md:text-lg hover:text-white/80">
                <button
                  type="submit"
                  // className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary border border-violet-800 focus:ring-1 focus:ring-violet-800"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </Button>
            </div>

            <div className="flex justify-center gap-2 md:gap-6 group  rounded-md ">
              <a
                href="mailto:durgeshmehar2002@gmail.com"
                target="_blank"
                className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                <img src={gmail} className="h-7 w-7 md:h-9 md:w-9" />
              </a>
              <Link
                to="https://github.com/durgeshmehar"
                target="_blank"
                className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                {" "}
                <img src={github} className="h-7 w-7 md:h-9 md:w-9" />{" "}
              </Link>
              <Link
                to="https://www.linkedin.com/in/durgeshmehar/"
                target="_blank"
                className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                {" "}
                <img src={linkedin} className="h-7 w-7 md:h-9 md:w-9" />{" "}
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
      {EarthCanvas && (
        <motion.div
          variants={slideIn("right", "tween", 0, 0.8)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      )}
    </div>
  );
};

const WrappedAbout = SectionWrapper(Contact, "contact");

export default WrappedAbout;
