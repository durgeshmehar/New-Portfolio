// require("dotenv").config();
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
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
      className={`w-full xl:mt-12 flex xl:flex-row flex-col-reverse gap:4 md:gap-6 overflow-hidden mb-[15vh]`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0, 0.8)}
        className="mx-auto w-[80vw] lg:w-[30vw] flex-[0.75] border border-white/20 hover:border-white/40 p-8 pb-6 rounded-2xl   backdrop-blur-[1rem]"
      > 
      
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
          Contact
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800 font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800 font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800 font-medium"
            />
          </label>
          <div className="flex items-center gap-6">
            <div className="w-full flex justify-center">
              <Button
                borderRadius="1.2rem"
                className=" font-bold text-[17px] md:text-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600"
              >
                <button
                  type="submit"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </Button>
            </div>

            
          </div>
        </form>
      </motion.div>
      {EarthCanvas && (
        <motion.div
          variants={slideIn("right", "tween", 0, 0.8)}
          className="mx-auto w-[80vw] lg:w-[30vw]  xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      )}
    </div>
  );
};

const WrappedAbout = SectionWrapper(Contact, "contact");

export default WrappedAbout;
