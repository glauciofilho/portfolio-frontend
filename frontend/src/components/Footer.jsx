import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cyan-950 text-white rounded-t-3xl mt-32 z-50">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-4xl font-bold">
            {t.footerTitle}
          </h2>

          <Link
            to="/contact"
            className="inline-flex items-center bg-sky-500 hover:bg-sky-600 transition text-white px-6 py-3 rounded-full font-medium"
          >
            {t.footerCTA}
          </Link>
        </div>

        <hr className="my-12 border-cyan-700" />

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ABOUT */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Portfolio
            </h3>

            <p className="text-sm text-cyan-400 mb-6">
              {t.footerDescription}
            </p>

            {/* SOCIAL BADGES */}
            <div className="flex gap-2 flex-wrap">

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/glaucio-filho/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <img
                  src="https://img.shields.io/badge/in-0A66C2?logo=linkedin&logoColor=white"
                  alt="LinkedIn"
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  LinkedIn
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/glauciofilho"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <img
                  src="https://img.shields.io/badge/-181717?logo=github&logoColor=white"
                  alt="GitHub"
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  GitHub
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:glauciofilho1997@gmail.com"
                className="relative group"
              >
                <img
                  src="https://img.shields.io/badge/-EA4335?logo=gmail&logoColor=white"
                  alt="Email"
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Email
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/5562996664343"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <img
                  src="https://img.shields.io/badge/-25D366?logo=whatsapp&logoColor=white"
                  alt="WhatsApp"
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  WhatsApp
                </span>
              </a>

            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-sky-400 font-semibold mb-4">
              {t.navigation}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/">{t.home}</Link></li>
              <li><Link to="/resume">{t.resume}</Link></li>
              <li><Link to="/projects">{t.projects}</Link></li>
              <li><Link to="/analytics">{t.analytics}</Link></li>
              <li><Link to="/contact">{t.contact}</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sky-400 font-semibold mb-4">
              {t.contact}
            </h4>
            <ul className="space-y-2 text-sm text-cyan-300">
              <li>
                <a href="mailto:glauciofilho1997@gmail.com">
                  Email
                </a>
              </li>
              <li>
                <a href="https://www.glauciofilho.com.br" target="_blank">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/glaucio-filho/" target="_blank">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://wa.me/5562996664343" target="_blank">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://github.com/glauciofilho" target="_blank">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-12 border-cyan-700" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cyan-400">
          <span>
            © 2025 Gláucio Portfolio. {t.rights}
          </span>

          <span>
            {t.terms} | {t.privacy}
          </span>
        </div>

      </div>
    </footer>
  );
}