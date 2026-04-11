import { useEffect, useState, useMemo } from "react";
import { X, ChevronRight, ChevronLeft, Terminal, RefreshCw, FileCode, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject, getFile, getProjects } from "../services/api";
import FileTree from "./FileTree";

export default function VSCodeViewer({ projectId, onClose }) {
  // 1. Corrigido para setLang (seu Contexto usa setLang)
  const { lang, setLang, t } = useLanguage();
  const [allProjects, setAllProjects] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(projectId);
  // Controle da barra lateral para mobile/tablet
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isOpen = Boolean(projectId);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const projects = await getProjects(lang);
        const sorted = projects.sort((a, b) => a.name.localeCompare(b.name));
        setAllProjects(sorted);
      } catch (err) {
        console.error("Erro ao carregar lista de projetos", err);
      }
    }
    fetchAll();
  }, [lang]);

  useEffect(() => {
    if (!currentProjectId) return;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        const result = await getOneProject(currentProjectId, lang, controller.signal);
        setData(result);
        setActiveFile(null);
        setFileContent(null);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [currentProjectId, lang]);

  const fileTree = useMemo(() => {
    if (!data?.files) return [];
    const root = [];
    data.files.forEach(file => {
      const parts = file.path.split("/");
      let current = root;
      parts.forEach((part, idx) => {
        const isFile = idx === parts.length - 1;
        let existing = current.find(n => n.name === part);
        if (!existing) {
          existing = {
            id: isFile ? file.id : `folder-${part}`,
            name: part,
            type: isFile ? "file" : "folder",
            children: isFile ? null : []
          };
          current.push(existing);
        }
        if (!isFile) current = existing.children;
      });
    });
    return root;
  }, [data]);

  if (!isOpen) return null;

  return (
    // Backdrop com Padding constante (Garante o efeito de "Ilha")
    <div className="fixed inset-0 z-50 bg-[#001a28]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">

      {/* CONTAINER DA ILHA */}
      <div className="w-full h-full max-w-7xl bg-[#001a28] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/5 relative">

        <div className="flex flex-1 overflow-hidden relative">

          {/* BOTÃO DE SETA (Trigger da Gaveta) - Visível apenas em telas < lg e quando fechado */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-cyan-600/90 text-white p-2 rounded-r-xl shadow-lg hover:bg-cyan-500 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* SIDEBAR (ESTILO GAVETA EM TELAS PEQUENAS) */}
          <aside className={`
            absolute lg:relative z-40 h-full w-64 bg-[#0a2f42] border-r border-white/5 flex flex-col shrink-0
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>

            {/* Header Sidebar com Fechar (Mobile) */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {t.switchproject}
              </span>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                <ChevronLeft size={20} />
              </button>
            </div>

            {/* Select de Projetos */}
            <div className="px-4 py-3">
              <select
                value={currentProjectId}
                onChange={(e) => setCurrentProjectId(e.target.value)}
                className="w-full bg-[#001a28] text-white text-xs border border-white/10 rounded-lg p-2 outline-none cursor-pointer hover:border-cyan-500/50 transition-colors"
              >
                {allProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Explorer com Scroll */}
            <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar">
              <div className="px-4 py-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Explorer
              </div>

              {loading ? (
                <div className="px-6 py-4 text-slate-500 text-xs animate-pulse">Loading...</div>
              ) : (
                <div className="pl-2">
                  {fileTree.map(node => (
                    <FileTree
                      key={node.id}
                      node={node}
                      activeFileId={activeFile?.id}
                      onSelectFile={async fileNode => {
                        setActiveFile(fileNode);
                        setFileContent(null);
                        // No mobile/tablet, fecha a gaveta ao selecionar
                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                        try {
                          const res = await getFile(data.project.id, fileNode.id, lang);
                          setFileContent(res.content);
                        } catch (err) { console.error(err); }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* MUDANÇA DE LINGUAGEM (Bottom Left) */}
            <div className="p-4 border-t border-white/5 bg-[#0a2f42]">
              <button
                onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-medium w-full group"
              >
                <Globe size={14} className="group-hover:text-cyan-400 transition-colors" />
                <span>{lang === 'en' ? 'Português' : 'English'}</span>
                <span className="ml-auto bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">{lang}</span>
              </button>
            </div>
          </aside>

          {/* OVERLAY PARA FECHAR (Mobile) */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-[2px]"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* ÁREA PRINCIPAL DO EDITOR */}
          <main className="flex-1 flex flex-col relative bg-[#001a28]">
            <header className="flex bg-[#0a2f42] h-10 border-b border-white/5 items-center justify-between pr-4">
              <div className="flex h-full overflow-x-auto no-scrollbar">
                {activeFile && (
                  <div className="flex items-center px-4 gap-2 bg-[#001a28] border-t-2 border-cyan-300 h-full text-white min-w-max">
                    <FileCode size={14} className="text-cyan-400" />
                    <span className="text-xs font-medium">{activeFile.name}</span>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 relative overflow-hidden bg-[#001a28]">
              {activeFile ? (
                fileContent ? (
                  <iframe title="Code Preview" srcDoc={fileContent} className="w-full h-full bg-white" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                    <RefreshCw className="animate-spin mr-2" size={14} /> Compiling...
                  </div>
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-4 opacity-30 select-none">
                  <Terminal size={64} />
                  <p className="font-mono text-xs tracking-[0.2em] uppercase">{t.readyforinspection}</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}