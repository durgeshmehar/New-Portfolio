import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

import { styles } from "../styles";
import { navLinks, downloadCvLink } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`${styles.paddingX} w-full flex justify-center items-center py-2 fixed top-1 z-20`}
    >
      <div className={`absolute inset-0 max-w-7xl mx-auto rounded-md opacity-50 bg-gradient-to-r from-red-600 to-purple-700 z-1 filter blur-[12px]`}></div>

      {/* bg-[hsla(0,0%,250%,0.12)] */}
      <div className="border-[1px] border-white/20 hover:border-white/40 bg-[rgb(19,17,26)] backdrop-blur-[1rem] rounded-md p-2 lg:p-4  w-full flex justify-between items-center max-w-7xl mx-auto" >
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-6 xl:gap-8">
          {navLinks.map((nav) => {
            const active = isActive(nav.id);
            return (
              <li
                key={nav.id}
                className={`${
                  active
                    ? "font-bold text-[rgb(45,212,191)] hover:scale-105 transform transition-all duration-300 text-[17px] xl:text-[18px] cursor-pointer relative"
                    : "text-white/90"
                } hover:text-[rgb(45,212,191)] hover:scale-105 transform transition-all duration-300 text-[17px] xl:text-[18px] font-semibold cursor-pointer relative`}
              >
                <Link to={nav.id} className="relative group">
                  {nav.title}
                  {/* Hover underline effect */}
                  <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[rgb(45,212,191)] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={downloadCvLink}
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-white/30 hover:border-cyan-300 hover:text-cyan-300 text-white text-[15px] xl:text-[16px] font-semibold py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <FaDownload size={13} />
              Download CV
            </a>
          </li>
        </ul>

        {/* mobile screen */}

        <div className="sm:hidden flex flex-1 justify-end items-center z-50">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient backdrop-blur-[1rem] absolute top-16 right-0 mx-4 my-0 min-w-[140px] z-50 rounded-xl transition-all duration-300`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => {
                const active = isActive(nav.id);
                return (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active
                        ? "font-bold text-[rgb(45,212,191)]"
                        : "text-secondary"
                    } hover:text-[rgb(45,212,191)] transition-all duration-300 relative z-50`}
                    onClick={() => setToggle(false)}
                  >
                    <Link to={nav.id} className="relative group">
                      {nav.title}
                      <span className="absolute bottom-[-3px] left-0 h-[2px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <a
                  href={downloadCvLink}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setToggle(false)}
                  className="flex items-center justify-center gap-2 border border-white/30 text-white text-[15px] font-semibold py-2.5 px-4 rounded-full"
                >
                  <FaDownload size={13} />
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
