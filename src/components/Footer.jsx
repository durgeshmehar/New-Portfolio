import { socialLinks } from "../constants";

const Footer = () => (
  <footer className="site-footer">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-16">
      <div>
        <p className="section-eyebrow">LET’S KEEP BUILDING</p>
        <p className="mt-2 text-lg font-medium text-slate-200">Good systems start with a good conversation.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {socialLinks.map(({ icon: Icon, label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="site-footer-link" aria-label={label}><Icon aria-hidden="true" /><span>{label}</span></a>
        ))}
      </div>
    </div>
    <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-5 text-sm text-slate-500 lg:px-16">© {new Date().getFullYear()} Durgesh Mehar · Designed around useful work.</div>
  </footer>
);

export default Footer;
