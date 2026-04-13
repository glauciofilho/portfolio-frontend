import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { trackEvent } from "../analytics/ga";
import { getResume } from "../services/api";
import { Download, GraduationCap, CheckCircle2, X, ExternalLink, RefreshCw } from "lucide-react";

export default function Resume() {
  const { lang, t } = useLanguage();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackEvent("view_resume");
  }, []);

  const handleOpenPreview = async () => {
    setLoading(true);
    try {
      const data = await getResume(lang);
      if (data && data.resume_url) {
        setResumeUrl(data.resume_url);
        setIsModalOpen(true);
        trackEvent("preview_resume_opened", { lang });
      }
    } catch (err) {
      console.error("Erro ao buscar currículo:", err);
      alert("Erro ao carregar o currículo. Tente novamente.");
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
            Strategic <br/><span className="text-cyan-600">Engineering</span>.
          </h1>
          <p className="mt-10 text-cyan-800 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
            {t.resumeSummary}
          </p>
        </div>

        {/* LADO DIREITO: SELO OFICIAL E AÇÃO */}
        <div className="flex flex-col gap-6 min-w-[340px]">
          {/* BADGE MICROSOFT OFICIAL */}
          <div className="bg-white border-2 border-blue-50 rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 relative overflow-hidden group transition-all hover:border-blue-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-6 -mt-6 transition-all group-hover:bg-blue-500/10"></div>
            <div className="flex items-center gap-5 mb-5">
              {/* Espaço para o seu SVG oficial */}
              <div className="relative shrink-0 transition-transform duration-500 group-hover:scale-110">
                <img
                  src="/img/microsoft-certified-associate-badge.svg"
                  alt="Microsoft Certified Associate"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">{t.microsoftCertified}</h4>
                <p className="text-lg font-bold text-cyan-950 leading-tight">{t.dataanalystassociate}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-blue-50 pt-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.examPL300}</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#f25022]"></div>
                <div className="w-2 h-2 bg-[#7fba00]"></div>
                <div className="w-2 h-2 bg-[#00a4ef]"></div>
                <div className="w-2 h-2 bg-[#ffb900]"></div>
              </div>
            </div>
          </div>

          {/* BOTÃO DE AÇÃO */}
          <button
            onClick={handleOpenPreview}
            disabled={loading}
            className="bg-cyan-950 text-white font-headline font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-cyan-700 transition-all duration-300 shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-70"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
            {t.downloadCV || "View Full Resume"}
          </button>
          <p className="text-center text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em] opacity-60">
            {t.availableRemote || "Available for Global Opportunities"}
          </p>
        </div>
      </header>

      {/* 2. IMPACT STATS SECTION */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-cyan-950 p-8 rounded-3xl text-white shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-300/70 mb-2">{t.expertise}</p>
          <h4 className="text-4xl font-headline font-extrabold mb-4">{t.fullStack}</h4>
          <p className="text-cyan-100/70 font-medium text-sm leading-relaxed">{t.fullStackDescription}</p>
        </div>
        <div className="bg-cyan-50 p-8 rounded-3xl border border-cyan-100 shadow-sm transition-colors hover:border-cyan-300">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-600 mb-2">{t.focus}</p>
          <h4 className="text-4xl font-headline font-extrabold text-cyan-950 mb-4">{t.precision}</h4>
          <p className="text-cyan-700 font-medium text-sm leading-relaxed">{t.precisionDescription}</p>
        </div>
        <div className="bg-cyan-200 p-8 rounded-3xl shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-800 mb-2">{t.commitment}</p>
          <h4 className="text-4xl font-headline font-extrabold text-cyan-900 mb-4">100%</h4>
          <p className="text-cyan-900/70 font-medium text-sm leading-relaxed">{t.commitmentDescription}</p>
        </div>
      </section>

      {/* 3. EXPERIENCE & ASIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">
              {t.experience}
            </h2>
            <span className="h-1 w-24 bg-cyan-100"></span>
          </div>

          <div className="space-y-20">
            <div className="group">
              <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-cyan-950 group-hover:text-cyan-600 transition-colors">
                Urbanizamos Incorporadora
              </h3>
              <p className="text-xl font-bold text-cyan-700 mt-1">
                {t.resumeExperienceRole} • <span className="text-cyan-600">{t.resumeExperiencePeriod}</span>
              </p>
              <ul className="mt-8 space-y-4">
                {(t.resumeExperienceAchievements || []).map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-lg leading-relaxed font-medium text-cyan-900">
                    <CheckCircle2 className="mt-1.5 shrink-0 text-cyan-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-16">
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-cyan-600 mb-8">{t.skills}</h2>
            <div className="flex flex-wrap gap-3">
              {(t.resumeSkills || []).map((skill, index) => (
                <span key={index} className="px-5 py-2.5 rounded-xl bg-white text-cyan-950 font-bold text-sm border border-cyan-100 shadow-sm hover:border-cyan-400 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-cyan-600 mb-8">{t.education}</h2>
            <div className="relative pl-6 border-l-2 border-cyan-100">
              <GraduationCap className="absolute -left-[11px] top-0 bg-[#f1fbfc] text-cyan-600" size={20} />
              <h3 className="text-xl font-headline font-extrabold text-cyan-950">UFG</h3>
              <p className="text-cyan-700 font-medium">{t.resumeEducation}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-cyan-600 mb-8">{t.achievements}</h2>
            <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm flex items-center gap-4 group">
              <img
                src="/img/microsoft-certified-associate-badge.svg"
                alt="PL-300 Badge"
                className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all"
              />
              <div>
                <h4 className="font-bold text-cyan-950 text-sm leading-tight">Advanced Analytics</h4>
                <p className="text-xs text-cyan-600 uppercase font-bold tracking-tighter">Microsoft PL-300</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. A ILHA DE VISUALIZAÇÃO (MODAL) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#001a28]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="w-full h-full max-w-6xl bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-cyan-950 px-8 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs font-black tracking-[0.3em] uppercase opacity-70">Curriculum Vitae Explorer</span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold hover:text-cyan-400 transition-colors"
                >
                  <ExternalLink size={16} /> <span className="hidden sm:inline">FULLSCREEN</span>
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white/10 hover:bg-red-500/20 hover:text-red-400 p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-200 relative">
              <iframe
                src={`${resumeUrl}#view=FitH`}
                title="Atelier Resume Preview"
                className="w-full h-full border-none shadow-inner"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}