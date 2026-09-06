"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import CodeMirror, { EditorView, keymap } from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
  uploadBlogImage,
  slugify,
} from "../lib/blogService";
import { styles } from "../styles";
import PostContent from "../components/blog/PostContent";

const emptyForm = { title: "", excerpt: "", content: "", tags: "", coverImageUrl: "", slug: "" };
const DRAFT_KEY_PREFIX = "blog-admin-draft:";
const AUTOSAVE_DEBOUNCE_MS = 1000;

const LoginForm = ({ onSubmit, error, loading }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form.email, form.password);
      }}
      className="max-w-sm mx-auto mt-24 flex flex-col gap-4 bg-tertiary p-8 rounded-2xl border border-white/10"
    >
      <h2 className="text-xl font-bold text-white mb-2">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        className="bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
        required
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 rounded-lg font-semibold disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};


const CODE_LANGUAGES = ["js", "python", "bash", "json", "mermaid"];

// Shown in tooltips; the matching CodeMirror keymap is built from the same
// `key` values so the hints can never drift from the real bindings.
const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || "");
const modLabel = isMac ? "Cmd" : "Ctrl";
const shortcutHint = (key) =>
  key ? ` (${key.replace("Mod", modLabel).replace(/-/g, "+")})` : "";

const TOOLBAR_ACTIONS = [
  { label: "B", title: "Bold", key: "Mod-b", wrap: ["**", "**"] },
  { label: "I", title: "Italic", key: "Mod-i", wrap: ["_", "_"] },
  { label: "S", title: "Strikethrough", key: "Mod-Shift-x", wrap: ["~~", "~~"] },
  { label: "H", title: "Heading", key: "Mod-h", wrap: ["## ", ""], linePrefix: true },
  { label: "❝", title: "Blockquote", key: "Mod-Shift-9", wrap: ["> ", ""], linePrefix: true },
  { label: "•", title: "Bullet list", key: "Mod-Shift-8", wrap: ["- ", ""], linePrefix: true },
  { label: "1.", title: "Numbered list", key: "Mod-Shift-7", wrap: ["1. ", ""], linePrefix: true },
  { label: "―", title: "Horizontal rule", key: "Mod-Shift-h", wrap: ["\n---\n", ""] },
  { label: "</>", title: "Inline code", key: "Mod-e", wrap: ["`", "`"] },
  { label: "Link", title: "Link", key: "Mod-k", wrap: ["[", "](https://)"] },
  {
    label: "Table",
    title: "Insert table",
    key: "Mod-Shift-t",
    wrap: [
      "\n| Column A | Column B |\n| --- | --- |\n| Value | Value |\n",
      "",
    ],
  },
  {
    label: "Flowchart",
    title: "Insert flowchart (Mermaid)",
    key: "Mod-Shift-f",
    wrap: [
      "\n```mermaid\nflowchart TD\n  A[Start] --> B{Decision}\n  B -->|Yes| C[Do thing]\n  B -->|No| D[Do other thing]\n```\n",
      "",
    ],
  },
];

// Wraps the selection in `before`/`after`, or unwraps it if the markers are
// already there — so pressing the same shortcut twice undoes the first press.
// Handles both "the selection includes the markers" and "the markers sit just
// outside the selection", since either is a natural place for the caret to be
// after the first press.
const insertAroundSelection = (view, before, after = "") => {
  if (!view) return;
  const { state } = view;
  const { from, to } = state.selection.main;
  const selected = state.sliceDoc(from, to);

  // Case 1: markers are inside the current selection.
  if (
    before &&
    selected.startsWith(before) &&
    (!after || selected.endsWith(after)) &&
    selected.length >= before.length + after.length
  ) {
    const stripped = selected.slice(before.length, selected.length - after.length);
    view.dispatch({
      changes: { from, to, insert: stripped },
      selection: { anchor: from, head: from + stripped.length },
    });
    view.focus();
    return;
  }

  // Case 2: markers sit immediately outside the selection.
  const outerFrom = from - before.length;
  const outerTo = to + after.length;
  if (
    before &&
    outerFrom >= 0 &&
    outerTo <= state.doc.length &&
    state.sliceDoc(outerFrom, from) === before &&
    (!after || state.sliceDoc(to, outerTo) === after)
  ) {
    view.dispatch({
      changes: { from: outerFrom, to: outerTo, insert: selected },
      selection: { anchor: outerFrom, head: outerFrom + selected.length },
    });
    view.focus();
    return;
  }

  view.dispatch({
    changes: { from, to, insert: `${before}${selected}${after}` },
    selection: { anchor: from + before.length, head: from + before.length + selected.length },
  });
  view.focus();
};

const insertCodeFence = (view, language) => {
  if (!view) return;
  insertAroundSelection(view, `\n\`\`\`${language}\n`, "\n```\n");
};

const MarkdownToolbar = ({ viewRef, onImageInserted }) => {
  const imageInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleImageSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadBlogImage(file);
      insertAroundSelection(viewRef.current, `![${file.name}](${url})`, "");
      onImageInserted?.();
    } catch (err) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {TOOLBAR_ACTIONS.map((action) => (
        <button
          key={action.label}
          type="button"
          title={`${action.title}${shortcutHint(action.key)}`}
          aria-label={`${action.title}${shortcutHint(action.key)}`}
          onClick={() => insertAroundSelection(viewRef.current, ...action.wrap)}
          className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
        >
          {action.label}
        </button>
      ))}

      <div className="relative">
        <button
          type="button"
          title="Insert fenced code block — pick a language"
          onClick={() => setLangOpen((v) => !v)}
          className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
        >
          Code ▾
        </button>
        {langOpen && (
          <div className="absolute z-10 mt-1 bg-tertiary border border-white/20 rounded-md overflow-hidden">
            {CODE_LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                title={`Insert a ${lang} code block`}
                onClick={() => {
                  insertCodeFence(viewRef.current, lang);
                  setLangOpen(false);
                }}
                className="block w-full text-left text-xs px-3 py-1.5 hover:bg-white/10 whitespace-nowrap"
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        title="Upload an image and insert it at the cursor"
        disabled={uploadingImage}
        onClick={() => imageInputRef.current?.click()}
        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors disabled:opacity-60"
      >
        {uploadingImage ? "Uploading..." : "Image"}
      </button>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelected}
      />
    </div>
  );
};

const editorTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#050816",
      color: "#e2e8f0",
      height: "100%",
      fontSize: "0.875rem",
    },
    ".cm-content": { fontFamily: "ui-monospace, SFMono-Regular, monospace", padding: "1rem" },
    ".cm-gutters": { backgroundColor: "#050816", color: "#4b5563", border: "none" },
    ".cm-activeLine": { backgroundColor: "rgba(103, 232, 249, 0.06)" },
    ".cm-activeLineGutter": { backgroundColor: "rgba(103, 232, 249, 0.06)" },
    "&.cm-focused": { outline: "none" },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "rgba(103, 232, 249, 0.25) !important",
    },
    ".cm-cursor": { borderLeftColor: "#67e8f9" },
    ".cm-scroller": { overflow: "auto" },
  },
  { dark: true }
);

const editorExtensions = [markdown(), editorTheme, EditorView.lineWrapping];

const countWords = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

// Dragging the divider past these bounds collapses the pane on that side
// entirely, so the slider doubles as a show/hide control.
const COLLAPSE_EDITOR_BELOW = 12;
const COLLAPSE_PREVIEW_ABOVE = 88;
const MIN_PANE_PERCENT = 12;
const MAX_PANE_PERCENT = 88;

const MIN_EDITOR_HEIGHT = 320;
const MAX_EDITOR_HEIGHT = 1600;
const DEFAULT_EDITOR_HEIGHT = 640;
const LINE_NUMBERS_KEY = "blog-admin-line-numbers";

// Outer panel width as a percentage of the *viewport*, so it can be
// widened right out to the screen edges regardless of the page's own
// max-width wrapper.
const MIN_PANEL_WIDTH = 40;
const MAX_PANEL_WIDTH = 100;
const DEFAULT_PANEL_WIDTH = 82;

// Labels sit inline to the left of each field so it reads as
// "LABEL: value" rather than a stack of unlabelled boxes.
const FIELD_ROW = "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4";
const FIELD_LABEL =
  "w-full sm:w-40 shrink-0 text-xs font-semibold uppercase tracking-wider text-secondary";

const PostEditor = ({ initial, onSave, onCancel, saving }) => {
  const draftKey = `${DRAFT_KEY_PREFIX}${initial?.id || "new"}`;
  const [form, setForm] = useState(() => {
    const base = initial
      ? {
          title: initial.title,
          excerpt: initial.excerpt,
          content: initial.content,
          tags: (initial.tags || []).join(", "),
          coverImageUrl: initial.coverImageUrl || "",
          slug: initial.slug || slugify(initial.title || ""),
        }
      : emptyForm;
    return base;
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [uploadingCover, setUploadingCover] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(() => {
    try {
      return window.localStorage.getItem(LINE_NUMBERS_KEY) !== "off";
    } catch {
      return true;
    }
  });
  const [editorHeight, setEditorHeight] = useState(DEFAULT_EDITOR_HEIGHT);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const viewRef = useRef(null);
  const panelRef = useRef(null);
  const splitRef = useRef(null);
  const [editorPercent, setEditorPercent] = useState(68);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const draggingRef = useRef(false);
  const heightDraggingRef = useRef(null);
  const widthDraggingRef = useRef(null);
  const autosaveTimerRef = useRef(null);

  const discardDraft = () => {
    try {
      window.localStorage.removeItem(draftKey);
    } catch {
      // ignore
    }
  };

  const toggleLineNumbers = () => {
    setLineNumbers((on) => {
      const next = !on;
      try {
        window.localStorage.setItem(LINE_NUMBERS_KEY, next ? "on" : "off");
      } catch {
        // preference is best-effort
      }
      return next;
    });
  };

  // Debounced autosave to localStorage.
  useEffect(() => {
    window.clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey, JSON.stringify(form));
      } catch {
        // storage unavailable or full; autosave is best-effort
      }
    }, AUTOSAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(autosaveTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (heightDraggingRef.current !== null) {
        const delta = clientY - heightDraggingRef.current.startY;
        const next = heightDraggingRef.current.startHeight + delta;
        setEditorHeight(Math.min(MAX_EDITOR_HEIGHT, Math.max(MIN_EDITOR_HEIGHT, next)));
        return;
      }

      if (widthDraggingRef.current !== null) {
        const { startX, startWidth } = widthDraggingRef.current;
        // Handle sits on the right edge and the panel is centred, so the
        // panel grows by twice the pointer travel, measured against the
        // viewport width.
        const deltaPercent = ((clientX - startX) * 2 * 100) / window.innerWidth;
        const next = startWidth + deltaPercent;
        setPanelWidth(Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, next)));
        return;
      }

      if (!draggingRef.current || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const percent = ((clientX - rect.left) / rect.width) * 100;

      // Drag hard to one edge to collapse that pane entirely.
      if (percent < COLLAPSE_EDITOR_BELOW) {
        setShowEditor(false);
        setShowPreview(true);
        return;
      }
      if (percent > COLLAPSE_PREVIEW_ABOVE) {
        setShowPreview(false);
        setShowEditor(true);
        return;
      }
      setShowEditor(true);
      setShowPreview(true);
      setEditorPercent(Math.min(MAX_PANE_PERCENT, Math.max(MIN_PANE_PERCENT, percent)));
    };
    const stopDragging = () => {
      draggingRef.current = false;
      heightDraggingRef.current = null;
      widthDraggingRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  const startDragging = () => {
    draggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const startHeightDragging = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    heightDraggingRef.current = { startY: clientY, startHeight: editorHeight };
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  };

  const startWidthDragging = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    widthDraggingRef.current = { startX: clientX, startWidth: panelWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleCreateEditor = useCallback((view) => {
    viewRef.current = view;
  }, []);

  // Built from TOOLBAR_ACTIONS so every tooltip hint has a real binding
  // behind it (and vice versa).
  const shortcutKeymap = useMemo(
    () =>
      keymap.of(
        TOOLBAR_ACTIONS.filter((a) => a.key).map((action) => ({
          key: action.key,
          preventDefault: true,
          run: (view) => {
            insertAroundSelection(view, ...action.wrap);
            return true;
          },
        }))
      ),
    []
  );

  const extensions = useMemo(() => [...editorExtensions, shortcutKeymap], [shortcutKeymap]);

  const wordCount = useMemo(() => countWords(form.content), [form.content]);
  const readMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          content: form.content,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          coverImageUrl: form.coverImageUrl,
          slug: form.slug.trim() || slugify(form.title.trim()),
        });
        discardDraft();
      }}
      ref={panelRef}
      style={
        isDesktop
          ? {
              width: `${panelWidth}vw`,
              // Break out of the page's max-width wrapper so the panel can
              // be dragged right out to the screen edges.
              marginLeft: `calc(50% - ${panelWidth / 2}vw)`,
              marginRight: `calc(50% - ${panelWidth / 2}vw)`,
              maxWidth: "none",
            }
          : undefined
      }
      className="relative mx-auto flex flex-col gap-4 bg-tertiary p-6 rounded-2xl border border-white/10 mb-10"
    >
      <div
        onMouseDown={startWidthDragging}
        onTouchStart={startWidthDragging}
        title="Drag to change the panel width"
        className="hidden lg:flex absolute top-0 right-0 h-full w-3 items-center justify-center cursor-col-resize group"
      >
        <span className="h-16 w-1 rounded-full bg-white/10 group-hover:bg-cyan-400/60 transition-colors" />
      </div>

      <label className={FIELD_ROW}>
        <span className={FIELD_LABEL}>Title</span>
        <input
          type="text"
          placeholder="e.g. How I sped up an API from 30ms to 0.5ms"
          title="The post headline, shown on the Journal list and at the top of the post"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
          }}
          className="flex-1 min-w-0 bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
          required
        />
      </label>

      <label className={FIELD_ROW}>
        <span className={FIELD_LABEL}>Page URL</span>
        <span className="flex-1 min-w-0 flex items-center gap-2 text-sm text-secondary">
          <span className="shrink-0 font-mono text-xs">/blog/</span>
          <input
            type="text"
            placeholder="post-url-slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm((f) => ({ ...f, slug: e.target.value }));
            }}
            className="flex-1 min-w-0 bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800 font-mono text-xs"
            title="Auto-filled from the title. Changing this changes the post's public URL."
          />
        </span>
      </label>

      <label className={FIELD_ROW}>
        <span className={FIELD_LABEL}>Description</span>
        <input
          type="text"
          placeholder="One-line summary shown on the Journal list"
          title="Short summary shown under the title on the Journal list"
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          className="flex-1 min-w-0 bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
          required
        />
      </label>

      <label className={FIELD_ROW}>
        <span className={FIELD_LABEL}>Tag Summary</span>
        <input
          type="text"
          placeholder="Comma separated, e.g. Python, Backend, Redis"
          title="Comma-separated topics, shown as #tags on the post"
          value={form.tags}
          onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          className="flex-1 min-w-0 bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
        />
      </label>

      <div className={FIELD_ROW}>
        <span className={FIELD_LABEL}>Cover Photo</span>
        <div className="flex-1 min-w-0 flex items-center gap-4">
        {form.coverImageUrl ? (
          <img
            src={form.coverImageUrl}
            alt="Cover"
            className="w-24 h-24 object-cover rounded-lg border border-white/10"
          />
        ) : (
          <div className="w-24 h-24 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-secondary text-xs text-center px-2">
            No cover photo
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label
            title="Upload the banner image shown at the top of the post"
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors cursor-pointer inline-block w-fit"
          >
            {uploadingCover ? "Uploading..." : "Set cover photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingCover}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setUploadingCover(true);
                try {
                  const url = await uploadBlogImage(file);
                  setForm((f) => ({ ...f, coverImageUrl: url }));
                } catch (err) {
                  alert(`Cover upload failed: ${err.message}`);
                } finally {
                  setUploadingCover(false);
                }
              }}
            />
          </label>
          {form.coverImageUrl && (
            <button
              type="button"
              title="Remove the cover photo from this post"
              onClick={() => setForm((f) => ({ ...f, coverImageUrl: "" }))}
              className="text-xs text-red-400 hover:text-red-300 w-fit"
            >
              Remove cover photo
            </button>
          )}
        </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
          Content
        </span>
        <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
          <MarkdownToolbar
            viewRef={viewRef}
            onImageInserted={() => setForm((f) => ({ ...f, content: viewRef.current?.state.doc.toString() ?? f.content }))}
          />
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLineNumbers}
              title="Show or hide the line-number ruler"
              className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
            >
              {lineNumbers ? "Hide line numbers" : "Show line numbers"}
            </button>
            <button
              type="button"
              title={
                showPreview
                  ? "Hide the live preview and write full-width"
                  : "Show the live preview beside the editor"
              }
              onClick={() => {
                setShowEditor(true);
                setShowPreview((v) => !v);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
            >
              {showPreview ? "Hide preview" : "Show preview"}
            </button>
          </div>
        </div>

        <div
          ref={splitRef}
          style={isDesktop ? { height: `${editorHeight}px` } : undefined}
          className="flex flex-col lg:flex-row gap-4 lg:gap-0 h-auto"
        >
          {showEditor && (
            <div
              style={isDesktop && showPreview ? { width: `${editorPercent}%` } : undefined}
              className="w-full lg:pr-1 h-[50vh] lg:h-full flex flex-col min-w-0"
            >
              <div className="flex-1 rounded-lg border border-violet-800 overflow-hidden">
                <CodeMirror
                  value={form.content}
                  onChange={(value) => setForm((f) => ({ ...f, content: value }))}
                  onCreateEditor={handleCreateEditor}
                  extensions={extensions}
                  theme="none"
                  height="100%"
                  className="h-full"
                  basicSetup={{ lineNumbers, foldGutter: false, highlightActiveLine: true }}
                  placeholder="Write your post in Markdown... use the toolbar or Flowchart button for diagrams."
                />
              </div>
              <p className="text-xs text-secondary mt-2">
                {wordCount} words · ~{readMinutes} min read
              </p>
            </div>
          )}

          {showEditor && showPreview && (
            <div
              onMouseDown={startDragging}
              onTouchStart={startDragging}
              className="hidden lg:block w-1.5 shrink-0 rounded-full bg-white/10 hover:bg-cyan-400/60 cursor-col-resize transition-colors"
              title="Drag to resize — drag fully left or right to hide a pane"
            />
          )}

          {showPreview && (
            <div
              style={isDesktop && showEditor ? { width: `${100 - editorPercent}%` } : undefined}
              className="w-full lg:pl-1 h-[50vh] lg:h-full min-w-0"
            >
              <div className="bg-primary rounded-lg border border-white/10 p-4 h-full overflow-y-auto">
                <p className="text-xs uppercase tracking-wider text-secondary mb-3">
                  Live preview
                </p>
                {form.content ? (
                  <PostContent content={form.content} />
                ) : (
                  <p className="text-secondary text-sm">
                    Start writing to see a preview...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          onMouseDown={startHeightDragging}
          onTouchStart={startHeightDragging}
          className="hidden lg:flex items-center justify-center h-3 mt-1 rounded-full bg-white/5 hover:bg-cyan-400/40 cursor-row-resize transition-colors"
          title="Drag to change the editor height"
        >
          <span className="w-10 h-0.5 rounded-full bg-white/30" />
        </div>

        {(!showEditor ||
          !showPreview ||
          panelWidth !== DEFAULT_PANEL_WIDTH ||
          editorHeight !== DEFAULT_EDITOR_HEIGHT) && (
          <button
            type="button"
            title="Restore the default panel width, height and split position"
            onClick={() => {
              setShowEditor(true);
              setShowPreview(true);
              setEditorPercent(68);
              setPanelWidth(DEFAULT_PANEL_WIDTH);
              setEditorHeight(DEFAULT_EDITOR_HEIGHT);
            }}
            className="self-start text-xs text-cyan-300 hover:text-cyan-200 mt-1"
          >
            Reset layout
          </button>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          title={initial ? "Save changes to this post" : "Publish this post to the Journal"}
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 px-6 rounded-lg font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : initial ? "Update Post" : "Publish Post"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            title="Discard changes and close the editor"
            className="py-2 px-6 rounded-lg font-semibold border border-white/20"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export { PostEditor };

const BlogAdmin = () => {
  const [user, setUser] = useState(undefined);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  const loadPosts = () => fetchAllPosts().then(setPosts);

  useEffect(() => {
    if (user) loadPosts();
  }, [user]);

  const handleLogin = async (email, password) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthError("Invalid email or password.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCreate = async (data) => {
    setSaving(true);
    try {
      await createPost(data);
      setCreating(false);
      await loadPosts();
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (data) => {
    setSaving(true);
    try {
      await updatePost(editingPost.id, { ...data, published: editingPost.published });
      setEditingPost(null);
      await loadPosts();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    await deletePost(postId);
    await loadPosts();
  };

  const handleTogglePublish = async (post) => {
    await updatePost(post.id, {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      published: !post.published,
      coverImageUrl: post.coverImageUrl,
      slug: post.slug,
    });
    await loadPosts();
  };

  if (!isFirebaseConfigured) {
    return (
      <div className="pt-[160px] pb-[20vh] text-center text-secondary px-6">
        Blog isn&apos;t configured yet — add Firebase keys to <code>.env</code> to enable it.
      </div>
    );
  }

  if (user === undefined) {
    return <div className="pt-[160px] text-center text-secondary">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="px-6">
        <LoginForm onSubmit={handleLogin} error={authError} loading={authLoading} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[140px] pb-[15vh]">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`${styles.sectionHeadText} !text-[32px] blue-pink-gradient-text`}>
          Manage Posts
        </h2>
        <button
          onClick={() => signOut(auth)}
          title="Sign out of the blog admin"
          className="text-sm border border-white/20 py-2 px-4 rounded-lg"
        >
          Sign Out
        </button>
      </div>

      {!creating && !editingPost && (
        <button
          onClick={() => setCreating(true)}
          title="Start writing a new blog post"
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 px-6 rounded-lg font-semibold mb-8"
        >
          + New Post
        </button>
      )}

      {creating && (
        <PostEditor
          onSave={handleCreate}
          onCancel={() => setCreating(false)}
          saving={saving}
        />
      )}

      {editingPost && (
        <PostEditor
          initial={editingPost}
          onSave={handleUpdate}
          onCancel={() => setEditingPost(null)}
          saving={saving}
        />
      )}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-center bg-tertiary p-4 rounded-xl border border-white/10"
          >
            <div>
              <p className="font-semibold text-white">{post.title}</p>
              <p className="text-sm text-secondary">
                {post.published ? "Published" : "Draft"} · {post.likeCount || 0} likes
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => setEditingPost(post)}
                title="Open this post in the editor"
                className="text-cyan-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleTogglePublish(post)}
                title={post.published ? "Hide this post from the Journal" : "Make this post visible on the Journal"}
                className="text-yellow-300"
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                title="Permanently delete this post"
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-secondary">No posts yet — create your first one.</p>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
