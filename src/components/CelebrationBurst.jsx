import { useEffect, useRef } from "react";

const COLORS = ["#67e8f9", "#a78bfa", "#f0abfc", "#5eead4", "#fde68a", "#fca5a5"];
const PARTICLE_COUNT = 260;
const GRAVITY = 0.13;
const DRAG = 0.99;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const makeParticle = (originX, originY) => {
  const shape = Math.random() < 0.5 ? "rect" : "circle";
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.15;
  const speed = 7 + Math.random() * 11;
  return {
    x: originX,
    y: originY,
    speedX: Math.cos(angle) * speed,
    speedY: Math.sin(angle) * speed,
    size: 6 + Math.random() * 7,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.35,
    shape,
  };
};

const CelebrationBurst = ({ active, onDone }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    if (prefersReducedMotion()) {
      const timer = window.setTimeout(() => onDone?.(), 2200);
      return () => window.clearTimeout(timer);
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const originX = width / 2;
    const originY = height * 0.38;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(originX, originY));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let frame;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      let allSettled = true;

      particles.forEach((p) => {
        if (p.y <= height + 30) {
          p.speedY += GRAVITY;
          p.speedX *= DRAG;
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.spin;
        }
        if (p.y <= height + 30) allSettled = false;

        if (p.y > height + 30) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (!allSettled) {
        frame = requestAnimationFrame(tick);
      } else {
        onDone?.();
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  if (prefersReducedMotion()) {
    return (
      <div className="celebration-static" role="status">
        <p>All 8 found.</p>
        <p>Thanks for exploring the whole thing.</p>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="celebration-canvas" aria-hidden="true" />;
};

export default CelebrationBurst;
