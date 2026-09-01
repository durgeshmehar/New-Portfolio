import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 px-[10vw] py-10 overflow-hidden">
      <div className="flex flex-col items-center gap-6 text-center">

        <div className="flex gap-3 md:gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={label}
              className="violet-gradient text-white p-3 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          ))}
        </div>

        <div className="text-sm md:text-base text-gray-400 pt-1">
          Copyright &#169; {new Date().getFullYear()} | Designed and Developed by{" "}
          <span className="blue-pink-gradient-text">Durgesh Mehar</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
