import { useState } from "react";
import { FaArrowRight, FaCheck, FaRotateRight, FaGaugeHigh } from "react-icons/fa6";
import { unlockAchievement } from "../hooks/useAchievements";

const rounds = [
  {
    prompt: "One client suddenly sends 500 requests a second. What protects everyone else?",
    choices: [
      { id: "limit", label: "Rate limit per client", detail: "A shared service stays fair when no single caller can starve the rest.", correct: true },
      { id: "scale", label: "Just add more servers", detail: "That raises the ceiling, but one noisy client can still crowd out everyone else.", correct: false },
    ],
  },
  {
    prompt: "A legitimate burst arrives just over the limit. How do you avoid punishing it too harshly?",
    choices: [
      { id: "bucket", label: "Allow short bursts with a token bucket", detail: "A small burst allowance absorbs real traffic spikes without opening the door to abuse.", correct: true },
      { id: "hardcut", label: "Reject anything past the exact limit", detail: "Technically correct, but it turns normal bursts into avoidable errors.", correct: false },
    ],
  },
  {
    prompt: "The limit is hit. What should the client see?",
    choices: [
      { id: "retry", label: "A 429 with a Retry-After hint", detail: "A clear signal lets well-behaved clients back off and try again smoothly.", correct: true },
      { id: "silent", label: "Silently drop the request", detail: "No feedback means the client keeps hammering a wall it can't see.", correct: false },
    ],
  },
];

const RateLimiterPlayground = () => {
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [complete, setComplete] = useState(false);
  const current = rounds[round];

  const choose = (choice) => {
    setAnswer(choice);
    if (choice.correct) {
      window.setTimeout(() => {
        if (round === rounds.length - 1) {
          setComplete(true);
          unlockAchievement("rate-limiter");
        } else { setRound((value) => value + 1); setAnswer(null); }
      }, 650);
    }
  };

  const restart = () => { setRound(0); setAnswer(null); setComplete(false); };

  return (
    <section className="portfolio-section playground-section">
      <span className="hash-span" id="rate-limiter">&nbsp;</span>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <p className="section-eyebrow">ANOTHER SMALL SYSTEMS CHALLENGE</p>
          <h2 className="section-title mt-4">Can you tame a traffic spike?</h2>
          <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">A short, fictional walk through rate limiting: protect the shared system, forgive real bursts, and tell the client what just happened.</p>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">Three small decisions, same idea as before—fast when possible, fair always.</p>
        </div>

        <div className="playground-shell" aria-live="polite">
          <div className="playground-topline"><span><FaGaugeHigh aria-hidden="true" /> TRAFFIC CONTROL</span><span>{complete ? "TRAFFIC STABLE" : `STEP ${round + 1} / ${rounds.length}`}</span></div>
          <div className="playground-progress" aria-label={`${complete ? 3 : round} of 3 decisions completed`}><span style={{ width: `${complete ? 100 : (round / rounds.length) * 100}%` }} /></div>

          {complete ? (
            <div className="playground-complete">
              <span className="playground-check"><FaCheck aria-hidden="true" /></span>
              <p className="section-eyebrow">TRAFFIC STABLE</p>
              <h3>Limit → allow bursts → explain.</h3>
              <p>You kept the system fair without turning normal usage into an error.</p>
              <button type="button" className="playground-reset" onClick={restart}><FaRotateRight aria-hidden="true" /> Play again</button>
            </div>
          ) : (
            <div className="playground-round">
              <p className="playground-round-label">DECISION {String(round + 1).padStart(2, "0")}</p>
              <h3>{current.prompt}</h3>
              <div className="playground-choices">
                {current.choices.map((choice) => {
                  const selected = answer?.id === choice.id;
                  return <button type="button" key={choice.id} className={`playground-choice ${selected ? (choice.correct ? "playground-choice-correct" : "playground-choice-retry") : ""}`} onClick={() => choose(choice)} disabled={answer?.correct}>
                    <span>{choice.label}</span><FaArrowRight aria-hidden="true" />
                  </button>;
                })}
              </div>
              {answer && <p className={`playground-feedback ${answer.correct ? "playground-feedback-good" : ""}`}>{answer.detail}{!answer.correct && " Try the other route."}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RateLimiterPlayground;
