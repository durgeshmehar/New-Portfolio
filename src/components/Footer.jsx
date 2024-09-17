import { navLinks } from "../constants";
import { github, linkedin, gmail } from "../assets";
import {Link} from "react-router-dom";
import { SiLeetcode } from "react-icons/si";
import  { FaInstagram } from "react-icons/fa";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 px-[10vw] py-[2vw] overflow-hidden">
    {/* <footer className="bg-[#181F27] px-[10vw] pt-[4vw] pb-[2vw]"> */}
      <div className=" grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-44 ">
        <div className="p-4">
          <h2 className="text-[23px] lg:text-[26px] font-bold mb-6 mx-auto text-center">
            {" "}
            Links{" "}
          </h2>

          <div className="grid grid-cols-2 gap-4 lg:gap-7 text-base lg:text-lg text-gray-300">
            {navLinks.map((nav) => (
              <a key={nav.id} href={nav.id} className="cursor-pointer" >
                <span className="flex  items-center">
                  {" "}
                  <FaArrowRight className="h-4 w-6" /> <span>{nav.title} </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-[23px] lg:text-[26px] font-bold mb-6 mx-auto text-center">
            Let&apos;s Build Something!{" "}
          </h2>
          <p className="text-base lg:text-lg text-gray-300 tracking-wide text-justify">
            I Love to develop websites. I would love to design the best websites
            for you. I&apos;m just an email away to transform your ideas into
            reality.
          </p>
        </div>

        <div className="p-4">
          <h2 className="text-[23px] lg:text-[26px] font-bold mb-6 mx-auto text-center">
            {" "}
            Get in Touch Today{" "}
          </h2>

          <div className="p-2 flex flex-col gap-4 text-base lg:text-lg">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-xl lg:text-2xl" />
              <span className="text-gray-300"> Akurdi, Pune - 411044 </span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-xl lg:text-2xl" />
              <span className="text-gray-300"> +91 9359230721 </span>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope className="text-xl lg:text-2xl" />
              <span className="text-gray-300">
                {" "}
                durgeshmehar2002@gmail.com{" "}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope className="text-xl lg:text-2xl" />
              <span className="text-gray-300"> devdurgesh404@gmail.com </span>
            </div>


          </div>
        </div>
      </div>

      <div className="mx-auto text-center m-8 border-t border-white/20 pt-[3vh] md:pt-[2vw] w-full ">
        <div className="flex justify-center gap-2 md:gap-6 group  rounded-md ">
          <Link
            to="mailto:durgeshmehar2002@gmail.com"
            target="_blank"
            className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
          >
            <img src={gmail} className="h-7 w-7 md:h-9 md:w-9" />
          </Link>
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
          <Link
            to="https://leetcode.com/u/durgeshmehar/"
            target="_blank"
            className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
          >
            {" "}
            <SiLeetcode className="h-7 w-7 md:h-9 md:w-9" />{" "}
          </Link>
          <Link
            to="https://www.instagram.com/durgeshmehar77/"
            target="_blank"
            className="violet-gradient text-white py-1 px-3 md:py-2 md:px-4 rounded-lg md:rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-300 transform hover:scale-105"
          >
            {" "}
            <FaInstagram className="h-7 w-7 md:h-9 md:w-9" />{" "}
          </Link>
        </div>
      </div>

      <div className="text-base lg:text-lg text-gray-300 mx-auto text-center">
        Copyright &#169; 2024 | Designed and Developed by
        <span className="blue-pink-gradient-text">
          {" "}
          Durgesh Mehar{" "}
        </span>
      </div>

    </footer>
  );
};

export default Footer;
