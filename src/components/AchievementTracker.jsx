import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaTrophy, FaXmark } from "react-icons/fa6";
import { useAchievements, unlockAchievement } from "../hooks/useAchievements";

const ROUTE_ACHIEVEMENTS = {
  "/about": "about",
  "/experience": "experience",
  "/projects": "projects",
  "/education": "education",
  "/contact": "contact",
};

const AchievementTracker = () => {
  const { unlocked, total, achievements } = useAchievements();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const seenCount = useRef(unlocked.length);

  useEffect(() => {
    const id = ROUTE_ACHIEVEMENTS[location.pathname];
    if (id) unlockAchievement(id);
  }, [location.pathname]);

  useEffect(() => {
    if (unlocked.length > seenCount.current) {
      const newest = achievements.find((item) => item.id === unlocked[unlocked.length - 1]);
      if (newest) {
        setToast(newest);
        window.setTimeout(() => setToast(null), 3200);
      }
    }
    seenCount.current = unlocked.length;
  }, [unlocked, achievements]);

  return (
    <div className="achievement-widget">
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
                  <span className="achievement-dot" aria-hidden="true" />
                  <div>
                    <p>{item.label}</p>
                    {!done && <p className="achievement-hint">{item.hint}</p>}
                  </div>
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
