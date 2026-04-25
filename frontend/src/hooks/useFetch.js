import { useState, useEffect, useCallback } from 'react';

/**
 * Hook genérico para gerenciar chamadas de API, lidando com estados de loading, data, error,
 * e cancelamento automático (AbortController) se o componente desmontar.
 * 
 * @param {Function} fetchFunction - A função de requisição (que deve aceitar um AbortSignal como argumento se quiser suportar cancelamento).
 * @param {Array} dependencies - Dependências para refazer o fetch (como no useEffect).
 * @param {boolean} immediate - Se a requisição deve rodar imediatamente.
 * @returns {Object} { data, loading, error, execute }
 */
export function useFetch(fetchFunction, dependencies = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    
    try {
      // Passa o signal para a função de fetch (caso ela suporte)
      const result = await fetchFunction(controller.signal, ...args);
      setData(result);
      return result;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Ocorreu um erro');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    let controller = null;

    if (immediate) {
      setLoading(true);
      setError(null);
      controller = new AbortController();
      
      fetchFunction(controller.signal)
        .then(res => {
          setData(res);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            setError(err.message || 'Ocorreu um erro');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      if (controller) {
        controller.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, execute, setData };
}
