import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { unlockAchievement } from "../hooks/useAchievements";

const MIN_TO_COMPLETE = 3;

const StackBuilder = ({ items }) => {
  const [selected, setSelected] = useState(() => new Set());
  const total = items.length;
  const goal = Math.min(MIN_TO_COMPLETE, total);

  const toggle = (name) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      if (next.size >= goal) unlockAchievement("stack-builder");
      return next;
    });
  };

  const percent = useMemo(() => Math.min(100, Math.round((selected.size / goal) * 100)), [selected, goal]);
  const complete = selected.size >= goal;

  return (
    <div className="stack-builder">
      <div className="stack-builder-status" aria-live="polite">
        <p>{complete ? "Stack assembled." : `Tap ${goal} tools you'd want on your team.`}</p>
        <div className="stack-builder-meter" aria-label={`${selected.size} of ${goal} selected`}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <p className="stack-builder-count">{Math.min(selected.size, goal)} / {goal}</p>
      </div>

      <div className="mx-auto mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 md:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = selected.has(item.name);
          return (
            <button
              type="button"
              key={item.name}
              onClick={() => toggle(item.name)}
              aria-pressed={active}
              className={`stack-tile ${active ? "stack-tile-active" : ""}`}
            >
              {active && <span className="stack-tile-check"><FaCheck aria-hidden="true" /></span>}
              <Icon className="mx-auto h-6 w-6 md:h-8 md:w-8" />
              <p>{item.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StackBuilder;
