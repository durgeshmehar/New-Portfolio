"use client";
import { useEffect, useMemo, useState } from "react";
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

const BlogEntry = ({ title, date, tags, href, external }) => (
  <motion.div variants={slideIn("up", "tween", 0, 0.4)}>
    <Link
      to={href}
      className="group grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-8 py-4 border-b border-white/10"
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
        <div className="flex gap-3 mt-2 text-base text-secondary flex-wrap">
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
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const entries = useMemo(() => [
    ...posts.map((post) => ({
      key: post.id,
      title: post.title,
      tags: post.tags,
      dateValue: post.createdAt,
      href: `/blog/${post.slug}`,
    })),
    ...externalBlogs.map((post) => ({
      key: post.key,
      title: post.title,
      tags: post.tags,
      dateValue: post.date,
      href: `/blog/external/${post.key}`,
      external: true,
    })),
  ].sort((a, b) => sortKey(b.dateValue) - sortKey(a.dateValue)), [posts]);

  const allTags = useMemo(() => {
    const set = new Set();
    entries.forEach((entry) => (entry.tags || []).forEach((tag) => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const visibleEntries = useMemo(() => {
    if (!activeTag) return entries;
    return entries.filter((entry) => (entry.tags || []).includes(activeTag));
  }, [entries, activeTag]);

  const hasAnyPosts = entries.length > 0;

  return (
    <div className="max-w-3xl md:max-w-6xl mx-auto md:px-8 w-full pt-[140px] pb-[15vh] px-6">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        className="flex flex-col justify-center items-center mb-4"
      >
        <p className={styles.sectionSubText}>Notes, resources & things I&apos;m learning</p>
        <h2 className={`${styles.sectionHeadText} blue-pink-gradient-text`}>
          Blog
        </h2>
      </motion.div>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        {allTags.length > 0 && (
          <aside
            className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:sticky md:top-24 md:w-80"
            role="group"
            aria-label="Filter posts by tag"
          >
            <p className="text-sm uppercase tracking-wider text-secondary mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                aria-pressed={activeTag === null}
                className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activeTag === null
                    ? "border-cyan-300/60 text-cyan-300 bg-cyan-300/10"
                    : "border-white/15 text-secondary hover:border-white/30"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    activeTag === tag
                      ? "border-cyan-300/60 text-cyan-300 bg-cyan-300/10"
                      : "border-white/15 text-secondary hover:border-white/30"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </aside>
        )}

        <div className="min-w-0 flex-1">
          {loading && (
            <p className="text-center text-secondary mt-8">Loading entries...</p>
          )}

          {error && (
            <p className="text-center text-red-400 mt-8">
              Couldn&apos;t load posts: {error}
            </p>
          )}

          {!loading && !error && !hasAnyPosts && (
            <p className="text-center text-secondary mt-8">
              New entries coming soon.
            </p>
          )}

          {!loading && !error && hasAnyPosts && visibleEntries.length === 0 && (
            <p className="text-center text-secondary mt-8">
              No posts tagged #{activeTag}.
            </p>
          )}

          {visibleEntries.map((entry) => (
            <BlogEntry
              key={entry.key}
              title={entry.title}
              tags={entry.tags}
              date={formatDate(entry.dateValue)}
              href={entry.href}
              external={entry.external}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
