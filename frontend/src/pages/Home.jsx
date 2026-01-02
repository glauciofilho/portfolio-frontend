import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[calc(75vh-140px)] flex flex-col justify-center items-center text-center px-6">

      <span className="mb-6 px-4 text-sm rounded-full border border-cyan-700 text-cyan-600">
        Portfolio
      </span>

      <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
        {t.homeTitle}
      </h1>

      <p className="text-lg md:text-xl text-cyan-900 max-w-2xl mb-10">
        {t.about}
      </p>

      <div className="flex gap-4">
        <Link
          to="/projects"
          className="px-6 py-3 rounded-full bg-cyan-600 text-white font-medium hover:bg-cyan-900 transition"
        >
          {t.projects}
        </Link>

        <Link
          to="/contact"
          className="px-6 py-3 rounded-full border border-cyan-300 hover:bg-cyan-100 transition"
        >
          {t.contact}
        </Link>
      </div>

    </section>
  );
}