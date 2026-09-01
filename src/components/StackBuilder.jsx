import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { unlockAchievement } from "../hooks/useAchievements";

const StackBuilder = ({ items }) => {
  const [selected, setSelected] = useState(() => new Set());
  const total = items.length;

  const toggle = (name) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      if (next.size === total) unlockAchievement("stack-builder");
      return next;
    });
  };

  const percent = useMemo(() => Math.round((selected.size / total) * 100), [selected, total]);
  const complete = selected.size === total;

  return (
    <div className="stack-builder">
      <div className="stack-builder-status" aria-live="polite">
        <p>{complete ? "Full stack assembled." : "Tap the tools you'd want on your team."}</p>
        <div className="stack-builder-meter" aria-label={`${selected.size} of ${total} selected`}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <p className="stack-builder-count">{selected.size} / {total}</p>
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
