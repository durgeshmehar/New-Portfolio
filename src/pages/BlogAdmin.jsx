"use client";
import { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
  uploadBlogImage,
} from "../lib/blogService";
import { styles } from "../styles";
import PostContent from "../components/blog/PostContent";

const emptyForm = { title: "", excerpt: "", content: "", tags: "", coverImageUrl: "" };

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

const TOOLBAR_ACTIONS = [
  { label: "B", title: "Bold", wrap: ["**", "**"] },
  { label: "I", title: "Italic", wrap: ["_", "_"] },
  { label: "H", title: "Heading", wrap: ["## ", ""] },
  { label: "</>", title: "Code", wrap: ["`", "`"] },
  { label: "Link", title: "Link", wrap: ["[", "](https://)"] },
  {
    label: "Flowchart",
    title: "Insert flowchart (Mermaid)",
    wrap: [
      "\n```mermaid\nflowchart TD\n  A[Start] --> B{Decision}\n  B -->|Yes| C[Do thing]\n  B -->|No| D[Do other thing]\n```\n",
      "",
    ],
  },
];

const MarkdownToolbar = ({ textareaRef, onChange }) => {
  const imageInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const insertText = (before, after = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd, value } = el;
    const selected = value.slice(selectionStart, selectionEnd);
    const next =
      value.slice(0, selectionStart) +
      before +
      selected +
      after +
      value.slice(selectionEnd);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const cursor = selectionStart + before.length + selected.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const handleImageSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadBlogImage(file);
      insertText(`![${file.name}](${url})`, "");
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
          title={action.title}
          onClick={() => insertText(...action.wrap)}
          className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
        >
          {action.label}
        </button>
      ))}
      <button
        type="button"
        title="Insert image"
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

const MIN_PANE_PERCENT = 25;
const MAX_PANE_PERCENT = 80;

const PostEditor = ({ initial, onSave, onCancel, saving }) => {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          excerpt: initial.excerpt,
          content: initial.content,
          tags: (initial.tags || []).join(", "),
          coverImageUrl: initial.coverImageUrl || "",
        }
      : emptyForm
  );
  const [uploadingCover, setUploadingCover] = useState(false);
  const textareaRef = useRef(null);
  const splitRef = useRef(null);
  const [editorPercent, setEditorPercent] = useState(68);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingRef.current || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const percent = ((clientX - rect.left) / rect.width) * 100;
      setEditorPercent(Math.min(MAX_PANE_PERCENT, Math.max(MIN_PANE_PERCENT, percent)));
    };
    const stopDragging = () => {
      draggingRef.current = false;
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
        });
      }}
      className="flex flex-col gap-4 bg-tertiary p-6 rounded-2xl border border-white/10 mb-10"
    >
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        className="bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
        required
      />
      <input
        type="text"
        placeholder="Short excerpt (shown in listing)"
        value={form.excerpt}
        onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
        className="bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
        required
      />
      <input
        type="text"
        placeholder="Tags, comma separated (e.g. Python, Backend)"
        value={form.tags}
        onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
        className="bg-primary py-3 px-4 text-white rounded-lg outline-none border border-violet-800"
      />

      <div className="flex items-center gap-4">
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
          <label className="text-xs font-semibold px-3 py-1.5 rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-300 transition-colors cursor-pointer inline-block w-fit">
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
              onClick={() => setForm((f) => ({ ...f, coverImageUrl: "" }))}
              className="text-xs text-red-400 hover:text-red-300 w-fit"
            >
              Remove cover photo
            </button>
          )}
        </div>
      </div>

      <div>
        <MarkdownToolbar
          textareaRef={textareaRef}
          onChange={(next) => setForm((f) => ({ ...f, content: next }))}
        />
        <div
          ref={splitRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-0 h-auto lg:h-[75vh] lg:min-h-[600px]"
        >
          <div
            style={isDesktop ? { width: `${editorPercent}%` } : undefined}
            className="w-full lg:pr-2 h-[50vh] lg:h-full"
          >
            <textarea
              ref={textareaRef}
              placeholder="Write your post in Markdown... use the Flowchart button for diagrams."
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="w-full h-full py-3 px-4 text-white rounded-lg outline-none border border-violet-800 bg-primary font-mono text-sm resize-none"
              required
            />
          </div>

          <div
            onMouseDown={startDragging}
            onTouchStart={startDragging}
            className="hidden lg:block w-2 shrink-0 mx-1 rounded-full bg-white/10 hover:bg-cyan-400/60 cursor-col-resize transition-colors"
            title="Drag to resize"
          />

          <div
            style={isDesktop ? { width: `${100 - editorPercent}%` } : undefined}
            className="w-full lg:pl-2 h-[50vh] lg:h-full"
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
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 px-6 rounded-lg font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : initial ? "Update Post" : "Publish Post"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-6 rounded-lg font-semibold border border-white/20"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

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
          className="text-sm border border-white/20 py-2 px-4 rounded-lg"
        >
          Sign Out
        </button>
      </div>

      {!creating && !editingPost && (
        <button
          onClick={() => setCreating(true)}
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
              <button onClick={() => setEditingPost(post)} className="text-cyan-300">
                Edit
              </button>
              <button onClick={() => handleTogglePublish(post)} className="text-yellow-300">
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => handleDelete(post.id)} className="text-red-400">
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
