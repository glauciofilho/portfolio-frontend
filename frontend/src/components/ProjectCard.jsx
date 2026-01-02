export default function ProjectCard({ project, onClick}) {
  return (
    <div
      onClick={onClick}
      className="group bg-cyan-50 hover:bg-cyan-900 border border-cyan-800 rounded-2xl p-6
                 hover:border-cyan-100 hover:-translate-y-1 transition-all"
    >
      <h2 className="text-2xl font-semibold text-cyan-800 mb-3 group-hover:text-white">
        {project.name}
      </h2>

      <p className=" text-sky-800 group-hover:text-white text-sm mb-6 leading-relaxed">
        {project.summary}
      </p>

      {/* STACKS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stacks?.map((stack) => (
          <img
            key={stack.id}
            src={stack.badge_url}
            alt={stack.name}
            title={stack.name}
            className="h-5"
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-xs text-cyan-800 mb-3 group-hover:text-white">
        {project.created_at &&
          new Date(project.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}