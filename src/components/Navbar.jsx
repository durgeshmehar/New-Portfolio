import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowUpRightFromSquare, FaBars, FaXmark } from "react-icons/fa6";
import { navLinks, downloadCvLink } from "../constants";
import { logo } from "../assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6" aria-label="Primary navigation">
      <div className="site-nav mx-auto max-w-7xl">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Durgesh Mehar home">
          <img src={logo} alt="Durgesh Mehar" className="h-9 w-9 object-contain" />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.id} to={link.id} className={`site-nav-link ${location.pathname === link.id ? "site-nav-link-active" : ""}`}>{link.title}</Link>
          ))}
        </div>
        <a href={downloadCvLink} target="_blank" rel="noreferrer" className="site-nav-resume hidden sm:inline-flex">Resume <FaArrowUpRightFromSquare aria-hidden="true" /></a>
        <button type="button" className="site-nav-toggle lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>
      {open && (
        <div className="site-nav-mobile mx-auto max-w-7xl lg:hidden">
          {navLinks.map((link) => <Link key={link.id} to={link.id} onClick={() => setOpen(false)}>{link.title}</Link>)}
          <a href={downloadCvLink} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>View resume <FaArrowUpRightFromSquare aria-hidden="true" /></a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
