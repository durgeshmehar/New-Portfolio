import { useEffect, useRef, useState } from "react";

const IDLE_DELAY_MS = 25000;
const IDLE_MESSAGES = [
  "Still here? Nice.",
  "Take your time.",
  "No rush at all.",
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const useLivingPortrait = (onNotice) => {
  const shellRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [idleGreeting, setIdleGreeting] = useState(null);
  const idleTimer = useRef(null);
  const noticedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const armIdleTimer = () => {
      window.clearTimeout(idleTimer.current);
      setIdleGreeting(null);
      idleTimer.current = window.setTimeout(() => {
        setIdleGreeting(IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)]);
        if (!noticedRef.current) {
          noticedRef.current = true;
          onNotice?.();
        }
      }, IDLE_DELAY_MS);
    };

    const handlePointerMove = (event) => {
      armIdleTimer();
      const shell = shellRef.current;
      if (!shell) return;
      const rect = shell.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const within = px >= -0.4 && px <= 1.4 && py >= -0.4 && py <= 1.4;
      if (!within) return;
      const ry = (px - 0.5) * 10;
      const rx = (0.5 - py) * 8;
      setTilt({ rx, ry });

      if (!noticedRef.current && rect.left < event.clientX && event.clientX < rect.right && rect.top < event.clientY && event.clientY < rect.bottom) {
        noticedRef.current = true;
        onNotice?.();
      }
    };

    const handleActivity = () => armIdleTimer();

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity);
    armIdleTimer();

    return () => {
      window.clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { shellRef, tilt, idleGreeting };
};
