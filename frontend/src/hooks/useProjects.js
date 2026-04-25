import { useState, useMemo, useCallback } from 'react';
import { useFetch } from './useFetch';
import { getProjects } from '../services/api';

/**
 * Hook para encapsular a lógica da página Projects (busca, filtragem e ordenação).
 */
export function useProjects(lang = 'en') {
  // A busca dos dados usa nosso hook genérico
  const fetchFunction = useCallback((signal) => getProjects(lang, signal), [lang]);
  const { data: projects = [], loading, error } = useFetch(fetchFunction, [lang], true);

  // Estados locais para UI
  const [search, setSearch] = useState('');
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [sortBy, setSortBy] = useState('date_desc');
  const [view, setView] = useState('grid');

  // Lógica de extração das Stacks (memoizada para performance)
  const allStacks = useMemo(() => {
    if (!projects) return [];
    const stacks = new Set();
    projects.forEach(p => p.stacks.forEach(s => stacks.add(s.name)));
    return Array.from(stacks).sort();
  }, [projects]);

  // Lógica de filtragem e ordenação (memoizada)
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    let result = [...projects];

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedStacks.length > 0) {
      result = result.filter(p =>
        p.stacks.some(s => selectedStacks.includes(s.name))
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      switch (sortBy) {
        case "name_asc": return nameA.localeCompare(nameB);
        case "name_desc": return nameB.localeCompare(nameA);
        case "date_asc": return dateA - dateB;
        case "date_desc": default: return dateB - dateA;
      }
    });

    return result;
  }, [projects, search, selectedStacks, sortBy]);

  return {
    projects,
    filteredProjects,
    allStacks,
    loading,
    error,
    search,
    setSearch,
    selectedStacks,
    setSelectedStacks,
    sortBy,
    setSortBy,
    view,
    setView
  };
}
