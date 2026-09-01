import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaTrophy, FaXmark } from "react-icons/fa6";
import { useAchievements, unlockAchievement, lockAchievement } from "../hooks/useAchievements";
import CelebrationBurst from "./CelebrationBurst";

const ROUTE_ACHIEVEMENTS = {
  "/about": "about",
  "/experience": "experience",
};

const ACHIEVEMENT_TARGETS = {
  about: "/about",
  experience: "/experience",
  "rate-limiter": "/about#rate-limiter",
  "stack-builder": "/#highlights",
};

const AchievementTracker = () => {
  const { unlocked, total, achievements } = useAchievements();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [celebrating, setCelebrating] = useState(false);
  const seenCount = useRef(unlocked.length);

  useEffect(() => {
    const id = ROUTE_ACHIEVEMENTS[location.pathname];
    if (id) unlockAchievement(id);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.slice(1);

    const existing = document.getElementById(id);
    if (existing) {
      existing.scrollIntoView({ behavior: "smooth", block: "start" });
      return undefined;
    }

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.clearInterval(interval);
      } else if (attempts > 20) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [location.pathname, location.hash]);

  const goToAchievement = (id) => {
    const target = ACHIEVEMENT_TARGETS[id];
    if (!target) return;
    setOpen(false);
    const [path, hash] = target.split("#");
    if (path === location.pathname && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(target);
    }
  };

  const handleAchievementClick = (item, done) => {
    if (done) lockAchievement(item.id);
    else goToAchievement(item.id);
  };

  useEffect(() => {
    if (unlocked.length > seenCount.current) {
      const newest = achievements.find((item) => item.id === unlocked[unlocked.length - 1]);
      if (newest) {
        setToast(newest);
        window.setTimeout(() => setToast(null), 3200);
      }
      if (unlocked.length === total && seenCount.current < total) {
        setCelebrating(true);
      }
    }
    seenCount.current = unlocked.length;
  }, [unlocked, achievements, total]);

  return (
    <div className="achievement-widget">
      <CelebrationBurst active={celebrating} onDone={() => setCelebrating(false)} />

      {toast && (
        <div className="achievement-toast" role="status">
          <FaTrophy aria-hidden="true" />
          <div>
            <p>Unlocked</p>
            <p>{toast.label}</p>
          </div>
        </div>
      )}

      {open && (
        <div className="achievement-panel" role="dialog" aria-label="Exploration progress">
          <div className="achievement-panel-head">
            <p className="section-eyebrow">EXPLORATION</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <FaXmark aria-hidden="true" />
            </button>
          </div>
          <p className="achievement-panel-count">{unlocked.length} / {total} found</p>
          <ul>
            {achievements.map((item) => {
              const done = unlocked.includes(item.id);
              return (
                <li key={item.id} className={done ? "achievement-item-done" : ""}>
                  <button
                    type="button"
                    className="achievement-item-link"
                    onClick={() => handleAchievementClick(item, done)}
                    title={done ? "Click to unmark" : "Click to go there"}
                  >
                    <span className="achievement-dot" aria-hidden="true">
                      {done && <FaCheck aria-hidden="true" />}
                    </span>
                    <div>
                      <p>{item.label}</p>
                      <p className="achievement-hint">{done ? "Click to unmark" : item.hint}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        className="achievement-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={`Exploration progress: ${unlocked.length} of ${total}`}
      >
        <FaTrophy aria-hidden="true" />
        <span>{unlocked.length}/{total}</span>
      </button>
    </div>
  );
};

export default AchievementTracker;
