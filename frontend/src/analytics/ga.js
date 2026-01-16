import { hasConsent } from "./consent";

export const GA_ID = import.meta.env.VITE_GA_ID;

/* Page View */
export function trackPageView(path) {
  if (!window.gtag || !GA_ID || !hasConsent()) return;

  window.gtag("config", GA_ID, {
    page_path: path,
  });
}

/* Generic Event */
export function trackEvent(name, params = {}) {
  if (!window.gtag || !hasConsent()) return;

  window.gtag("event", name, {
    ...params,
  });
}