import { useEffect, useId, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

let mermaidPromise = null;
const loadMermaid = () => {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      return mermaid;
    });
  }
  return mermaidPromise;
};

const MermaidBlock = ({ code }) => {
  const id = useId().replace(/:/g, "mermaid");
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadMermaid()
      .then((mermaid) => mermaid.render(id, code))
      .then(({ svg }) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return (
      <pre className="bg-black/40 text-red-400 text-sm p-4 rounded-lg overflow-x-auto">
        Flowchart error: {error}
      </pre>
    );
  }

  return <div ref={containerRef} className="my-6 flex justify-center overflow-x-auto" />;
};

const PostContent = ({ content }) => (
  <div className="prose prose-invert prose-cyan max-w-none text-gray-200 leading-relaxed">
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          if (!inline && match && match[1] === "mermaid") {
            return <MermaidBlock code={String(children).trim()} />;
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content || ""}
    </ReactMarkdown>
  </div>
);

export default PostContent;
