import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  X, 
  Terminal, 
  RefreshCw, 
  FileCode, 
  Home,
  LayoutGrid,
  Mail,
  Menu
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import FileTree from "../components/FileTree";
import LanguageSwitch from "../components/LanguageSwitch";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useProjectViewer } from "../hooks/useProjectViewer";

export default function View() {
  const { lang, setLang, t } = useLanguage();
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  
  const {
    allProjects,
    data,
    loading,
    activeFile,
    fileContent,
    currentProjectId,
    isSidebarOpen,
    setIsSidebarOpen,
    fileTree,
    handleProjectChange,
    handleSelectFile
  } = useProjectViewer(projectSlug, lang);

  return (
    <div className="h-screen w-full bg-[#001a28]/95 p-4 md:p-8 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-screen-2xl bg-[#001a28] rounded-2xl overflow-hidden flex shadow-2xl border border-white/5 relative">
        {/* Animated Morphing Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`
            absolute z-50 flex items-center justify-center text-cyan-400 hover:text-white focus:outline-none focus:ring-0 outline-none transition-all duration-1000 ease-in-out
            ${isSidebarOpen 
              ? 'top-[14px] left-[240px] w-8 h-8 bg-transparent rounded-lg hover:bg-white/5' 
              : 'top-0 left-0 w-10 h-10 hover:bg-[#001a28] border-r border-white/5'
            }
          `}
          title={isSidebarOpen ? t.closeMenu : t.openMenu}
        >
          <div className="relative w-[16px] h-[12px] flex flex-col justify-between">
            <span className={`block w-full h-[2px] bg-current rounded transform transition-all duration-1000 ${isSidebarOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`block w-full h-[2px] bg-current rounded transition-all duration-1000 ${isSidebarOpen ? 'opacity-0 translate-x-2' : ''}`} />
            <span className={`block w-full h-[2px] bg-current rounded transform transition-all duration-1000 ${isSidebarOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </div>
        </button>

        {/* Sidebar */}
        <aside className={`
          absolute lg:relative z-40 h-full w-72 bg-[#0a2f42] border-r border-white/5 flex flex-col shrink-0
          transition-transform duration-1000 ease-in-out
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
              <div className="px-6 py-4 text-slate-500 text-xs animate-pulse">{t.vscodeLoading}</div>
            ) : (
              <div className="pl-2">
                {fileTree.map(node => (
                  <FileTree
                    key={node.id}
                    node={node}
                    activeFileId={activeFile?.id}
                    onSelectFile={handleSelectFile}
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
              {/* Spacer for absolute toggle button when closed */}
              <div className={`shrink-0 transition-all duration-1000 ${isSidebarOpen ? 'w-0 border-transparent' : 'w-10 border-r border-white/5'}`} />

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
                  title={t.close}
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
                  <RefreshCw className="animate-spin mr-2" size={14} /> {t.rendering}
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
