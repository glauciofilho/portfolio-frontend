import { useEffect, useState, useMemo } from "react";
import { X, Files } from "lucide-react";
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

  // 🔒 Bloqueia scroll somente quando aberto
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // 🔄 Carrega projeto
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

  // 🌳 Monta árvore de arquivos
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
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <span className="text-cyan-400 font-mono">Loading VS Code...</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">

      {/* CONTAINER */}
      <div className="w-[90vw] h-[90vh] bg-[#1e1e1e] rounded-2xl overflow-hidden flex flex-col shadow-2xl">

        {/* TITLE BAR */}
        <div className="h-9 bg-[#3c3c3c] flex items-center justify-between px-4">
          <span className="text-xs text-white/90">
            {data?.project?.name}
          </span>
          <button onClick={onClose} className="text-white hover:text-red-500">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* SIDEBAR */}
          <aside className="w-64 bg-[#252526] border-r border-black">
            <div className="px-4 py-2 text-xs text-zinc-400 flex items-center gap-2">
              <Files size={14} /> EXPLORER
            </div>

            <div className="overflow-y-auto h-full">
              {fileTree.map(node => (
                <FileTree
                  key={node.id}
                  node={node}
                  activeFileId={activeFile?.id}
                  onSelectFile={async fileNode => {
                    setActiveFile(fileNode);
                    setFileContent(null);

                    try {
                      const res = await getFile(
                        data.project.id,
                        fileNode.id,
                        lang
                      );
                      setFileContent(res.content);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                />
              ))}
            </div>
          </aside>

          {/* EDITOR */}
          <main className="flex-1 bg-[#1e1e1e]">

            {activeFile ? (
              fileContent ? (
                <iframe
                  title="HTML Preview"
                  srcDoc={fileContent}
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full bg-white"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  {t.vscodeLoading}
                </div>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                {t.vscodeNoFile}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}