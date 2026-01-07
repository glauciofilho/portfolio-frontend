import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getProjects } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
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
  const [sortBy, setSortBy] = useState("date_desc"); // Padrão ajustado
  const [view, setView] = useState("grid");

  useEffect(() => {
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

    // Busca por nome
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por stacks (multi)
    if (selectedStacks.length > 0) {
      result = result.filter(p =>
        p.stacks.some(s => selectedStacks.includes(s.name))
      );
    }

    // Ordenação Atualizada (Item 6)
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
      <section className="pt-32 text-center text-cyan-400">
        {t.loadingProjects}
      </section>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">

        {/* HEADER */}
        <header className="text-center mb-14">
          <h1 className="text-4xl font-bold text-cyan-900 mb-4">
            {t.projects}
          </h1>
          <p className="max-w-2xl mx-auto text-cyan-600">
            {t.projectsDescription}
          </p>
        </header>

        {/* FILTER BAR */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-10">

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">

            {/* SEARCH (Mudado para primeiro para melhor UX mobile, ou manter ordem) */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-95 group-focus-within:text-cyan-950" size={18} />
              <input
                type="text"
                placeholder={t.searchProject}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg bg-cyan-50 border border-cyan-950 text-sm text-cyan-950 placeholder-cyan-950 outline-none focus:ring-2 focus:ring-cyan-950 focus:border-transparent transition-all"
              />
            </div>

            {/* STACK FILTER */}
            <StackFilter
              stacks={allStacks}
              selected={selectedStacks}
              onChange={setSelectedStacks}
            />

            {/* SORT */}
            <SortSelect value={sortBy} onChange={setSortBy} />

          </div>

          {/* VIEW TOGGLE */}
          <div className="hidden lg:block self-end lg:self-auto">
              <ViewToggle value={view} onChange={setView} />
          </div>

        </div>

        {/* PROJECTS GRID/LIST */}
        {filteredProjects.length > 0 ? (
          <div className= {view === "grid" ? ("grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8") : ("flex flex-col gap-4")}>
            {filteredProjects.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => setSelectedProjectId(p.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-cyan-900/50 rounded-2xl border border-cyan-800 border-dashed">
              <p className="text-cyan-50 font-medium"> {t.notfind}</p>
              <button
                  onClick={() => {
                      setSearch("");
                      setSelectedStacks([]);
                  }}
                  className="mt-4 text-cyan-50 hover:underline text-sm"
              >
                  {t.clearFilters}
              </button>
          </div>
        )}
      </section>

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