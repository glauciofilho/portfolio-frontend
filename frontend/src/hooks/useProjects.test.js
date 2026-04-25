import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProjects } from './useProjects';
import * as api from '../services/api';

// Mock da API para não fazer requisições reais durante o teste
vi.mock('../services/api', () => ({
  getProjects: vi.fn()
}));

const mockProjects = [
  { id: 1, name: 'Alpha Project', created_at: '2023-01-01', stacks: [{ name: 'React' }, { name: 'Node' }] },
  { id: 2, name: 'Beta Project', created_at: '2023-06-01', stacks: [{ name: 'Vue' }] },
];

describe('useProjects', () => {
  it('deve extrair allStacks corretamente', async () => {
    api.getProjects.mockResolvedValue(mockProjects);
    
    // O hook tem estados async, então precisamos esperar o update
    const { result, rerender } = renderHook(() => useProjects('en'));

    // Esperar a promessa mockada resolver
    await act(async () => {
      await new Promise(r => setTimeout(r, 10)); // Pequeno delay pro useEffect rodar e setState acontecer
    });

    expect(result.current.projects).toEqual(mockProjects);
    expect(result.current.allStacks).toEqual(['Node', 'React', 'Vue']);
  });

  it('deve filtrar os projetos pela busca', async () => {
    api.getProjects.mockResolvedValue(mockProjects);
    
    const { result } = renderHook(() => useProjects('en'));

    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });

    act(() => {
      result.current.setSearch('alpha');
    });

    expect(result.current.filteredProjects).toHaveLength(1);
    expect(result.current.filteredProjects[0].name).toBe('Alpha Project');
  });

  it('deve ordernar os projetos pela data mais recente por padrao (date_desc)', async () => {
    api.getProjects.mockResolvedValue(mockProjects);
    
    const { result } = renderHook(() => useProjects('en'));

    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });

    // Beta (Junho) deve vir antes de Alpha (Janeiro)
    expect(result.current.filteredProjects[0].name).toBe('Beta Project');
    expect(result.current.filteredProjects[1].name).toBe('Alpha Project');
  });
});
