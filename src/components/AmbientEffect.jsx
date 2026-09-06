import { useEffect, useRef } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const randomBetween = ([min, max]) => min + Math.random() * (max - min);

// Each mode returns { make(width, height), step(p, width, height) }.
// `make` spawns one particle at a random point (usually just off-screen);
// `step` advances it one frame and returns false once it should respawn.
const MODES = {
  snow: {
    count: 90,
    make: (w) => ({
      x: Math.random() * w,
      y: -10 - Math.random() * 40,
      r: 1.2 + Math.random() * 2.4,
      speedY: 0.35 + Math.random() * 0.7,
      drift: Math.random() * Math.PI * 2,
      sway: 0.4 + Math.random() * 0.6,
    }),
    step: (p, w, h) => {
      p.y += p.speedY;
      p.x += Math.sin(p.drift + p.y / 60) * p.sway * 0.05;
      p.drift += 0.01;
      return p.y < h + 10 && p.x > -10 && p.x < w + 10;
    },
    draw: (ctx, p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.fill();
    },
  },

  rain: {
    count: 110,
    make: (w) => ({
      x: Math.random() * w,
      y: -20 - Math.random() * 60,
      len: 10 + Math.random() * 14,
      speedY: 9 + Math.random() * 6,
    }),
    step: (p, w, h) => {
      p.y += p.speedY;
      return p.y - p.len < h + 20;
    },
    draw: (ctx, p) => {
      ctx.strokeStyle = "rgba(148, 197, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + p.len);
      ctx.stroke();
    },
  },

  bubbles: {
    count: 45,
    make: (w, h) => ({
      x: Math.random() * w,
      y: h + 10 + Math.random() * 60,
      r: 3 + Math.random() * 7,
      speedY: 0.5 + Math.random() * 1.1,
      drift: Math.random() * Math.PI * 2,
    }),
    step: (p, w) => {
      p.y -= p.speedY;
      p.x += Math.sin(p.drift + p.y / 40) * 0.5;
      return p.y + p.r > -20 && p.x > -20 && p.x < w + 20;
    },
    draw: (ctx, p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(103, 232, 249, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
    },
  },

  fireflies: {
    count: 28,
    make: (w, h) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2,
      r: 1.5 + Math.random() * 1.5,
    }),
    step: (p, w, h) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.phase += 0.03;
      if (p.x < 0 || p.x > w) p.speedX *= -1;
      if (p.y < 0 || p.y > h) p.speedY *= -1;
      return true;
    },
    draw: (ctx, p) => {
      const glow = (Math.sin(p.phase) + 1) / 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 224, 71, ${0.15 + glow * 0.45})`;
      ctx.fill();
    },
  },

  drift: {
    count: 55,
    make: (w, h) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      r: 0.8 + Math.random() * 1.6,
    }),
    step: (p, w, h) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      return true;
    },
    // fillStyle is resolved at draw time in the component (canvas fill
    // styles are parsed by the canvas API, not CSS — var() doesn't work
    // here), reading the live --accent-rgb custom property.
    draw: (ctx, p, accentRgb) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRgb}, 0.25)`;
      ctx.fill();
    },
  },

  // Points drift slowly; any two within range get a faint connecting line,
  // so the field reads as a shifting constellation rather than loose dots.
  // Needs every particle's position at once, so it draws via `drawAll`
  // instead of the usual per-particle `draw`.
  constellation: {
    count: 70,
    linkDistance: 130,
    // Every so often the link distance widens for a few seconds, so bigger
    // connected clusters ("chains") briefly sweep through the field instead
    // of the usual small, sparse links — then it settles back down.
    burstLinkDistance: 210,
    burstEvery: [9000, 16000],
    burstDuration: [2200, 3600],
    make: (w, h) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speedX: (Math.random() - 0.5) * 0.26,
      speedY: (Math.random() - 0.5) * 0.26,
      r: 1 + Math.random() * 1.2,
    }),
    step: (p, w, h) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      return true;
    },
    draw: (ctx, p, accentRgb) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRgb}, 0.6)`;
      ctx.fill();
    },
    drawAll: (ctx, particles, w, h, accentRgb, state) => {
      const mode = MODES.constellation;
      const now = performance.now();
      if (state.nextBurstAt === undefined) state.nextBurstAt = now + randomBetween(mode.burstEvery);

      if (!state.burstUntil && now >= state.nextBurstAt) {
        state.burstUntil = now + randomBetween(mode.burstDuration);
      } else if (state.burstUntil && now >= state.burstUntil) {
        state.burstUntil = 0;
        state.nextBurstAt = now + randomBetween(mode.burstEvery);
      }
      const maxDist = state.burstUntil ? mode.burstLinkDistance : mode.linkDistance;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${accentRgb}, ${0.18 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    },
  },
};

const AmbientEffect = ({ effect }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!effect || effect === "none" || prefersReducedMotion()) return undefined;
    const mode = MODES[effect];
    if (!mode) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = Array.from({ length: mode.count }, () => mode.make(width, height));
    const drawState = {};

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const accentRgb =
      getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() ||
      "103, 232, 249";

    let frame;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        const alive = mode.step(p, width, height);
        if (!alive) particles[i] = mode.make(width, height);
      });
      if (mode.drawAll) mode.drawAll(ctx, particles, width, height, accentRgb, drawState);
      particles.forEach((p) => mode.draw(ctx, p, accentRgb));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [effect]);

  if (!effect || effect === "none" || prefersReducedMotion()) return null;

  return <canvas ref={canvasRef} className="ambient-effect-canvas" aria-hidden="true" />;
};

export default AmbientEffect;
