import { useState } from "react";
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from "lucide-react";

export default function FileTree({ node, level = 0, onSelectFile, activeFileId }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === "folder";

  // Identação baseada no nível da arvore
  const paddingLeft = `${level * 12 + 10}px`;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelectFile(node);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center gap-1 py-[2px] cursor-pointer select-none hover:bg-[#2a2d2e] transition-colors
          ${!isFolder && activeFileId === node.id ? "bg-[#37373d] text-white" : "text-[#cccccc]"}
        `}
        style={{ paddingLeft }}
      >
        {/* Ícone de Seta para Pastas */}
        <span className="w-4 flex justify-center opacity-80">
           {isFolder && (
             isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
           )}
        </span>

        {/* Ícone do Arquivo/Pasta */}
        <span className={`${isFolder ? "text-yellow-500" : "text-cyan-500"}`}>
          {isFolder ? (
             isOpen ? <FolderOpen size={14} /> : <Folder size={14} />
          ) : (
             <FileCode size={14} />
          )}
        </span>

        {/* Nome */}
        <span className="text-[13px] ml-1 truncate">{node.name}</span>
      </div>

      {/* Renderização Recursiva para Filhos */}
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTree
              key={child.id}
              node={child}
              level={level + 1}
              onSelectFile={onSelectFile}
              activeFileId={activeFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
}