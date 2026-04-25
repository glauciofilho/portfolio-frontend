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
        className={`mx-auto transition-all duration-300 bg-cyan-950
          /* MOBILE: Sempre full width e colado no topo */
          w-full mt-0 rounded-b-3xl shadow-lg

          /* DESKTOP (md): Comportamento de Ilha ou Barra fixa */
          ${scrolled
            ? "md:max-w-full md:rounded-b-3xl md:shadow-lg md:mt-0"
            : "md:max-w-6xl md:rounded-full md:shadow-md md:mt-4"
          }

          /* Se o menu mobile estiver aberto, removemos arredondamentos para não cortar o conteúdo */
          ${open ? "rounded-none" : ""}
        `}
      >
        <div className="flex items-center justify-between px-8 py-5">

          {/* LOGO */}
          <Link to="/" className="font-bold text-white text-xl tracking-wide">
            GAPF
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-12 text-cyan-300 text-lg font-medium">
            <Link to="/" className="hover:text-white transition">{t.home}</Link>
            <Link to={`/${lang}/resume`} className="hover:text-white transition">
              {t.resume}
            </Link>
            <Link to={`/${lang}/projects`} className="hover:text-white transition">
              {t.projects}
            </Link>
            <Link to={`/${lang}/contact`} className="hover:text-white transition">
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

        {/* MOBILE MENU - Refatorado para melhor visual */}
        {open && (
          <div className="md:hidden flex flex-col gap-6 px-8 pb-8 text-cyan-300 text-lg border-t border-cyan-900 pt-4">
            <Link to="/" className="hover:text-white" onClick={() => setOpen(false)}>Home</Link>
            <Link to={`/${lang}/resume`} className="hover:text-white" onClick={() => setOpen(false)}>{t.resume}</Link>
            <Link to={`/${lang}/projects`} className="hover:text-white" onClick={() => setOpen(false)}>{t.projects}</Link>
            <Link to={`/${lang}/contact`} className="hover:text-white" onClick={() => setOpen(false)}>{t.contact}</Link>
          </div>
        )}
      </div>
    </header>
  );
}