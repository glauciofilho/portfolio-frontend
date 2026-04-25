import { apiClient } from "./apiClient";

export async function getProjects(lang = "en", signal) {
  return apiClient(`/api/projects/?lang=${lang}`, { signal });
}

export async function getOneProject(numberProject, lang = "en", signal) {
  return apiClient(`/api/projects/${numberProject}/?lang=${lang}`, { signal });
}

export async function getFile(numberProject, numberFile, lang = "en", signal) {
  return apiClient(`/api/files/${numberProject}/${numberFile}/?lang=${lang}`, { signal });
}

export async function getResume(lang = "en", signal) {
  return apiClient(`/api/resume/?lang=${lang}`, { signal });
}

export async function getAnalytics(lang = "en", signal) {
  return apiClient(`/api/analytics/?lang=${lang}`, { signal });
}

export async function getAnalyticsOverview(signal) {
  return apiClient(`/analytics/overview/`, { signal });
}

export async function getAnalyticsCountries(signal) {
  return apiClient(`/analytics/countries/`, { signal });
}

export async function getAnalyticsProjects(signal) {
  return apiClient(`/analytics/projects/`, { signal });
}

export async function sendContactMessage(data, signal) {
  return apiClient(`/contact/form/`, {
    method: "POST",
    body: JSON.stringify(data),
    signal,
  });
}