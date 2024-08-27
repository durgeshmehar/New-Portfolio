import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active link based on scroll position
      const sections = navLinks.map((nav) => document.getElementById(nav.id));
      const currentSection = sections.find(
        (section) =>
          section &&
          section.offsetTop <= scrollTop + window.innerHeight / 2 &&
          section.offsetTop + section.offsetHeight > scrollTop + window.innerHeight / 2
      );

      if (currentSection) {
        setActive(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-2 fixed top-0 z-20`}
    >
      <div className='bg-[hsla(0,0%,250%,0.12)] backdrop-blur-[1rem] rounded-md p-2 md:p-4  w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-10 h-10 object-contain' />
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "font-bold text-[rgb(45,212,191)] hover:scale-105 transform transition-all duration-300 text-[20px] cursor-pointer relative" : "text-white"
              } hover:text-[rgb(45,212,191)] hover:scale-105 transform transition-all duration-300 text-[20px] font-semibold cursor-pointer relative`}
              onClick={() => setActive(nav.id)}
            >
              <a href={`${nav.id}`} className="relative group">
                {nav.title}
                {/* Hover underline effect */}
                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[rgb(45,212,191)] group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* mobile screen */}

        <div className='sm:hidden flex flex-1 justify-end items-center z-50'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient backdrop-blur-[1rem] absolute top-16 right-0 mx-4 my-0 min-w-[140px] z-50 rounded-xl transition-all duration-300`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "font-bold text-[rgb(45,212,191)]" : "text-secondary"
                  } hover:text-[rgb(45,212,191)] transition-all duration-300 relative z-50`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                  }}
                >
                  <a href={`${nav.id}`} className="relative group">
                    {nav.title}
                    <span className="absolute bottom-[-3px] left-0 h-[2px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;