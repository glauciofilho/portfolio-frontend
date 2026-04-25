import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, getOneProject, getFile } from '../services/api';
import { slugify } from '../utils/slugify';

export function useProjectViewer(projectSlug, lang) {
  const navigate = useNavigate();
  
  const [allProjects, setAllProjects] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 1. Carrega todos os projetos e encontra o ID do projeto atual
  useEffect(() => {
    let active = true;
    async function fetchAll() {
      try {
        const projects = await getProjects(lang);
        if (!active) return;
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
    return () => { active = false; };
  }, [lang, projectSlug]);

  // 2. Carrega os dados do projeto atual (arquivos) e seleciona o readme.md por padrão
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
          const res = await getFile(currentProjectId, readmeFile.id, lang, controller.signal);
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

  // 3. Constrói a árvore de arquivos para o explorador
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

  // 4. Ações
  const handleProjectChange = useCallback((e) => {
    const id = e.target.value;
    const project = allProjects.find(p => p.id === parseInt(id));
    if (project) {
      navigate(`/${lang}/view/${slugify(project.name)}`);
    }
  }, [allProjects, lang, navigate]);

  const handleSelectFile = useCallback(async (fileNode) => {
    if (!data?.project?.id) return;
    
    setActiveFile(fileNode);
    setFileContent(null);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    
    try {
      const res = await getFile(data.project.id, fileNode.id, lang);
      setFileContent(res.content);
    } catch (err) {
      console.error(err);
    }
  }, [data, lang]);

  return {
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
  };
}
