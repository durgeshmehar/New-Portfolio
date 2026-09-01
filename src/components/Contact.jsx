import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaArrowRight, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { contactInfo, socialLinks } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, { from_name: form.name, to_name: "Durgesh Mehar", from_email: form.email, to_email: contactInfo.email, message: form.message }, import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="site-page-section">
      <div className="page-intro max-w-3xl"><p className="section-eyebrow">CONTACT</p><h1 className="page-title">Let’s make something useful.</h1><p className="page-copy">Whether you’re solving a difficult product problem, comparing system trade-offs, or simply want to talk through an idea, I’d be glad to hear from you.</p></div>
      <div className="contact-layout mt-14">
        <form ref={formRef} onSubmit={submit} className="content-panel contact-form">
          <label>Your name<input className="theme-input" name="name" value={form.name} onChange={update} required /></label>
          <label>Email<input className="theme-input" type="email" name="email" value={form.email} onChange={update} required /></label>
          <label>What’s on your mind?<textarea className="theme-input" name="message" rows={5} value={form.message} onChange={update} required /></label>
          <button type="submit" className="theme-action" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send a note"} <FaArrowRight aria-hidden="true" /></button>
          <p className="contact-status" role="status">{status === "sent" && "Thanks—your note is on its way."}{status === "error" && "Something went wrong. Please email me directly instead."}</p>
        </form>
        <aside className="contact-aside">
          <div className="content-panel contact-detail"><FaEnvelope aria-hidden="true" /><p className="section-eyebrow">EMAIL</p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a><p>Usually replies within 24 hours.</p></div>
          <div className="content-panel contact-detail"><FaLocationDot aria-hidden="true" /><p className="section-eyebrow">BASED IN</p><p className="text-lg font-medium text-slate-100">{contactInfo.location}</p><p>Available for meaningful conversations and collaborations.</p></div>
          <div className="flex flex-wrap gap-2">{socialLinks.filter(({ label }) => label !== "Email").map(({ icon: Icon, label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="site-footer-link"><Icon aria-hidden="true" />{label}</a>)}</div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
