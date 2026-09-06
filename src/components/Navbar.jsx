import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowUpRightFromSquare, FaBars, FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { navLinks, downloadCvLink } from "../constants";
import { logo } from "../assets";
import { usePreferences } from "../hooks/usePreferences";

const SWIPE_THRESHOLD = 45;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [prefs] = usePreferences();
  const location = useLocation();
  const navigate = useNavigate();
  const touchStartX = useRef(null);
  const isVertical = prefs.navOrientation === "vertical";

  const currentIndex = navLinks.findIndex((link) => link.id === location.pathname);
  const currentPage = currentIndex === -1 ? null : navLinks[currentIndex];

  const goToOffset = (offset) => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + offset + navLinks.length) % navLinks.length;
    navigate(navLinks[nextIndex].id);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    goToOffset(deltaX < 0 ? 1 : -1);
  };

  return (
    <>
      {/* Mobile/tablet nav (below lg): a top bar with swipe + hamburger menu.
          Renders regardless of the visitor's desktop nav-orientation choice
          — there is no vertical-rail equivalent at this size. */}
      <nav className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 lg:hidden" aria-label="Primary navigation">
        <div className="site-nav mx-auto max-w-7xl">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Durgesh Mehar home">
            <img src={logo} alt="Durgesh Mehar" className="h-9 w-9 object-contain" />
          </Link>
          {currentPage && (
            <div
              className="site-nav-swipe"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label={`Current page: ${currentPage.title}. Swipe to change page.`}
            >
              <button type="button" onClick={() => goToOffset(-1)} aria-label="Previous page" className="site-nav-swipe-arrow">
                <FaChevronLeft aria-hidden="true" />
              </button>
              <span aria-live="polite">{currentPage.title}</span>
              <button type="button" onClick={() => goToOffset(1)} aria-label="Next page" className="site-nav-swipe-arrow">
                <FaChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
          <a href={downloadCvLink} target="_blank" rel="noreferrer" className="site-nav-resume hidden sm:inline-flex">Resume <FaArrowUpRightFromSquare aria-hidden="true" /></a>
          <button type="button" className="site-nav-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
        {open && (
          <div className="site-nav-mobile mx-auto max-w-7xl">
            <div className="site-nav-mobile-grid">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.id;
                return (
                  <Link
                    key={link.id}
                    to={link.id}
                    onClick={() => setOpen(false)}
                    className={`site-nav-mobile-tile ${active ? "site-nav-mobile-tile-active" : ""}`}
                  >
                    {Icon && <Icon aria-hidden="true" />}
                    <span>{link.title}</span>
                  </Link>
                );
              })}
            </div>
            <a href={downloadCvLink} target="_blank" rel="noreferrer" className="site-nav-mobile-resume" onClick={() => setOpen(false)}>View resume <FaArrowUpRightFromSquare aria-hidden="true" /></a>
          </div>
        )}
      </nav>

      {/* Desktop nav (lg+): vertical icon rail or horizontal bar, per the
          visitor's "Navbar layout" choice in the customizer. */}
      {isVertical ? (
        <nav className="site-nav-vertical hidden lg:flex" aria-label="Primary navigation">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Durgesh Mehar home">
            <img src={logo} alt="Durgesh Mehar" className="h-9 w-9 object-contain" />
          </Link>
          <div className="site-nav-vertical-links">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.id;
              return (
                <Link
                  key={link.id}
                  to={link.id}
                  aria-label={link.title}
                  title={link.title}
                  className={`site-nav-link site-nav-link-icon ${active ? "site-nav-link-active" : ""}`}
                >
                  {Icon && <Icon aria-hidden="true" />}
                </Link>
              );
            })}
          </div>
          <a href={downloadCvLink} target="_blank" rel="noreferrer" className="site-nav-resume" aria-label="Resume">
            <FaArrowUpRightFromSquare aria-hidden="true" />
          </a>
        </nav>
      ) : (
        <nav className="fixed inset-x-0 top-0 z-50 hidden px-4 py-3 sm:px-6 lg:block" aria-label="Primary navigation">
          <div className="site-nav mx-auto max-w-7xl">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Durgesh Mehar home">
              <img src={logo} alt="Durgesh Mehar" className="h-9 w-9 object-contain" />
            </Link>
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.id} to={link.id} className={`site-nav-link ${location.pathname === link.id ? "site-nav-link-active" : ""}`}>{link.title}</Link>
              ))}
            </div>
            <a href={downloadCvLink} target="_blank" rel="noreferrer" className="site-nav-resume">Resume</a>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
