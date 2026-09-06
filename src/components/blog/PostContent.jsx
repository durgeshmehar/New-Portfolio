import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

// Every render attempt gets its own id. Mermaid keys its temporary DOM
// nodes off this id, so a unique one per attempt means concurrent or
// rapidly-repeated renders (React StrictMode double-invokes effects in
// dev, and the admin preview re-renders as you type) can never collide
// with or clean up each other's nodes.
let mermaidRunCounter = 0;
const nextRenderId = () => {
  mermaidRunCounter += 1;
  return `mermaid-r${mermaidRunCounter}-${Date.now().toString(36)}`;
};

// Mermaid's error-rendering path (unlike its success path) always looks
// for the render target inside document.body by id, regardless of what
// container was passed to render(). So the scratch container has to be a
// real, attached-but-invisible node — a fully detached element makes the
// error path throw instead of surfacing mermaid's actual message.
const makeScratchContainer = (id) => {
  const el = document.createElement("div");
  el.id = `scratch-${id}`;
  el.setAttribute("aria-hidden", "true");
  el.style.position = "fixed";
  el.style.top = "-9999px";
  el.style.left = "-9999px";
  el.style.visibility = "hidden";
  el.style.pointerEvents = "none";
  document.body.appendChild(el);
  return el;
};

// Removes this render's leftovers from document.body, so nothing ever
// leaks onto the page (which is what used to make stray diagrams/errors
// show up under unrelated routes like the homepage). Scoped to body's own
// children only — the rendered SVG we inject into the component shares
// mermaid's id, and must never be swept up by this.
const removeMermaidArtifacts = (id) => {
  const scratch = document.getElementById(`scratch-${id}`);
  // Anything mermaid built lives inside the scratch node, so dropping it
  // takes the temp svg/div with it.
  scratch?.remove();
  // Belt-and-braces for mermaid's no-container fallback path, which
  // appends straight onto body. Never touches the svg we injected into
  // the component, since that isn't a direct child of body.
  [id, `d${id}`, `i${id}`].forEach((nodeId) => {
    const node = document.getElementById(nodeId);
    if (node && node.parentElement === document.body) node.remove();
  });
};

const MermaidBlock = memo(({ code }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const id = nextRenderId();
    const scratch = makeScratchContainer(id);

    const settled = loadMermaid()
      .then((mermaid) => mermaid.render(id, code, scratch))
      .then(({ svg }) => {
        if (cancelled) return;
        if (containerRef.current) containerRef.current.innerHTML = svg;
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        removeMermaidArtifacts(id);
      });

    return () => {
      cancelled = true;
      // Wait for the in-flight render to settle before tearing down its
      // scratch node — removing it mid-render makes mermaid's internals
      // throw on a node it still expects to be there.
      settled.finally(() => removeMermaidArtifacts(id));
    };
  }, [code]);

  if (error) {
    return (
      <pre className="bg-black/40 text-red-400 text-sm p-4 rounded-lg overflow-x-auto">
        Flowchart error: {error}
      </pre>
    );
  }

  return <div ref={containerRef} className="my-6 flex justify-center overflow-x-auto" />;
});
MermaidBlock.displayName = "MermaidBlock";

// GitHub-flavoured markdown, for tables, strikethrough, task lists and
// autolinks — plain CommonMark supports none of these.
const remarkPlugins = [remarkGfm];

const markdownComponents = {
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
  // Tables need explicit borders to stay readable on the dark background,
  // and a scroll wrapper so wide ones don't blow out the layout.
  table({ children, ...props }) {
    return (
      <div className="my-6 overflow-x-auto">
        <table
          className="w-full border-collapse border border-white/15 text-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
  thead({ children, ...props }) {
    return (
      <thead className="bg-white/5" {...props}>
        {children}
      </thead>
    );
  },
  th({ children, ...props }) {
    return (
      <th
        className="border border-white/15 px-3 py-2 text-left font-semibold text-white"
        {...props}
      >
        {children}
      </th>
    );
  },
  td({ children, ...props }) {
    return (
      <td className="border border-white/15 px-3 py-2 align-top text-gray-200" {...props}>
        {children}
      </td>
    );
  },
};

const PostContent = memo(({ content }) => (
  <div className="prose prose-invert prose-cyan max-w-none text-gray-200 leading-relaxed">
    <ReactMarkdown remarkPlugins={remarkPlugins} components={markdownComponents}>
      {content || ""}
    </ReactMarkdown>
  </div>
));
PostContent.displayName = "PostContent";

export default PostContent;
