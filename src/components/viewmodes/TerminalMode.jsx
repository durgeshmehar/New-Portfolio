import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TERMINAL_SECTIONS, TERMINAL_ORDER } from "../../constants/terminalContent";

const ROUTES = {
  journal: "/blog",
  opensource: "/#opensource",
  dsa: "/#dsa",
  experience: "/experience",
  education: "/education",
  projects: "/projects",
  contact: "/contact",
};

const WELCOME = [
  "durgesh-mehar-portfolio v1.0.0 — terminal mode",
  "Type `help` to see available commands.",
  "",
];

const HELP_LINES = [
  "Available commands:",
  "  about | impact | skills | journal | opensource | dsa   show a section",
  "  ls                                                     list sections",
  "  open <section>                                         visit the real page",
  "  whoami                                                 quick intro",
  "  clear                                                  clear the screen",
  "  exit                                                   leave terminal mode",
];

const TerminalMode = ({ onExit }) => {
  const [history, setHistory] = useState(() => WELCOME.map((text) => ({ type: "out", text })));
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const print = (lines) => {
    setHistory((h) => [...h, ...lines.map((text) => ({ type: "out", text }))]);
  };

  const runCommand = (raw) => {
    const cmd = raw.trim();
    setHistory((h) => [...h, { type: "in", text: cmd }]);
    if (!cmd) return;

    const [word, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    if (word === "help") {
      print(HELP_LINES);
    } else if (word === "clear" || word === "cls") {
      setHistory([]);
    } else if (word === "whoami") {
      print(TERMINAL_SECTIONS.about.lines);
    } else if (word === "ls" || word === "sections") {
      print(["Sections:", ...TERMINAL_ORDER.map((id) => `  ${id}`)]);
    } else if (TERMINAL_SECTIONS[word] && rest.length === 0) {
      print([`$ cat ${word}`, ...TERMINAL_SECTIONS[word].lines]);
    } else if (word === "open") {
      const target = ROUTES[arg] ? arg : null;
      if (target) {
        print([`Opening ${target}...`]);
        window.setTimeout(() => navigate(ROUTES[target]), 400);
      } else {
        print([`open: unknown target "${arg}". Try: ${Object.keys(ROUTES).join(", ")}`]);
      }
    } else if (word === "exit" || word === "quit") {
      print(["Exiting terminal mode..."]);
      window.setTimeout(() => onExit(), 300);
    } else {
      print([`command not found: ${word} — type "help" for a list of commands.`]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setHistory((h) => [...h, { type: "in", text: "" }]);
      return;
    }
    setCmdLog((log) => [...log, input]);
    setCmdIndex(-1);
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdLog.length) return;
      const nextIndex = cmdIndex === -1 ? cmdLog.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIndex);
      setInput(cmdLog[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIndex = cmdIndex + 1;
      if (nextIndex >= cmdLog.length) {
        setCmdIndex(-1);
        setInput("");
      } else {
        setCmdIndex(nextIndex);
        setInput(cmdLog[nextIndex]);
      }
    }
  };

  return (
    <div className="terminal-mode" role="application" aria-label="Portfolio terminal mode">
      <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-titlebar">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
          <p>durgesh@portfolio: ~</p>
          <button type="button" className="terminal-exit" onClick={onExit} aria-label="Exit terminal mode">
            exit
          </button>
        </div>
        <div className="terminal-body">
          {history.map((line, i) =>
            line.type === "in" ? (
              <p key={i} className="terminal-line-in"><span className="terminal-prompt">visitor@site:~$</span> {line.text}</p>
            ) : (
              <p key={i} className="terminal-line-out">{line.text || " "}</p>
            )
          )}
          <form onSubmit={handleSubmit} className="terminal-input-row">
            <span className="terminal-prompt">visitor@site:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal command input"
              className="terminal-input"
            />
            <span className="terminal-cursor" aria-hidden="true" />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalMode;
