import { useLanguage } from "../../context/LanguageContext";

export default function ProjectsRanking({ projects }) {
  const { t, lang } = useLanguage();
  if (!projects?.length) {
    return <p className="text-sm text-zinc-500">{t.noData}</p>;
  }

  const nameField = lang == "pt" ? "name_pt" : "name_en";

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="flex items-center justify-between bg-[#252526] rounded-lg px-4 py-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm">#{index + 1}</span>
            <span className="text-white text-sm font-medium">
              {project[nameField]}
            </span>
          </div>

          <span className="text-cyan-400 text-sm font-mono">
            {project.total} acessos
          </span>
        </div>
      ))}
    </div>
  );
}
