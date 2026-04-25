import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { trackEvent } from "../analytics/ga";
import { getResume } from "../services/api";
import { CheckCircle2, X, ExternalLink, RefreshCw, FileText, GraduationCap } from "lucide-react";

export default function Resume() {
  const { lang, t } = useLanguage();
  const [modal, setModal] = useState({ isOpen: false, url: "", title: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackEvent("view_resume");
  }, []);

  const handleOpenResume = async () => {
    setLoading(true);
    try {
      const data = await getResume(lang);
      if (data && data.resume_url) {
        setModal({ isOpen: true, url: data.resume_url, title: "Curriculum Vitae" });
      }
    } catch (err) {
      alert("Erro ao carregar o currículo. " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-24 border-b border-cyan-100 pb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-cyan-600"></span>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-cyan-600">
              {t.resumeRole || "Software Engineer"}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-cyan-950 tracking-tighter leading-[0.9]">
            {t.strategic} <br/><span className="text-cyan-600">{t.engineering}</span>.
          </h1>
          <p className="mt-10 text-cyan-800 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
            {t.resumeSummary}
          </p>
        </div>

        <div className="flex flex-col gap-6 min-w-[340px]">
          <button
            onClick={() => window.open("https://learn.microsoft.com/en-us/users/gluciofilho-7894/credentials/5b3269f664d28c90", "_blank")}
            className="bg-white border border-cyan-100 rounded-3xl p-6 shadow-xl relative overflow-hidden group transition-all hover:shadow-2xl hover:border-blue-200 text-left"
          >
            <div className="flex items-center gap-5">
              <img
                src="/img/microsoft-certified-associate-badge.svg"
                alt="PL-300"
                className="w-14 h-14 transition-transform group-hover:scale-110 duration-500"
              />
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">{t.microsoftCertified}</h4>
                <p className="text-lg font-bold text-cyan-950 leading-tight">{t.dataanalystassociate}</p>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 block group-hover:text-blue-500 transition-colors">
                  {t.clicktoverifycredentials}
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={handleOpenResume}
            disabled={loading}
            className="bg-cyan-950 text-white font-headline font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-cyan-700 transition-all duration-300 shadow-xl disabled:opacity-70"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <FileText size={20} />}
            {t.downloadCV}
          </button>
        </div>
      </header>

      {/* 2. IMPACT STATS SECTION - Adicionado Shadow XL em todos */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-cyan-950 p-8 rounded-3xl text-white shadow-xl transition-all hover:shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-300/70 mb-2">{t.expertise}</p>
          <h4 className="text-4xl font-headline font-extrabold mb-4">{t.fullStack}</h4>
          <p className="text-cyan-100/70 font-medium text-sm leading-relaxed">{t.fullStackDescription}</p>
        </div>
        <div className="bg-cyan-50 p-8 rounded-3xl border border-cyan-100 shadow-xl transition-all hover:shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-600 mb-2">{t.focus}</p>
          <h4 className="text-4xl font-headline font-extrabold text-cyan-950 mb-4">{t.precision}</h4>
          <p className="text-cyan-700 font-medium text-sm leading-relaxed">{t.precisionDescription}</p>
        </div>
        <div className="bg-cyan-200 p-8 rounded-3xl shadow-xl transition-all hover:shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-800 mb-2">{t.commitment}</p>
          <h4 className="text-4xl font-headline font-extrabold text-cyan-900 mb-4">100%</h4>
          <p className="text-cyan-900/70 font-medium text-sm leading-relaxed">{t.commitmentDescription}</p>
        </div>
      </section>

      {/* 3. EXPERIENCE & SKILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* EXPERIÊNCIA */}
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">{t.experience}</h2>
            <span className="h-1 w-24 bg-cyan-100"></span>
          </div>
          <div className="space-y-20">
            <div className="group">
              <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-cyan-950 group-hover:text-cyan-600 transition-colors">Urbanizamos</h3>
              <p className="text-xl font-bold text-cyan-700 mt-1">{t.resumeExperienceRole} • {t.resumeExperiencePeriod}</p>
              <ul className="mt-8 space-y-4">
                {(t.resumeExperienceAchievements || []).map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-lg font-medium text-cyan-900">
                    <CheckCircle2 className="mt-1.5 shrink-0 text-cyan-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HABILIDADES - Estilo igual a Experiência */}
        <aside className="lg:col-span-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">{t.skills}</h2>
            <span className="h-1 w-12 bg-cyan-100"></span>
          </div>
          <div className="flex flex-wrap gap-3">
            {(t.resumeSkills || []).map((skill, index) => (
              <span
                key={index}
                className="px-5 py-2.5 rounded-xl bg-white text-cyan-950 font-bold text-sm border border-cyan-100 shadow-sm hover:border-cyan-400 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {/* 4. EDUCAÇÃO - Nova seção embaixo de tudo */}
      <section className="pt-16 border-t border-cyan-100">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">{t.education}</h2>
          <span className="h-1 w-48 bg-cyan-100"></span>
        </div>
        <div className="bg-white border border-cyan-100 p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-cyan-400 transition-all">
          <div className="bg-cyan-50 p-4 rounded-2xl text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
            <GraduationCap size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-headline font-extrabold text-cyan-950 mb-2">Universidade Federal de Goiás</h3>
            <p className="text-lg font-medium text-cyan-700 leading-relaxed">
              {t.resumeEducation}
            </p>
          </div>
        </div>
      </section>

      {/* 5. MODAL (ILHA) */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full h-full max-w-5xl bg-#001a28 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">{modal.title}</h3>
              <div className="flex items-center gap-4">
                <a href={modal.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-600 p-2">
                  <ExternalLink size={20} />
                </a>
                <button onClick={() => setModal({ ...modal, isOpen: false })} className="text-slate-400 hover:text-red-500 p-2">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-50">
              <iframe src={modal.url} className="w-full h-full border-none" title={t.documentPreview} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}