import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div
        className={`mx-auto transition-all duration-300 bg-cyan-950 ${
          scrolled
            ? "max-w-full rounded-b-3xl shadow-lg"
            : "max-w-6xl rounded-2xl shadow-md mt-4"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-5">

          {/* LOGO */}
          <Link to="/" className="font-bold text-white text-xl tracking-wide">
            GAPF
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-12 text-cyan-300 text-lg font-medium">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/resume" className="hover:text-white transition">
              {t.resume}
            </Link>
            <Link to="/projects" className="hover:text-white transition">
              {t.projects}
            </Link>
            {/* <Link to="/analytics" className="hover:text-white transition">
              {t.analytics}
            </Link> */}
            <Link to="/contact" className="hover:text-white transition">
              {t.contact}
            </Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            <LanguageSwitch
              lang={lang}
              onToggle={() => setLang(lang === "en" ? "pt" : "en")}
            />

            <button
              className="md:hidden text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden flex flex-col gap-6 px-8 pb-6 text-cyan-300 text-lg">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/resume" onClick={() => setOpen(false)}>{t.resume}</Link>
            <Link to="/projects" onClick={() => setOpen(false)}>{t.projects}</Link>
            {/* <Link to="/analytics" onClick={() => setOpen(false)}>{t.analytics}</Link> */}
            <Link to="/contact" onClick={() => setOpen(false)}>{t.contact}</Link>
          </div>
        )}
      </div>
    </header>
  );
}