import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Button } from "./effects/moving-border";
import { socialLinks, contactInfo } from "../constants";

const infoItems = [
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: contactInfo.location,
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: FaClock,
    label: "Response time",
    value: contactInfo.responseTime,
  },
];

const Contact = () => {
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
      className={`w-full xl:mt-12 flex xl:flex-row flex-col gap-6 overflow-hidden mb-[15vh]`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0, 0.8)}
        className="mx-auto w-[80vw] lg:w-[30vw] flex-[0.75] border border-white/20 hover:border-white/40 p-8 pb-6 rounded-2xl backdrop-blur-[1rem]"
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
                <button type="submit">
                  {loading ? "Sending..." : "Send"}
                </button>
              </Button>
            </div>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0, 0.8)}
        className="mx-auto w-[80vw] lg:w-[30vw] xl:flex-1 flex flex-col justify-center gap-6"
      >
        <div className="border border-white/20 hover:border-white/40 rounded-2xl backdrop-blur-[1rem] p-8">
          <h4 className="text-white font-bold text-xl mb-6">
            Let&apos;s build something together
          </h4>
          <div className="flex flex-col gap-5">
            {infoItems.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="flex items-start gap-4">
                  <div className="violet-gradient rounded-full p-3 flex items-center justify-center shrink-0">
                    <Icon className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-secondary text-sm">{label}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-secondary text-sm mb-4">Find me on</p>
            <div className="flex gap-4">
              {socialLinks
                .filter((link) => link.label !== "Email")
                .map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    className="violet-gradient text-white p-3 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(Contact, "contact");

export default WrappedAbout;
