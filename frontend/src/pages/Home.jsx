import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { CheckCircle2, Github, Linkedin, Mail, Database, BarChart3, Zap, GraduationCap, ArrowRight, MessageCircle, LayoutGrid } from "lucide-react";

export default function Home() {
  const { lang, t } = useLanguage();
  const [latestProjects, setLatestProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects(lang);
        setLatestProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar projetos na home", error);
      }
    }
    loadProjects();
  }, [lang]);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      {/* 1. HERO SECTION */}
      <header className="flex flex-col items-center text-center mb-32">
        <div className="relative mb-8">
          {/* FOTO DE PERFIL */}
          <div className="w-40 h-40 rounded-full bg-cyan-50 overflow-hidden border-4 border-white shadow-2xl">
            <img
              alt="Gláucio Filho"
              className="w-full h-full object-cover"
              src="/img/perfil.jpg"
            />
          </div>

          {/* BADGE MICROSOFT ASSOCIATE (O Selo Oficial) */}
          <div className="absolute bottom-0 right-0 w-14 h-14 bg-white rounded-full border-2 border-white shadow-xl overflow-hidden flex items-center justify-center transition-transform hover:scale-110 duration-300">
            <img
              src="/img/microsoft-certified-associate-badge.svg"
              alt="Microsoft Certified Associate"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-cyan-950 tracking-tighter mb-4">
          Gláucio Filho
        </h1>
        <p className="font-headline font-bold text-sm md:text-base text-cyan-600 tracking-[0.3em] uppercase mb-8">
          {t.homeTitle}
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-cyan-800 text-lg md:text-xl leading-relaxed mb-10">
            {t.about}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-cyan-900 font-semibold text-sm md:text-base">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-cyan-600" size={20} /> {t.experienceYears || "4+ Anos de Experiência"}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-cyan-600" size={20} /> {t.sqlPythonExpert || "SQL & Python Expert"}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-cyan-600" size={20} /> {t.biAutomation || "BI & Automação"}
            </li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex gap-4">
          <a href="https://github.com/glauciofilho" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/glaucio-filho/" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <Linkedin size={20} />
          </a>
          <a href="mailto:glauciofilho1997@gmail.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <Mail size={20} />
          </a>
          <a href="https://wa.me/5562996664343" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <MessageCircle size={20} />
          </a>
        </div>
      </header>

      {/* 2. FEATURED PROJECTS */}
      <section className="mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label text-cyan-600 text-xs font-bold tracking-widest uppercase">Portfolio</span>
            <h2 className="font-headline font-extrabold text-3xl text-cyan-950 mt-1">{t.projects}</h2>
          </div>
          {/* Botão desktop removido daqui */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {latestProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Botão Unificado (agora visível em todos os tamanhos) */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/projects"
            className="w-full max-w-md flex items-center justify-center gap-3 px-8 py-5 bg-cyan-950 text-white font-bold rounded-full shadow-xl hover:bg-cyan-800 active:scale-95 transition-all mx-auto"
          >
            <LayoutGrid size={20} />
            {t.viewAllProjects}
          </Link>
        </div>
      </section>

      {/* 3. CORE SKILLS */}
      <section className="mb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">{t.skills}</h2>
          <span className="h-1 w-24 bg-cyan-100"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-cyan-50 shadow-xl hover:shadow-2xl transition-all group">
            <Database className="text-cyan-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-headline font-bold text-xl text-cyan-950 mb-4">{t.dataEngineering}</h3>
            <ul className="space-y-3 text-cyan-800 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.etlEltPipelines}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.sqlAdvancedNoSQL}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.starSchemaModeling}</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cyan-50 shadow-xl hover:shadow-2xl transition-all group">
            <BarChart3 className="text-cyan-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-headline font-bold text-xl text-cyan-950 mb-4">{t.analysisViz}</h3>
            <ul className="space-y-3 text-cyan-800 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.powerBIDashboards}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.pythonPandasSeaborn}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.dataStorytelling}</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cyan-50 shadow-xl hover:shadow-2xl transition-all group">
            <Zap className="text-cyan-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-headline font-bold text-xl text-cyan-950 mb-4">{t.automation}</h3>
            <ul className="space-y-3 text-cyan-800 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.n8nProcesses}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.pythonScripts}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {t.apiIntegration}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. GRADUAÇÃO */}
      <section className="pt-16 border-t border-cyan-100">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-headline font-extrabold text-cyan-950 tracking-tight">{t.education}</h2>
          <span className="h-1 w-48 bg-cyan-100"></span>
        </div>
        <div className="bg-white border border-cyan-100 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6 group hover:border-cyan-400 transition-all">
          <div className="bg-cyan-50 p-4 rounded-2xl text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
            <GraduationCap size={40} />
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl font-headline font-extrabold text-cyan-950 mb-1">Universidade Federal de Goiás</h3>
            <p className="text-lg font-medium text-cyan-700 leading-relaxed">
              {t.resumeEducation}
            </p>
          </div>
          <Link to={`/${lang}/resume`} className="flex items-center gap-2 text-cyan-600 font-bold hover:gap-4 transition-all">
            {t.resume} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}