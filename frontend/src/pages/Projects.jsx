import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getProjects } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../analytics/ga";
import ProjectCard from "../components/ProjectCard";
import StackFilter from "../components/StackFilter";
import SortSelect from "../components/SortSelect";
import ViewToggle from "../components/ViewToggle";
import VSCodeViewer from "../components/VSCodeViewer";

export default function Projects() {
  const { lang, t } = useLanguage();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [sortBy, setSortBy] = useState("date_desc");
  const [view, setView] = useState("grid");

  useEffect(() => {
    trackEvent("view_projects", {languageCode: lang});
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      try {
        const data = await getProjects(lang, controller.signal);
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
    return () => controller.abort();
  }, [lang]);

  const allStacks = useMemo(() => {
    const stacks = new Set();
    projects.forEach(p =>
      p.stacks.forEach(s => stacks.add(s.name))
    );
    return Array.from(stacks).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedStacks.length > 0) {
      result = result.filter(p =>
        p.stacks.some(s => selectedStacks.includes(s.name))
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      switch (sortBy) {
        case "name_asc":
          return nameA.localeCompare(nameB);
        case "name_desc":
          return nameB.localeCompare(nameA);
        case "date_asc":
          return dateA - dateB;
        case "date_desc":
        default:
          return dateB - dateA;
      }
    });

    return result;
  }, [projects, search, selectedStacks, sortBy]);

  if (loading) {
    return (
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6 text-center text-cyan-600 animate-pulse font-medium">
        {t.loadingProjects}
      </section>
    );
  }

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* HEADER (Estilo Editorial) */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-950 tracking-tight mb-4">
            {t.projects}
          </h1>
          <p className="text-cyan-700 max-w-2xl text-lg leading-relaxed">
            {t.projectsDescription}
          </p>
        </header>

        {/* FILTERS BAR (Visual Hub Curado) */}
        <section className="bg-cyan-50/50 border border-cyan-100 p-4 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center">
          {/* BARRA DE PESQUISA */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600" size={20} />
            <input
              type="text"
              placeholder={t.searchProject}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-cyan-100 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 outline-none text-cyan-950 transition-all shadow-sm"
            />
          </div>

          {/* COMPONENTES DE FILTRO E ORDENAÇÃO */}
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {/* Como os seus StackFilter e SortSelect são componentes filhos,
                eles devem assumir o visual dessa barra branca com sombra leve
                Para ficar perfeito, o ideal seria que os selects dentro deles
                tivessem classes como: bg-white border border-cyan-100 rounded-xl py-3 px-4 */}
            <StackFilter
              stacks={allStacks}
              selected={selectedStacks}
              onChange={setSelectedStacks}
            />

            <SortSelect value={sortBy} onChange={setSortBy} />
            {/* O toggle de view só aparece em telas grandes */}
            <div className="hidden lg:flex items-center">
              <ViewToggle value={view} onChange={setView} />
            </div>
          </div>
        </section>

        {/* PROJECT GRID */}
        {filteredProjects.length > 0 ? (
          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
            {filteredProjects.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => {
                  trackEvent("open_project", {
                    project_id: p.id,
                    project_name: p.name,
                    languageCode: lang,
                  });
                  setSelectedProjectId(p.id);
                }}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE (Quando a busca não encontra nada) */
          <div className="text-center py-20 bg-cyan-50 rounded-2xl border border-cyan-200 border-dashed">
            <p className="text-cyan-700 font-medium mb-4">{t.notfind}</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedStacks([]);
              }}
              className="px-6 py-2 bg-white text-cyan-800 border border-cyan-200 rounded-xl hover:bg-cyan-100 transition-colors text-sm font-semibold shadow-sm"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </main>

      {/* MODAL / VIEWER EM TELA CHEIA */}
      {selectedProjectId && (
        <VSCodeViewer
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </>
  );
}