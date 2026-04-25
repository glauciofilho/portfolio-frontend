import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetch } from './useFetch';

describe('useFetch', () => {
  it('deve buscar dados e atualizar o estado de loading e data', async () => {
    const mockData = { test: 'data' };
    const mockFetch = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetch(mockFetch, []));

    // No início, immediate = true, então loading é true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Aguarda a resolução da promessa
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    // Verifica se o fetchFunction foi chamado com um AbortSignal
    expect(mockFetch).toHaveBeenCalledWith(expect.any(AbortSignal));
  });

  it('deve lidar com erros corretamente', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Erro de API'));

    const { result } = renderHook(() => useFetch(mockFetch, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Erro de API');
  });

  it('não deve setar erro se for um AbortError', async () => {
    const abortError = new Error('AbortError');
    abortError.name = 'AbortError';
    const mockFetch = vi.fn().mockRejectedValue(abortError);

    const { result } = renderHook(() => useFetch(mockFetch, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
  });
});
