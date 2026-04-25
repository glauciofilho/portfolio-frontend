import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProjectViewer } from './useProjectViewer';
import * as api from '../services/api';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

vi.mock('../services/api', () => ({
  getProjects: vi.fn(),
  getOneProject: vi.fn(),
  getFile: vi.fn()
}));

describe('useProjectViewer', () => {
  it('deve carregar todos os projetos e definir currentProjectId baseado no slug', async () => {
    const mockProjects = [
      { id: 1, name: 'Project Alpha' },
      { id: 2, name: 'Project Beta' }
    ];
    
    api.getProjects.mockResolvedValue(mockProjects);
    api.getOneProject.mockResolvedValue({ files: [] }); // Stub para o segundo useEffect

    // 'project-alpha' é o slug gerado para 'Project Alpha'
    const { result } = renderHook(() => useProjectViewer('project-alpha', 'en'));

    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });

    expect(result.current.allProjects).toHaveLength(2);
    expect(result.current.currentProjectId).toBe(1);
  });

  it('deve construir a árvore de arquivos (fileTree) corretamente', async () => {
    const mockProjects = [{ id: 1, name: 'Proj' }];
    const mockProjectData = {
      project: { id: 1 },
      files: [
        { id: 'f1', path: 'src/index.js' },
        { id: 'f2', path: 'src/utils.js' },
        { id: 'f3', path: 'readme.md' }
      ]
    };
    
    api.getProjects.mockResolvedValue(mockProjects);
    api.getOneProject.mockResolvedValue(mockProjectData);
    api.getFile.mockResolvedValue({ content: 'Markdown content' });

    const { result } = renderHook(() => useProjectViewer('proj', 'en'));

    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });

    const tree = result.current.fileTree;
    // Verifica a estrutura
    expect(tree).toHaveLength(2); // folder 'src' and file 'readme.md'
    
    // As pastas devem vir antes dos arquivos devido a logica de sort
    const srcFolder = tree[0];
    expect(srcFolder.name).toBe('src');
    expect(srcFolder.type).toBe('folder');
    expect(srcFolder.children).toHaveLength(2);
    
    const readmeFile = tree[1];
    expect(readmeFile.name).toBe('readme.md');
    expect(readmeFile.type).toBe('file');
  });
});
