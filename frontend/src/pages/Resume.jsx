import { useLanguage } from "../context/LanguageContext";

export default function Resume() {
  const { lang, t } = useLanguage();

  return (
    <section className="max-w-5xl mx-auto px-6 pt-10 pb-10">

      {/* HEADER */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Gláucio Filho
        </h1>
        <p className="text-cyan-700 text-lg md:text-xl font-medium">
          {t.resumeRole}
        </p>
      </header>

      {/* SUMMARY */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">
          {t.summary}
        </h2>
        <p className="text-cyan-700 leading-relaxed max-w-4xl">
          {t.resumeSummary}
        </p>
      </section>

      {/* SKILLS */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8">
          {t.skills}
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-700">
          {t.resumeSkills.map((skill, index) => (
            <li
              key={index}
              className="border border-cyan-200 rounded-xl px-5 py-3"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* EXPERIENCE */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-10">
          {t.experience}
        </h2>

        <div className="border border-cyan-200 rounded-2xl p-8">
          <header className="mb-4">
            <h3 className="text-xl font-semibold">
              Urbanizamos Incorporadora
            </h3>
            <p className="text-sm text-cyan-500">
              {t.resumeExperienceRole} · {t.resumeExperiencePeriod}
            </p>
          </header>

          <ul className="list-disc pl-5 space-y-3 text-cyan-700">
            {t.resumeExperienceAchievements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {t.education}
        </h2>

        <div className="border border-cyan-200 rounded-2xl p-8">
          <h3 className="text-lg font-semibold">
            Universidade Federal de Goiás
          </h3>
          <p className="text-cyan-600">
            {t.resumeEducation}
          </p>
        </div>
      </section>

      {/* DOWNLOAD CV */}
      <a
        href={lang === 'pt' ? '/cv/Glaucio_Filho_pt.pdf' : '/cv/Glaucio_Filho_en.pdf'}
        download
        className="inline-block mt-8 bg-sky-500 text-white px-8 py-3 rounded-full font-medium hover:bg-sky-500 transition"
      >
        {t.downloadCV}
      </a>

    </section>
  );
}