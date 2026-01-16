const API_BASE = import.meta.env.VITE_API_URL;

export async function getProjects(lang = "en") {
  const res = await fetch(`${API_BASE}/api/projects/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getOneProject(numberProject, lang = "en") {
  const res = await fetch(`${API_BASE}/api/projects/${numberProject}/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getFile(numberProject, numberFile, lang = "en") {
  const res = await fetch(`${API_BASE}/api/files/${numberProject}/${numberFile}/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getAnalytics( lang = "en") {
  const res = await fetch(`${API_BASE}/api/analytics/?lang=${lang}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getAnalyticsOverview() {
  const res = await fetch(`${API_BASE}/analytics/overview/`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getAnalyticsCountries() {
  const res = await fetch(`${API_BASE}/analytics/countries/`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getAnalyticsProjects() {
  const res = await fetch(`${API_BASE}/analytics/projects/`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function sendContactMessage(data) {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}