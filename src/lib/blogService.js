import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as fbLimit,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function requireDb() {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Blog is not configured yet — add Firebase keys to .env to enable it."
    );
  }
  return db;
}

const UPLOAD_TIMEOUT_MS = 20000;

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

// Image hosting via ImgBB's free API (Firebase Storage requires a paid plan).
export async function uploadBlogImage(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Image upload isn't configured — add VITE_IMGBB_API_KEY to .env to enable it."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await withTimeout(
    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    }),
    UPLOAD_TIMEOUT_MS,
    "Upload timed out — check your connection and try again."
  );

  const result = await response.json();
  if (!response.ok || !result?.data?.url) {
    throw new Error(result?.error?.message || "Image upload failed.");
  }
  return result.data.url;
}

const postsRef = () => collection(requireDb(), "posts");

export const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export async function fetchPublishedPosts(count) {
  const constraints = [
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  ];
  if (count) constraints.push(fbLimit(count));
  const snap = await getDocs(query(postsRef(), ...constraints));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchAllPosts() {
  const snap = await getDocs(query(postsRef(), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchPostBySlug(slug) {
  const snap = await getDocs(query(postsRef(), where("slug", "==", slug)));
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function createPost({ title, excerpt, content, tags, coverImageUrl }) {
  return addDoc(postsRef(), {
    title,
    slug: slugify(title),
    excerpt,
    content,
    tags,
    coverImageUrl: coverImageUrl || null,
    authorName: "Durgesh Mehar",
    published: true,
    likeCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePost(postId, { title, excerpt, content, tags, published, coverImageUrl }) {
  const updates = {
    excerpt,
    content,
    tags,
    published,
    coverImageUrl: coverImageUrl || null,
    updatedAt: serverTimestamp(),
  };
  if (title) {
    updates.title = title;
    updates.slug = slugify(title);
  }
  return updateDoc(doc(requireDb(), "posts", postId), updates);
}

export async function deletePost(postId) {
  return deleteDoc(doc(requireDb(), "posts", postId));
}

export async function likePost(postId) {
  return updateDoc(doc(requireDb(), "posts", postId), { likeCount: increment(1) });
}

export function hasLikedPost(postId) {
  return typeof window !== "undefined" && window.localStorage.getItem(`liked_${postId}`) === "1";
}

export function markPostLiked(postId) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(`liked_${postId}`, "1");
  }
}

export function commentsRef(postId) {
  return collection(requireDb(), "posts", postId, "comments");
}

export async function fetchComments(postId) {
  const snap = await getDocs(query(commentsRef(postId), orderBy("createdAt", "asc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addComment(postId, { name, text }) {
  return addDoc(commentsRef(postId), {
    name,
    text,
    createdAt: serverTimestamp(),
  });
}

export async function getPostDoc(postId) {
  const snap = await getDoc(doc(requireDb(), "posts", postId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
