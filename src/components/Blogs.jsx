"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant, slideIn } from "../utils/motion";
import { fetchPublishedPosts } from "../lib/blogService";
import { externalBlogs } from "../constants";

const HOME_TEASER_LIMIT = 4;

const formatDate = (value) => {
  const d = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!d) return "Undated";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const sortKey = (value) => {
  const d = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  return d ? d.getTime() : 0;
};

const JournalRow = ({ title, date, href, external }) => (
  <motion.div variants={slideIn("up", "tween", 0, 0.4)}>
    <Link
      to={href}
      className="group grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 py-4 border-b border-white/10 items-baseline"
    >
      <span className="text-secondary text-sm font-mono">{date}</span>
      <span className="flex items-center gap-2 min-w-0">
        <h3 className="text-white font-semibold group-hover:text-cyan-300 transition-colors truncate">
          {title}
        </h3>
        {external && (
          <span className="text-[10px] uppercase tracking-wider text-secondary border border-white/20 rounded-full px-2 py-0.5 shrink-0">
            External
          </span>
        )}
      </span>
    </Link>
  </motion.div>
);

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const entries = [
    ...posts.map((post) => ({
      key: post.id,
      title: post.title,
      dateValue: post.createdAt,
      href: `/blog/${post.slug}`,
    })),
    ...externalBlogs.map((post) => ({
      key: post.key,
      title: post.title,
      dateValue: post.date,
      href: `/blog/external/${post.key}`,
      external: true,
    })),
  ].sort((a, b) => sortKey(b.dateValue) - sortKey(a.dateValue));

  const visible = entries.slice(0, HOME_TEASER_LIMIT);
  const hasMore = entries.length > HOME_TEASER_LIMIT;

  return (
    <section className="portfolio-section max-w-5xl mx-auto w-full">
      <motion.div variants={textVariant()}
       className="flex flex-col justify-center items-center">
        <p className="section-eyebrow">NOTES, RESOURCES & THINGS I’M LEARNING</p>
        <h2 className="section-title mt-4">Journal</h2>
      </motion.div>

      {!loading && entries.length === 0 && (
        <p className="text-center text-secondary mt-10">New entries coming soon.</p>
      )}

      <div className="mt-10">
        {visible.map((entry) => (
          <JournalRow key={entry.key} {...entry} date={formatDate(entry.dateValue)} />
        ))}
      </div>

      {entries.length > 0 && (
        <div className="flex justify-center mt-10">
          <Link
            to="/blog"
            className="text-link"
          >
            {hasMore ? "View full journal" : "Go to Journal"}
          </Link>
        </div>
      )}
    </section>
  );
};

const WrappedAbout = SectionWrapper(Blogs, "blogs");

export default WrappedAbout;
