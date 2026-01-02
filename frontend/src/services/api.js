const API_BASE = import.meta.env.VITE_API_URL;

export async function getProjects(lang = "en") {
  const res = await fetch(`${API_BASE}/api/projects/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getoneProjects(numberProject, lang = "en") {
  const res = await fetch(`${API_BASE}/api/projects/${numberProject}/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getfile(numberProject, numberFile, lang = "en") {
  const res = await fetch(`${API_BASE}/api/file/${numberProject}/${numberFile}/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}