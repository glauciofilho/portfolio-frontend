import { useEffect, useState, useMemo } from "react";
import { X, ChevronRight, FolderOpen, Terminal, RefreshCw, FileCode, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject, getFile, getProjects } from "../services/api"; // Certifique-se que getProjects existe no seu api.js
import FileTree from "./FileTree";

export default function VSCodeViewer({ projectId, onClose }) {
  const { lang, setLanguage, t } = useLanguage();
  
  const [allProjects, setAllProjects] = useState([]); // Lista para o seletor
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(projectId);

  const isOpen = Boolean(projectId);

  // Bloqueio de scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Carregar lista de todos os projetos para a lateral
  useEffect(() => {
    async function fetchAll() {
      try {
        const projects = await getProjects(lang);
        // Ordenação alfabética
        const sorted = projects.sort((a, b) => a.name.localeCompare(b.name));
        setAllProjects(sorted);
      } catch (err) {
        console.error("Erro ao carregar lista de projetos", err);
      }
    }
    fetchAll();
  }, [lang]);

  // Carregar dados do projeto selecionado
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

  // Montar árvore de arquivos
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
    <div className="fixed inset-0 z-50 bg-[#001a28]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
      
      <div className="w-full h-full bg-[#001a28] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/5">
        
        <div className="flex flex-1 overflow-hidden">
          
          {/* SIDEBAR: SELETOR DE PROJETOS E EXPLORER */}
          <aside className="w-64 bg-[#0a2f42] border-r border-white/5 flex flex-col shrink-0">
            
            {/* Header: Seletor de Projetos */}
            <div className="p-4 border-b border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-3">
                Switch Project
              </span>
              <select 
                value={currentProjectId}
                onChange={(e) => setCurrentProjectId(e.target.value)}
                className="w-full bg-[#001a28] text-white text-xs border border-white/10 rounded-lg p-2 outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {allProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Lista de Arquivos do Projeto Atual */}
            <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar">
              <div className="px-4 py-2 flex items-center gap-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Explorer
              </div>
              
              {loading ? (
                <div className="px-6 py-4 text-slate-500 text-xs animate-pulse">Loading files...</div>
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
                        setLoadingFile(true);
                        try {
                          const res = await getFile(data.project.id, fileNode.id, lang);
                          setFileContent(res.content);
                        } catch (err) { console.error(err); }
                        setLoadingFile(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* BOTÃO DE LINGUAGEM (Canto inferior esquerdo) */}
            <div className="p-4 border-t border-white/5 bg-[#0a2f42]">
              <button 
                onClick={() => setLanguage(lang === 'en' ? 'pt' : 'en')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-medium w-full"
              >
                <Globe size={14} />
                <span>{lang === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}</span>
                <span className="ml-auto bg-white/5 px-1.5 py-0.5 rounded text-[10px] uppercase">{lang}</span>
              </button>
            </div>
          </aside>

          {/* MAIN EDITOR AREA */}
          <main className="flex-1 flex flex-col relative bg-[#001a28]">
            
            {/* TABS BAR */}
            <header className="flex bg-[#0a2f42] h-10 border-b border-white/5 items-center justify-between pr-4">
              <div className="flex h-full">
                {activeFile && (
                  <div className="flex items-center px-4 gap-2 bg-[#001a28] border-t-2 border-cyan-300 h-full text-white">
                    <FileCode size={14} className="text-cyan-400" />
                    <span className="text-xs font-medium">{activeFile.name}</span>
                    <X size={12} className="ml-2 opacity-50 hover:opacity-100 cursor-pointer" onClick={() => setActiveFile(null)} />
                  </div>
                )}
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </header>

            {/* VIEWPORT */}
            <div className="flex-1 relative overflow-hidden bg-[#001a28]">
              {activeFile ? (
                fileContent ? (
                  <iframe
                    title="Preview"
                    srcDoc={fileContent}
                    className="w-full h-full bg-white"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                    <RefreshCw className="animate-spin mr-2" size={14} /> Compiling module...
                  </div>
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-4 opacity-30 select-none">
                  <Terminal size={64} />
                  <p className="font-mono text-xs tracking-[0.2em] uppercase">Workbench Idle</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}