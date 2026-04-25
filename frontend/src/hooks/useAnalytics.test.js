import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAnalytics } from './useAnalytics';
import * as api from '../services/api';

vi.mock('../services/api', () => ({
  getProjects: vi.fn(),
  getAnalyticsOverview: vi.fn(),
  getAnalyticsCountries: vi.fn(),
  getAnalyticsProjects: vi.fn()
}));

describe('useAnalytics', () => {
  it('deve carregar dados de analises e calcular totalStacks', async () => {
    const mockProjects = [
      { id: 1, stacks: [{ name: 'React' }, { name: 'Node' }] },
      { id: 2, stacks: [{ name: 'React' }, { name: 'Vite' }] }
    ];
    
    api.getProjects.mockResolvedValue(mockProjects);
    api.getAnalyticsOverview.mockResolvedValue({ page_views: 100 });
    api.getAnalyticsCountries.mockResolvedValue([{ country: 'BR', users: 50 }]);
    api.getAnalyticsProjects.mockResolvedValue([{ project_id: 1, views: 20 }]);

    const { result } = renderHook(() => useAnalytics('en'));

    // Esperar a promessa mockada resolver
    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.projects).toEqual(mockProjects);
    expect(result.current.overview).toEqual({ page_views: 100 });
    // Total stacks = React, Node, Vite (3 distinct ones)
    expect(result.current.totalStacks).toBe(3);
  });
});
