"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant, slideIn } from "../utils/motion";
import { externalBlogs } from "../constants";
import { fetchPublishedPosts } from "../lib/blogService";

const formatDate = (value) => {
  const d = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!d) return "Undated";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const sortKey = (value) => {
  const d = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  return d ? d.getTime() : 0;
};

const JournalEntry = ({ title, excerpt, date, tags, href, external }) => (
  <motion.div variants={slideIn("up", "tween", 0, 0.4)}>
    <Link
      to={href}
      className="group grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-8 py-6 border-b border-white/10"
    >
      <div className="text-secondary text-sm sm:text-base font-mono sm:pt-1 shrink-0">
        {date}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          {external && (
            <span className="text-[10px] uppercase tracking-wider text-secondary border border-white/20 rounded-full px-2 py-0.5">
              External
            </span>
          )}
        </div>
        <p className="text-secondary mt-1 line-clamp-2">{excerpt}</p>
        <div className="flex gap-3 mt-2 text-sm text-secondary flex-wrap">
          {(tags || []).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  </motion.div>
);

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const entries = [
    ...posts.map((post) => ({
      key: post.id,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      dateValue: post.createdAt,
      href: `/blog/${post.slug}`,
    })),
    ...externalBlogs.map((post) => ({
      key: post.key,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      dateValue: post.date,
      href: `/blog/external/${post.key}`,
      external: true,
    })),
  ].sort((a, b) => sortKey(b.dateValue) - sortKey(a.dateValue));

  const hasAnyPosts = entries.length > 0;

  return (
    <div className="max-w-3xl mx-auto md:px-8 w-full pt-[140px] pb-[15vh] px-6">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        className="flex flex-col justify-center items-center mb-4"
      >
        <p className={styles.sectionSubText}>Notes, resources & things I&apos;m learning</p>
        <h2 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
          Journal
        </h2>
      </motion.div>

      {loading && (
        <p className="text-center text-secondary mt-16">Loading entries...</p>
      )}

      {error && (
        <p className="text-center text-red-400 mt-16">
          Couldn&apos;t load posts: {error}
        </p>
      )}

      {!loading && !error && !hasAnyPosts && (
        <p className="text-center text-secondary mt-16">
          New entries coming soon.
        </p>
      )}

      <div className="mt-8">
        {entries.map((entry) => (
          <JournalEntry
            key={entry.key}
            title={entry.title}
            excerpt={entry.excerpt}
            tags={entry.tags}
            date={formatDate(entry.dateValue)}
            href={entry.href}
            external={entry.external}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
