"use client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import PostContent from "../components/blog/PostContent";
import {
  fetchPostBySlug,
  fetchComments,
  addComment,
  likePost,
  hasLikedPost,
  markPostLiked,
} from "../lib/blogService";

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return "";
  return timestamp.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentForm, setCommentForm] = useState({ name: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchPostBySlug(slug).then(async (found) => {
      if (!active) return;
      if (!found) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPost(found);
      setLiked(hasLikedPost(found.id));
      const postComments = await fetchComments(found.id);
      if (active) setComments(postComments);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const handleLike = async () => {
    if (!post || liked) return;
    setLiked(true);
    markPostLiked(post.id);
    setPost((p) => ({ ...p, likeCount: (p.likeCount || 0) + 1 }));
    try {
      await likePost(post.id);
    } catch {
      // like still recorded locally; ignore network hiccup
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post || !commentForm.name.trim() || !commentForm.text.trim()) return;
    setSubmitting(true);
    try {
      await addComment(post.id, {
        name: commentForm.name.trim(),
        text: commentForm.text.trim(),
      });
      const postComments = await fetchComments(post.id);
      setComments(postComments);
      setCommentForm({ name: "", text: "" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-[160px] pb-[20vh] text-center text-secondary">
        Loading...
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="pt-[160px] pb-[20vh] text-center">
        <p className="text-secondary text-lg">Post not found.</p>
        <Link to="/blog" className="text-cyan-300 underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0, 0.6)}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto px-6 pt-[140px] pb-[15vh]"
    >
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-secondary hover:text-cyan-300 transition-colors mb-8"
      >
        <FaArrowLeft /> Back to Blog
      </Link>

      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full max-h-[420px] object-cover rounded-2xl border border-white/10 mb-8"
        />
      )}

      <h1 className={`${styles.sectionHeadText} blue-pink-gradient-text !text-[32px] md:!text-[44px]`}>
        {post.title}
      </h1>
      <p className="text-secondary mt-3">
        {post.authorName || "Durgesh Mehar"} · {formatDate(post.createdAt)}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {(post.tags || []).map((tag) => (
          <span key={tag} className="text-sm text-secondary">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <PostContent content={post.content} />
      </div>

      <button
        onClick={handleLike}
        disabled={liked}
        className="mt-10 flex items-center gap-2 text-lg font-semibold text-pink-400 disabled:opacity-80"
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
        {post.likeCount || 0} {post.likeCount === 1 ? "like" : "likes"}
      </button>

      <div className="mt-14 border-t border-white/20 pt-8">
        <h3 className="text-xl font-bold mb-6">
          Comments ({comments.length})
        </h3>

        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 mb-10">
          <input
            type="text"
            placeholder="Your name"
            value={commentForm.name}
            onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
            className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800"
            required
          />
          <textarea
            rows={3}
            placeholder="Add a comment..."
            value={commentForm.text}
            onChange={(e) => setCommentForm((f) => ({ ...f, text: e.target.value }))}
            className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border border-violet-800 focus:ring-1 focus:ring-violet-800"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="self-start bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 px-6 rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        <div className="flex flex-col gap-6">
          {comments.map((c) => (
            <div key={c.id} className="border-b border-white/10 pb-4">
              <p className="font-semibold text-cyan-300">{c.name}</p>
              <p className="text-gray-300 mt-1">{c.text}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-secondary">Be the first to comment.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
