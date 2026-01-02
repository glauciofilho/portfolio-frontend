import { useEffect, useState, useMemo } from "react";
import { X, Minus, Square, Files, Search as SearchIcon, GitGraph, Box } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getOneProject } from "../services/api";
import FileTree from "./FileTree";

export default function VSCodeViewer({ projectId, onClose }) {
  const { lang } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState(null); // Para uso futuro (conteúdo)

  // Busca dados do projeto
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await getOneProject(projectId, lang);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId, lang]);

  // Função auxiliar para transformar caminhos planos (a/b/c) em árvore aninhada
  const fileTree = useMemo(() => {
    if (!data?.files) return [];

    const root = [];

    data.files.forEach((file) => {
      const parts = file.path.split("/"); // Ex: ["src", "components", "Button.jsx"]
      let currentLevel = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        
        // Verifica se já existe nó com esse nome no nível atual
        let existingNode = currentLevel.find((node) => node.name === part);

        if (existingNode) {
          // Se for pasta, entra nela
          if (!isFile) {
            currentLevel = existingNode.children;
          }
        } else {
          // Cria novo nó
          const newNode = {
            id: isFile ? file.id : `folder-${part}-${Math.random()}`, // ID único temp para pastas
            name: part,
            type: isFile ? "file" : "folder",
            children: isFile ? null : [],
            fullPath: file.path, // Salva o path completo para arquivos
            originalFile: isFile ? file : null,
          };

          currentLevel.push(newNode);

          if (!isFile) {
            currentLevel = newNode.children;
          }
        }
      });
    });

    // Função para ordenar: Pastas primeiro, depois arquivos (A-Z)
    const sortTree = (nodes) => {
      nodes.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "folder" ? -1 : 1;
      });
      nodes.forEach(node => {
        if (node.children) sortTree(node.children);
      });
    };

    sortTree(root);
    return root;
  }, [data]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1e1e1e] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-mono">Loading VS Code Env...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden animate-in fade-in duration-200">
      
      {/* TITLE BAR (Simulando janela) */}
      <div className="h-8 bg-[#3c3c3c] flex items-center justify-between px-3 select-none">
        <div className="flex items-center gap-2">
           <img src="/vscode-icon.svg" alt="VS Code" className="w-4 h-4 opacity-80" onError={(e) => e.target.style.display='none'} /> 
           <span className="text-xs text-white/90 font-medium">
             {data?.project?.name ? `${data.project.name} - Visual Studio Code` : "Project Viewer"}
           </span>
        </div>
        
        {/* Janela Controles */}
        <div className="flex items-center gap-4">
          <Minus size={14} className="hover:text-white cursor-not-allowed opacity-50" />
          <Square size={12} className="hover:text-white cursor-not-allowed opacity-50" />
          <button 
            onClick={onClose}
            className="hover:bg-red-500 hover:text-white rounded p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* ACTIVITY BAR (Icones laterais esquerda) */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#252526]">
          <div className="p-2 border-l-2 border-cyan-400 cursor-pointer">
            <Files size={24} className="text-white" />
          </div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
            <SearchIcon size={24} />
          </div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
             <GitGraph size={24} />
          </div>
          <div className="p-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
             <Box size={24} />
          </div>
        </div>

        {/* SIDEBAR (Explorer) */}
        <div className="w-64 bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
          <div className="h-9 px-4 flex items-center text-[11px] font-bold text-zinc-400 tracking-wider">
            EXPLORER
          </div>
          
          <div className="px-2">
             {/* Nome do projeto como root folder */}
            <div className="flex items-center gap-1 text-xs font-bold text-white mb-1 px-2 py-1 bg-[#37373d] cursor-pointer">
               <span className="rotate-90 text-[10px]">▶</span>
               <span>{data?.project?.name?.toUpperCase() || "PROJECT"}</span>
            </div>

            {/* Arvore de Arquivos */}
            <div className="overflow-y-auto h-[calc(100vh-120px)]">
              {fileTree.map(node => (
                <FileTree 
                   key={node.id} 
                   node={node} 
                   activeFileId={activeFile?.id}
                   onSelectFile={(fileNode) => {
                       console.log("Selecionado:", fileNode);
                       setActiveFile(fileNode);
                       // Futuramente: Chamar getFileContent aqui
                   }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* MAIN EDITOR AREA */}
        <div className="flex-1 bg-[#1e1e1e] flex flex-col">
          
          {/* Tabs Bar */}
          <div className="h-9 bg-[#2d2d2d] flex items-center overflow-x-auto no-scrollbar">
            {activeFile ? (
               <div className="h-full bg-[#1e1e1e] border-t-2 border-t-cyan-500 px-3 flex items-center gap-2 min-w-[120px] text-sm text-white/90">
                 <span className="text-cyan-400 text-xs">JS</span> {/* Icone fake */}
                 <span>{activeFile.name}</span>
                 <X size={14} className="ml-auto hover:bg-zinc-700 rounded cursor-pointer" onClick={(e) => { e.stopPropagation(); setActiveFile(null); }} />
               </div>
            ) : (
                <div className="h-full px-4 flex items-center text-xs text-zinc-500 italic">
                   No file open
                </div>
            )}
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-0 overflow-auto relative">
             {activeFile ? (
                 <div className="w-full h-full flex items-center justify-center text-zinc-500">
                     <div className="text-center">
                         <Box size={48} className="mx-auto mb-4 opacity-20" />
                         <p>Visualização de código em breve...</p>
                         <p className="text-xs mt-2 opacity-50">File ID: {activeFile.id}</p>
                     </div>
                 </div>
             ) : (
                 // Empty State (Logo VS Code Bg)
                 <div className="w-full h-full flex flex-col items-center justify-center text-[#3b3b3b] select-none">
                     <h1 className="text-8xl font-bold tracking-tighter opacity-20">VS Code</h1>
                     <p className="mt-4 text-zinc-600">Selecione um arquivo no explorer para visualizar</p>
                     <div className="mt-8 text-sm text-zinc-600 space-y-2">
                        <p>Projeto: <span className="text-cyan-600">{data?.project?.name}</span></p>
                        <p>{data?.project?.summary}</p>
                     </div>
                 </div>
             )}
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none">
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><GitGraph size={10}/> main*</span>
                <span>0 errors, 0 warnings</span>
             </div>
             <div className="flex items-center gap-4">
                <span>Ln 1, Col 1</span>
                <span>UTF-8</span>
                <span>JavaScript React</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}