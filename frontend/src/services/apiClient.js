const API_BASE = import.meta.env.VITE_API_URL;

/**
 * Cliente de API base para evitar repetição de fetch e parseamento de JSON.
 */
export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
