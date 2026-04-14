import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Home, ArrowLeft, TerminalSquare } from "lucide-react";

export default function NotFound() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 relative overflow-hidden">
      {/* Efeito de Fundo (Blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-cyan-300/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Ícone Minimalista */}
      <div className="bg-cyan-50 p-5 rounded-3xl text-cyan-600 mb-8 shadow-sm border border-cyan-100 transition-transform hover:scale-105 duration-300">
        <TerminalSquare size={48} strokeWidth={1.5} />
      </div>

      <span className="font-label text-cyan-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
        {t.error404 || "Error 404"}
      </span>

      <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-cyan-950 tracking-tighter mb-6">
        {t.notFoundTitle || "Página não encontrada."}
      </h1>

      <p className="text-cyan-800 text-lg md:text-xl font-medium max-w-lg mb-12 leading-relaxed">
        {t.notFoundDesc || "A rota que você tentou acessar não existe, foi movida ou você não tem permissão de acesso."}
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
        {/* Voltar para a página anterior */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-cyan-800 font-bold rounded-2xl border border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
          {t.goBack || "Voltar"}
        </button>

        {/* Voltar para a Home (usando a linguagem correta da URL) */}
        <Link
          to={`/${lang}`}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-cyan-950 text-white font-bold rounded-2xl shadow-xl hover:bg-cyan-800 active:scale-95 transition-all"
        >
          <Home size={20} />
          {t.goHome || "Página Inicial"}
        </Link>
      </div>
    </main>
  );
}