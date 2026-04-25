import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from './apiClient';

// Mock de import.meta.env
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },
}));

describe('apiClient', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('deve fazer o fetch correto e retornar json quando res.ok é verdadeiro', async () => {
    const mockData = { id: 1, name: 'Project 1' };

    // Configura o fetch mockado
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiClient('/api/test');

    expect(global.fetch).toHaveBeenCalledWith(import.meta.env.VITE_API_URL + '/api/test', expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('deve lançar um erro quando res.ok é falso', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(apiClient('/api/test')).rejects.toThrow('API Error: 404 Not Found');
  });

  it('deve passar as options corretamente', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await apiClient('/api/post', { method: 'POST', body: JSON.stringify({ a: 1 }) });

    expect(global.fetch).toHaveBeenCalledWith(import.meta.env.VITE_API_URL + '/api/post', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ a: 1 })
    }));
  });
});
