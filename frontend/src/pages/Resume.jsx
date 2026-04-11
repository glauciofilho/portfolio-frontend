import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import { trackEvent } from "../analytics/ga";
import { Download, Briefcase, GraduationCap, Award, CheckCircle2 } from "lucide-react";

export default function Resume() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    trackEvent("view_resume");
  }, []);

  return (
    <main className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-24 border-b border-cyan-100 pb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-cyan-600"></span>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-cyan-600">
              {t.resumeRole}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-cyan-950 tracking-tighter leading-[0.9]">
            Strategic <br/><span className="text-cyan-600">Engineering</span>.
          </h1>
          <p className="mt-10 text-cyan-800 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
            {t.resumeSummary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={lang === 'pt' ? '/cv/Glaucio_Filho_pt.pdf' : '/cv/Glaucio_Filho_en.pdf'}
            download
            className="bg-cyan-950 text-white font-headline font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-cyan-700 transition-all duration-300 shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            <Download size={20} />
            {t.downloadCV}
          </a>
          <p className="text-center text-xs font-bold text-cyan-600 uppercase tracking-widest">
            Available for Remote / Hybrid
          </p>
        </div>
      </header>

      {/* IMPACT STATS SECTION (Opcional - Layout do Antigravity) */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="bg-cyan-950 p-8 rounded-3xl text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-300/70 mb-2">Expertise</p>
          <h4 className="text-4xl font-headline font-extrabold mb-4">Full Stack</h4>
          <p className="text-cyan-100/70 font-medium text-sm">End-to-end development with a focus on scalable architectures.</p>
        </div>
        <div className="bg-cyan-50 p-8 rounded-3xl border border-cyan-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-600 mb-2">Focus</p>
          <h4 className="text-4xl font-headline font-extrabold text-cyan-950 mb-4">Precision</h4>
          <p className="text-cyan-700 font-medium text-sm">Writing clean, maintainable code optimized for performance.</p>
        </div>
        <div className="bg-cyan-200 p-8 rounded-3xl shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-800 mb-2">Commitment</p>
          <h4 className="text-4xl font-headline font-extrabold text-cyan-900 mb-4">100%</h4>
          <p className="text-cyan-900/70 font-medium text-sm">Dedicated to delivering high-quality digital experiences.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: EXPERIENCE */}
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">
              {t.experience}
            </h2>
            <span className="h-1 w-24 bg-cyan-100"></span>
          </div>

          <div className="space-y-20">
            <div className="group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2 mb-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-cyan-950 group-hover:text-cyan-600 transition-colors">
                    Urbanizamos Incorporadora
                  </h3>
                  <p className="text-xl font-bold text-cyan-700 mt-1">
                    {t.resumeExperienceRole} • <span className="text-cyan-600">{t.resumeExperiencePeriod}</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <ul className="space-y-4">
                  {t.resumeExperienceAchievements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-lg leading-relaxed font-medium text-cyan-900">
                      <CheckCircle2 className="mt-1.5 shrink-0 text-cyan-500" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: EDUCATION & SKILLS */}
        <aside className="lg:col-span-4 space-y-16">
          
          {/* SKILLS */}
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-cyan-600 mb-8">
              {t.skills}
            </h2>
            <div className="flex flex-wrap gap-3">
              {t.resumeSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 rounded-xl bg-white text-cyan-950 font-bold text-sm border border-cyan-100 shadow-sm hover:border-cyan-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-cyan-600 mb-8">
              {t.education}
            </h2>
            <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-cyan-100">
                <GraduationCap className="absolute -left-[11px] top-0 bg-[#f1fbfc] text-cyan-600" size={20} />
                <h3 className="text-xl font-headline font-extrabold text-cyan-950">
                  UFG
                </h3>
                <p className="text-cyan-700 font-medium">
                  {t.resumeEducation}
                </p>
              </div>
            </div>
          </div>

          {/* Opcional: CERTIFICATIONS (Se você tiver) */}
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-cyan-600 mb-8">
              Achievements
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm flex items-center gap-4">
              <div className="bg-cyan-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <Award className="text-cyan-700" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-cyan-950 text-sm leading-tight">Fast Learner & Tech Enthusiast</h4>
                <p className="text-xs text-cyan-600 uppercase tracking-tighter">Self-taught Explorer</p>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </main>
  );
}