import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Terminal, 
  RefreshCw, 
  FileCode, 
  Globe, 
  Home,
  LayoutGrid,
  Mail,
  Menu
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject, getFile, getProjects } from "../services/api";
import FileTree from "../components/FileTree";
import LanguageSwitch from "../components/LanguageSwitch";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { slugify } from "../utils/slugify";

export default function View() {
  const { lang, setLang, t } = useLanguage();
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  
  const [allProjects, setAllProjects] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const projects = await getProjects(lang);
        const sorted = projects.sort((a, b) => a.name.localeCompare(b.name));
        setAllProjects(sorted);
        
        const match = sorted.find(p => slugify(p.name) === projectSlug);
        if (match) {
          setCurrentProjectId(match.id);
        }
      } catch (err) {
        console.error("Erro ao carregar lista de projetos", err);
      }
    }
    fetchAll();
  }, [lang, projectSlug]);

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

        const readmeFile = result.files.find(f =>
          f.path.toLowerCase() === "readme.md" || f.path.toLowerCase() === "readme"
        );

        if (readmeFile) {
          const fileNode = { id: readmeFile.id, name: readmeFile.path, type: "file" };
          setActiveFile(fileNode);
          const res = await getFile(currentProjectId, readmeFile.id, lang);
          setFileContent(res.content);
        }

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

    const sortNodes = (nodes) => {
      nodes.sort((a, b) => {
        if (a.type === "folder" && b.type === "file") return -1;
        if (a.type === "file" && b.type === "folder") return 1;
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });
      nodes.forEach(node => { if (node.children) sortNodes(node.children); });
      return nodes;
    };

    return sortNodes(root);
  }, [data]);

  const handleProjectChange = (e) => {
    const id = e.target.value;
    const project = allProjects.find(p => p.id === parseInt(id));
    if (project) {
      navigate(`/${lang}/view/${slugify(project.name)}`);
    }
  };

  return (
    <div className="h-screen w-full bg-[#001a28]/95 p-4 md:p-8 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-screen-2xl bg-[#001a28] rounded-2xl overflow-hidden flex shadow-2xl border border-white/5 relative">
        {/* Sidebar */}
        <aside className={`
          absolute lg:relative z-40 h-full w-72 bg-[#0a2f42] border-r border-white/5 flex flex-col shrink-0
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}>
          {/* Menu acima do seletor de projetos */}
          <div className="p-4 border-b border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                  <span className="px-4 py-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase opacity-70">
                      {t.navigation}
                  </span>
              </div>
              <div className="grid grid-cols-1 gap-2 justify-center">
                  <Link 
                      to={`/${lang}`} 
                      className="flex items-center gap-2 p-2 bg-[#001a28] border border-white/5 rounded-lg text-cyan-300 hover:text-white transition-colors text-xs font-bold"
                  >
                      <Home size={14} />
                      <span>{t.home}</span>
                  </Link>
                  <Link 
                      to={`/${lang}/resume`} 
                      className="flex items-center gap-2 p-2 bg-[#001a28] border border-white/5 rounded-lg text-cyan-300 hover:text-white transition-colors text-xs font-bold"
                  >
                      <FileCode size={14} />
                      <span>{t.resume}</span>
                  </Link>
                  <Link 
                      to={`/${lang}/projects`} 
                      className="flex items-center gap-2 p-2 bg-[#001a28] border border-white/5 rounded-lg text-cyan-300 hover:text-white transition-colors text-xs font-bold"
                  >
                      <LayoutGrid size={14} />
                      <span>{t.projects}</span>
                  </Link>
                  <Link 
                      to={`/${lang}/contact`} 
                      className="flex items-center gap-2 p-2 bg-[#001a28] border border-white/5 rounded-lg text-cyan-300 hover:text-white transition-colors text-xs font-bold"
                  >
                      <Mail size={14} />
                      <span>{t.contact}</span>
                  </Link>
                  <div className="flex justify-center mt-2">
                    <LanguageSwitch
                        lang={lang}
                        onToggle={() => setLang(lang === 'en' ? 'pt' : 'en')}
                    />
                  </div>
              </div>
          </div>

          <div className="p-4 border-b border-white/5 flex flex-col gap-1">
            <span className="px-4 py-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase opacity-70">
              {t.switchproject}
            </span>
            <select
              value={currentProjectId || ""}
              onChange={handleProjectChange}
              className="w-full bg-[#001a28] text-white text-xs border border-white/10 rounded-lg p-2 pr-8 outline-none truncate appearance-none relative"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1rem',
              }}
            >
              <option value="" disabled>{t.switchproject}</option>
              {allProjects.map(p => (
                <option key={p.id} value={p.id} className="bg-[#0a2f42] text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar">
            <div className="px-4 py-2 text-cyan-300 text-[10px] font-bold tracking-widest uppercase opacity-70">
              {t.explorer}
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative bg-[#001a28] min-w-0">
          <header className="flex bg-[#0a2f42] h-10 border-b border-white/5 items-center justify-between pr-4 shrink-0 overflow-hidden">
            <div className="flex h-full items-center overflow-x-auto no-scrollbar">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="h-full px-3 text-cyan-400 hover:bg-[#001a28] transition-colors border-r border-white/5"
                title={isSidebarOpen ? "Close Menu" : "Open Menu"}
              >
                {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              {activeFile && (
                <div className="flex items-center px-4 gap-2 bg-[#001a28] border-t-2 border-cyan-300 h-full text-white min-w-max">
                  <FileCode size={14} className="text-cyan-400" />
                  <span className="text-xs font-medium">{activeFile.name}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              {data?.project && (
                  <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">
                      {data.project.name}
                  </h2>
              )}
              <button 
                  onClick={() => navigate(`/${lang}/projects`)} 
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  title="Close"
              >
                  <X size={20} />
              </button>
            </div>
          </header>

          <div className="flex-1 relative overflow-y-auto bg-[#001a28] custom-scrollbar">
            {activeFile ? (
              fileContent ? (
                <div className="p-4 md:p-8 w-full flex justify-center h-full">
                  <div className="prose prose-invert prose-cyan max-w-none w-full h-full">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {fileContent}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                  <RefreshCw className="animate-spin mr-2" size={14} /> Rendering...
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
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden absolute inset-0 bg-black/60 z-30 backdrop-blur-[2px]"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
