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
  LayoutGrid
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject, getFile, getProjects } from "../services/api";
import FileTree from "../components/FileTree";
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

  // Fetch all projects to find the ID from slug
  useEffect(() => {
    async function fetchAll() {
      try {
        const projects = await getProjects(lang);
        const sorted = projects.sort((a, b) => a.name.localeCompare(b.name));
        setAllProjects(sorted);
        
        const match = sorted.find(p => slugify(p.name) === projectSlug);
        if (match) {
          setCurrentProjectId(match.id);
        } else if (sorted.length > 0 && !projectSlug) {
          // If no slug, or invalid slug, redirect to first project if possible
          // or just show empty state. 
          // For now let's just use the match.
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
    <div className="flex h-screen w-full bg-cyan-50 text-cyan-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-40 h-full w-72 bg-white border-r border-cyan-100 flex flex-col shrink-0
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}
      `}>
        {/* Menu acima do seletor de projetos */}
        <div className="p-4 border-b border-cyan-100 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-cyan-700 uppercase">
                    Navigation
                </span>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-cyan-600">
                    <ChevronLeft size={20} />
                </button>
            </div>
            <div className="flex gap-2">
                <Link 
                    to={`/${lang}`} 
                    className="p-2 bg-white border border-cyan-100 rounded-lg text-cyan-600 hover:bg-cyan-100 transition-colors"
                    title="Home"
                >
                    <Home size={18} />
                </Link>
                <Link 
                    to={`/${lang}/projects`} 
                    className="p-2 bg-white border border-cyan-100 rounded-lg text-cyan-600 hover:bg-cyan-100 transition-colors"
                    title="Projects"
                >
                    <LayoutGrid size={18} />
                </Link>
                <button
                    onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-white border border-cyan-100 rounded-lg text-cyan-600 hover:bg-cyan-100 transition-colors text-xs font-bold"
                >
                    <Globe size={16} />
                    <span>{lang.toUpperCase()}</span>
                </button>
            </div>
        </div>

        <div className="p-4 border-b border-cyan-100 flex flex-col gap-1">
          <span className="text-[10px] font-bold tracking-widest text-cyan-700 uppercase">
            {t.switchproject}
          </span>
          <select
            value={currentProjectId || ""}
            onChange={handleProjectChange}
            className="w-full bg-white text-cyan-900 text-sm border border-cyan-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="" disabled>Select a project</option>
            {allProjects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar">
          <div className="px-4 py-2 text-cyan-800 text-[10px] font-bold tracking-widest uppercase opacity-70">
            Explorer
          </div>

          {loading ? (
            <div className="px-6 py-4 text-cyan-400 text-xs animate-pulse">Loading...</div>
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
                  // Note: Customizing FileTree colors might require props or global CSS changes if it uses hardcoded dark colors
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-cyan-50 min-w-0">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-0 top-4 z-40 bg-cyan-600 text-white p-2 rounded-r-xl shadow-lg lg:flex items-center gap-2"
          >
            <ChevronRight size={20} />
            <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider pr-1">Explorer</span>
          </button>
        )}

        <header className="flex bg-white h-12 border-b border-cyan-100 items-center justify-between pr-4 shrink-0">
          <div className="flex h-full overflow-x-auto no-scrollbar">
            {activeFile && (
              <div className="flex items-center px-4 gap-2 bg-cyan-50 border-b-2 border-cyan-500 h-full text-cyan-900 min-w-max">
                <FileCode size={14} className="text-cyan-600" />
                <span className="text-xs font-bold">{activeFile.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {data?.project && (
                <h2 className="text-xs font-bold text-cyan-800 uppercase tracking-widest hidden md:block">
                    {data.project.name}
                </h2>
            )}
            <button 
                onClick={() => navigate(`/${lang}/projects`)} 
                className="text-cyan-400 hover:text-cyan-600 transition-colors p-1"
                title="Close and return to projects"
            >
                <X size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 relative overflow-y-auto bg-white custom-scrollbar mt-4 mx-4 mb-4 rounded-xl border border-cyan-100 shadow-sm">
          {activeFile ? (
            fileContent ? (
              <div className="p-4 md:p-8 w-full flex justify-center h-full">
                <div className="prose prose-cyan max-w-none w-full h-full text-cyan-950">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {fileContent}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-cyan-400 font-mono text-xs">
                <RefreshCw className="animate-spin mr-2" size={14} /> Rendering Content...
              </div>
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-cyan-200 gap-4 select-none">
              <Terminal size={64} />
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-400 font-bold">{t.readyforinspection}</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-cyan-950/20 z-30 backdrop-blur-[2px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
