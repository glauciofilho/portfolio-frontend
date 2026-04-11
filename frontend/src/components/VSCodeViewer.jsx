import { useEffect, useState, useMemo } from "react";
import {
  X, Files, Search, GitBranch, LayoutGrid, Settings,
  UserCircle, ChevronRight, FolderOpen, Terminal,
  AlertCircle, Bell, RefreshCw, FileCode
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject, getFile } from "../services/api";
import FileTree from "./FileTree";

export default function VSCodeViewer({ projectId, onClose }) {
  const { lang, t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const isOpen = Boolean(projectId);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const result = await getOneProject(projectId, lang, controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [projectId, lang]);

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

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#001a28]/90 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="text-cyan-400 animate-spin" size={32} />
          <span className="text-cyan-100 font-mono text-sm tracking-widest uppercase">Initializing Atelier OS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#001a28]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">

      {/* APP SHELL (VS CODE LAYOUT) */}
      <div className="w-full h-full bg-[#001a28] rounded-2xl overflow-hidden flex flex-col shadow-[0px_20px_50px_rgba(0,0,0,0.5)] border border-white/5">

        <div className="flex flex-1 overflow-hidden">

          {/* 1. ACTIVITY BAR (Far Left) */}
          <aside className="w-12 md:w-16 bg-[#0a2f42] border-r border-white/5 flex flex-col items-center py-4 gap-4 shrink-0">
            <div className="p-2 text-white border-l-2 border-cyan-300 bg-white/5">
              <Files size={24} />
            </div>
            <div className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
              <Search size={24} />
            </div>
            <div className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
              <GitBranch size={24} />
            </div>
            <div className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
              <LayoutGrid size={24} />
            </div>
            <div className="mt-auto flex flex-col gap-4 mb-2">
              <UserCircle size={24} className="text-slate-500" />
              <Settings size={24} className="text-slate-500" />
            </div>
          </aside>

          {/* 2. EXPLORER SIDEBAR */}
          <aside className="w-56 md:w-64 bg-[#0a2f42] border-r border-white/5 hidden sm:flex flex-col">
            <div className="h-10 px-4 flex items-center justify-between border-b border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Explorer</span>
              <X size={14} className="text-slate-500 cursor-pointer hover:text-white" onClick={onClose} />
            </div>

            <div className="flex-1 overflow-y-auto pt-2">
              <div className="px-4 py-1 flex items-center gap-2 text-white text-sm font-semibold mb-1">
                <ChevronRight size={14} className="text-slate-500" />
                <span>{data?.project?.name?.toUpperCase()}</span>
              </div>

              <div className="pl-2">
                {fileTree.map(node => (
                  <FileTree
                    key={node.id}
                    node={node}
                    activeFileId={activeFile?.id}
                    onSelectFile={async fileNode => {
                      setActiveFile(fileNode);
                      setFileContent(null);
                      try {
                        const res = await getFile(data.project.id, fileNode.id, lang);
                        setFileContent(res.content);
                      } catch (err) { console.error(err); }
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* 3. MAIN CONTENT AREA */}
          <main className="flex-1 flex flex-col relative bg-[#001a28]">

            {/* TABS BAR */}
            <header className="flex bg-[#0a2f42] h-10 border-b border-white/5">
              {activeFile && (
                <div className="flex items-center px-4 gap-2 bg-[#001a28] border-t-2 border-cyan-300 h-full text-white">
                  <FileCode size={14} className="text-cyan-400" />
                  <span className="text-xs font-medium">{activeFile.name}</span>
                  <X size={12} className="ml-2 opacity-50 hover:opacity-100 cursor-pointer" onClick={() => setActiveFile(null)} />
                </div>
              )}
              <div className="ml-auto flex items-center px-4">
                 <X size={20} className="text-slate-400 hover:text-red-400 cursor-pointer" onClick={onClose} />
              </div>
            </header>

            {/* EDITOR / PREVIEW */}
            <div className="flex-1 relative overflow-hidden">
              {activeFile ? (
                fileContent ? (
                  <iframe
                    title="Atelier Preview"
                    srcDoc={fileContent}
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full bg-white"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-sm">
                    <RefreshCw className="animate-spin mr-2" size={16} /> {t.vscodeLoading}
                  </div>
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                  <Terminal size={48} className="opacity-20" />
                  <p className="font-mono text-sm opacity-40 select-none tracking-widest uppercase">Select a module to inspect</p>
                </div>
              )}

              {/* 4. FLOATING PREVIEW CARD (EDITORIAL DETAIL) */}
              <div className="absolute bottom-6 right-6 w-72 md:w-80 bg-white rounded-2xl shadow-2xl p-6 border border-cyan-100/20 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0a2f42] flex items-center justify-center text-cyan-300 shadow-inner">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#001a28] text-sm leading-none mb-1">{data?.project?.name}</h3>
                    <p className="text-[9px] text-cyan-600 tracking-wider uppercase font-bold">Precision Architecture</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed line-clamp-3">
                  {data?.project?.summary}
                </p>

                {/* STACKS BADGES */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {data?.project?.stacks?.map(stack => (
                    <img
                      key={stack.id}
                      src={stack.badge_url}
                      alt={stack.name}
                      className="h-4 opacity-80"
                    />
                  ))}
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-[#0a2f42] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#006781] transition-colors flex items-center justify-center gap-2"
                >
                  Close Workbench
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* 5. STATUS BAR (Bottom) */}
        <footer className="bg-[#006781] text-white px-4 h-6 flex items-center justify-between text-[10px] font-medium shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 hover:bg-white/10 px-2 h-full cursor-pointer">
              <GitBranch size={12} />
              <span>main*</span>
            </div>
            <div className="flex items-center gap-3 hover:bg-white/10 px-2 h-full cursor-pointer">
              <div className="flex items-center gap-1">
                <AlertCircle size={12} /> <span>0</span>
              </div>
              <div className="flex items-center gap-1">
                <Bell size={12} /> <span>2</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 h-full">
            <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer">Language: {lang.toUpperCase()}</div>
            <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer">UTF-8</div>
            <div className="hover:bg-white/10 px-2 h-full flex items-center cursor-pointer">Atelier v1.0.4</div>
          </div>
        </footer>
      </div>
    </div>
  );
}