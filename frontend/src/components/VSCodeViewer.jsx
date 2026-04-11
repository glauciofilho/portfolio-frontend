import { useEffect, useState, useMemo } from "react";
import { X, ChevronRight, ChevronLeft, Terminal, RefreshCw, FileCode, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject, getFile, getProjects } from "../services/api";
import FileTree from "./FileTree";

export default function VSCodeViewer({ projectId, onClose }) {
  // Corrigido para setLang conforme seu LanguageContext
  const { lang, setLang, t } = useLanguage();
  
  const [allProjects, setAllProjects] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(projectId);
  
  // Estado para controlar a barra lateral em dispositivos móveis
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
    <div className="fixed inset-0 z-50 bg-[#001a28]/80 backdrop-blur-md flex items-center justify-center p-0 md:p-8">
      
      <div className="w-full h-full bg-[#001a28] md:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/5">
        
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* BOTÃO DE SETA PARA MOBILE (Aparece quando o menu está fechado) */}
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-cyan-600 text-white p-2 rounded-r-xl shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* SIDEBAR */}
          <aside className={`
            absolute md:relative z-30 h-full w-64 bg-[#0a2f42] border-r border-white/5 flex flex-col shrink-0
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            
            {/* Header Sidebar com botão de fechar para mobile */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
                  Switch Project
                </span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400">
                <ChevronLeft size={20} />
              </button>
            </div>

            {/* Select de Projetos */}
            <div className="px-4 pb-4">
              <select 
                value={currentProjectId}
                onChange={(e) => setCurrentProjectId(e.target.value)}
                className="w-full bg-[#001a28] text-white text-xs border border-white/10 rounded-lg p-2 outline-none"
              >
                {allProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Explorer */}
            <div className="flex-1 overflow-y-auto pt-2">
              <div className="px-4 py-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Explorer
              </div>
              
              {loading ? (
                <div className="px-6 py-4 text-slate-500 text-xs">Loading...</div>
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
                        // No mobile, fecha a sidebar ao selecionar um arquivo para ver o código
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
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

            {/* BOTÃO DE LINGUAGEM - Agora usando setLang corretamente */}
            <div className="p-4 border-t border-white/5 bg-[#0a2f42]">
              <button 
                onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-medium w-full"
              >
                <Globe size={14} />
                <span>{lang === 'en' ? 'Português' : 'English'}</span>
                <span className="ml-auto bg-white/5 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-cyan-400">{lang}</span>
              </button>
            </div>
          </aside>

          {/* Overlay para fechar o menu ao clicar fora no mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/40 z-20 md:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* MAIN EDITOR AREA */}
          <main className="flex-1 flex flex-col relative bg-[#001a28]">
            <header className="flex bg-[#0a2f42] h-10 border-b border-white/5 items-center justify-between pr-4">
              <div className="flex h-full">
                {activeFile && (
                  <div className="flex items-center px-4 gap-2 bg-[#001a28] border-t-2 border-cyan-300 h-full text-white">
                    <FileCode size={14} className="text-cyan-400" />
                    <span className="text-xs font-medium">{activeFile.name}</span>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 relative overflow-hidden bg-[#001a28]">
              {activeFile ? (
                fileContent ? (
                  <iframe title="Preview" srcDoc={fileContent} className="w-full h-full bg-white" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                    <RefreshCw className="animate-spin mr-2" size={14} /> Loading...
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