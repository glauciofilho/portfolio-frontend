import React from "react";

export default function ProjectCard({ project, onClick }) {
  // Cria uma data legível, como "OUT 2023" (adaptando para o idioma local)
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
      {/* IMAGEM (Se não tiver imagem ainda, mostra um fundo neutro) */}
      <div className="relative h-56 overflow-hidden bg-cyan-50 border-b border-cyan-50">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cyan-300 font-medium tracking-widest text-sm group-hover:scale-105 transition-transform duration-500">
            [ SEM IMAGEM ]
          </div>
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="p-8 flex flex-col flex-grow">
        
        {/* HEADER DO CARD (Categoria + Data) */}
        <div className="flex justify-between items-start mb-3">
          <span className="font-label text-[10px] font-bold tracking-[0.1em] text-cyan-600 uppercase">
            Projeto
          </span>
          <span className="font-label text-[10px] text-cyan-500">
            {project.created_at ? formattedDate : ""}
          </span>
        </div>

        {/* TÍTULO & RESUMO */}
        <h3 className="text-xl font-bold text-cyan-950 mb-3 group-hover:text-cyan-700 transition-colors">
          {project.name}
        </h3>
        
        <p className="text-cyan-700 text-sm leading-relaxed mb-6 flex-grow">
          {project.summary}
        </p>

        {/* STACKS (Agora como tags em formato de pílula em vez de imagens, conforme o novo design) */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-cyan-50">
          {project.stacks?.map((stack) => (
            <span
              key={stack.id}
              className="px-3 py-1 bg-cyan-50 text-cyan-800 text-[11px] font-semibold rounded-full border border-cyan-100/50"
            >
              {stack.name}
            </span>
          ))}
        </div>

      </div>
    </article>
  );
}