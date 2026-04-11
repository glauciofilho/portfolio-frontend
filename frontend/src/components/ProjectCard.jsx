import React from "react";

export default function ProjectCard({ project, onClick }) {
  // Formatação da data (Ex: JAN 2024)
  const dateObj = new Date(project.created_at);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    month: "short",
    year: "numeric"
  }).toUpperCase();

  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden border border-cyan-100 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* IMAGEM DE CAPA DO PROJETO */}
      <div className="relative h-56 overflow-hidden bg-cyan-50 border-b border-cyan-50">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Placeholder enquanto você não tem as URLs de imagem no banco */
          <div className="w-full h-full flex items-center justify-center text-cyan-200 bg-gradient-to-br from-cyan-50 to-white group-hover:scale-105 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl">image</span>
          </div>
        )}
        {/* Opcional: Badge de "Live" ou "Novo" como no template HTML */}
        <div className="absolute top-4 right-4 bg-cyan-950 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          View Project
        </div>
      </div>

      {/* CONTEÚDO DO CARD */}
      <div className="p-8 flex flex-col flex-grow">
        {/* METADADOS */}
        <div className="flex justify-between items-start mb-3">
          <span className="font-label text-[10px] font-bold tracking-[0.1em] text-cyan-600 uppercase">
             Software Engineering
          </span>
          <span className="font-label text-[10px] text-cyan-500">
            {project.created_at ? formattedDate : ""}
          </span>
        </div>

        {/* TÍTULO E RESUMO */}
        <h3 className="text-xl font-bold text-cyan-950 mb-3 group-hover:text-cyan-700 transition-colors">
          {project.name}
        </h3>
        <p className="text-cyan-700 text-sm leading-relaxed mb-6 flex-grow">
          {project.summary}
        </p>

        {/* STACKS (RETORNADO OS BADGES ORIGINAIS) */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-cyan-50">
          {project.stacks?.map((stack) => (
            <img
              key={stack.id}
              src={stack.badge_url}
              alt={stack.name}
              title={stack.name}
              className="h-5 opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>

      </div>
    </article>
  );
}