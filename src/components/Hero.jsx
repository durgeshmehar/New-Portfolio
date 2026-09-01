import { useRef, useState } from "react";
import { FaArrowDown, FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { profileWebp } from "../assets";
import { downloadCvLink } from "../constants";
import { useLivingPortrait } from "../hooks/useLivingPortrait";
import { unlockAchievement } from "../hooks/useAchievements";

const SPARK_MESSAGES = [
  "Okay, you found the fun bit.",
  "Status: still curious.",
  "That's a stable click rate.",
  "Nice—no rate limit here.",
];

const timeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Building late in Bangalore";
  if (hour < 12) return "Good morning from Bangalore";
  if (hour < 17) return "Mid-shift in Bangalore";
  if (hour < 21) return "Good evening from Bangalore";
  return "Building late in Bangalore";
};

const lenses = {
  recruiter: {
    label: "Recruiter",
    copy: "A concise story of ownership, outcomes, and the problems I am ready to solve next.",
  },
  engineer: {
    label: "Engineer",
    copy: "The decisions behind the work: resilient systems, search at scale, and thoughtful trade-offs.",
  },
  human: {
    label: "Human",
    copy: "A builder who enjoys learning in public and making complex things a little more useful for people.",
  },
};

const Hero = () => {
  const [lens, setLens] = useState("recruiter");
  const [sparkCount, setSparkCount] = useState(0);
  const [spark, setSpark] = useState(null);
  const resetTimer = useRef(null);
  const { shellRef, tilt, idleGreeting } = useLivingPortrait(() => unlockAchievement("living-portrait"));

  const triggerSpark = () => {
    const next = sparkCount + 1;
    setSparkCount(next);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setSparkCount(0), 1400);

    if (next >= 5) {
      setSpark(SPARK_MESSAGES[Math.floor(Math.random() * SPARK_MESSAGES.length)]);
      setSparkCount(0);
      window.setTimeout(() => setSpark(null), 2600);
    }
  };

  return (
    <section className="hero-section relative isolate min-h-[100svh] overflow-hidden px-6 pb-16 pt-32 sm:px-12 lg:px-16 lg:pt-40">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <p className="hero-kicker">BACKEND ENGINEER · BANGALORE, INDIA</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
            Building the quiet systems that make <span className="hero-emphasis">people’s work</span> feel effortless.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            I&apos;m Durgesh Mehar. I turn difficult backend problems into reliable, fast experiences—from healthcare search to AI-assisted clinical workflows.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a className="hero-primary-action" href="#journey">
              Start the journey <FaArrowDown aria-hidden="true" />
            </a>
            <a className="hero-secondary-action" href={downloadCvLink} target="_blank" rel="noreferrer">
              View resume <FaArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="mt-11">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Choose your lens</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose how to explore this portfolio">
              {Object.entries(lenses).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={lens === key}
                  onClick={() => setLens(key)}
                  className={`lens-button ${lens === key ? "lens-button-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-3 min-h-12 max-w-xl text-sm leading-relaxed text-slate-400" aria-live="polite">
              {lenses[lens].copy}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:-mt-10 lg:max-w-none">
          <div
            ref={shellRef}
            className="hero-portrait-shell hero-portrait-live"
            style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
          >
            <div className="hero-portrait-label">{timeGreeting()}</div>
            <img src={profileWebp} alt="Durgesh Mehar" fetchpriority="high" className="hero-portrait" />
            <button
              type="button"
              className="hero-portrait-note hero-status-trigger"
              onClick={triggerSpark}
              aria-label="Status: open to meaningful conversations"
            >
              <span className="hero-status-dot" aria-hidden="true" />
              Open to meaningful conversations
            </button>
            {spark && (
              <div className="hero-spark" role="status">
                {spark}
              </div>
            )}
            {idleGreeting && !spark && (
              <div className="hero-idle-greeting" role="status">
                {idleGreeting}
              </div>
            )}
          </div>
          <div className="hero-socials" aria-label="Durgesh Mehar on social platforms">
            <a href="mailto:durgeshmehar2002@gmail.com" aria-label="Email Durgesh Mehar"><HiOutlineMail /></a>
            <a href="https://github.com/durgeshmehar-dev" target="_blank" rel="noreferrer" aria-label="Durgesh Mehar on GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/durgeshmehar/" target="_blank" rel="noreferrer" aria-label="Durgesh Mehar on LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-7xl items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
        <span className="h-px w-12 bg-cyan-300/60" />
        Scroll for the evidence
      </div>
    </section>
  );
};

export default Hero;
