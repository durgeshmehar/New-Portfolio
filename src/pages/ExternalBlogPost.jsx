"use client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import { externalBlogs } from "../constants";

// Most blog platforms (Hashnode included) send X-Frame-Options / CSP
// headers that block iframe embedding — the iframe's onLoad still fires
// even when the response was refused, so a fixed timeout is the only
// reliable signal here: if nothing visibly loaded by then, fall back.
const IFRAME_LOAD_TIMEOUT_MS = 4000;

const ExternalBlogPost = () => {
  const { key } = useParams();
  const post = externalBlogs.find((b) => b.key === key);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    if (!post) return;
    const timeoutId = setTimeout(() => setEmbedFailed(true), IFRAME_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeoutId);
  }, [post]);

  if (!post) {
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

      <h1 className={`${styles.sectionHeadText} blue-pink-gradient-text !text-[28px] md:!text-[36px]`}>
        {post.title}
      </h1>
      <p className="text-secondary mt-3">{post.excerpt}</p>

      {embedFailed ? (
        <div className="mt-8 bg-tertiary border border-white/10 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
          <p className="text-secondary">
            This post is hosted on Hashnode and can&apos;t be embedded here.
          </p>
          <a
            href={post.bloglink}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 text-white py-2 px-6 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            Open on Hashnode <FaExternalLinkAlt size={14} />
          </a>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white" style={{ height: "80vh" }}>
          <iframe
            title={post.title}
            src={post.bloglink}
            className="w-full h-full"
            onError={() => setEmbedFailed(true)}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ExternalBlogPost;
