export const GA_ID = import.meta.env.VITE_GA_ID;

export function trackPageView(path) {
  if (!window.gtag || !GA_ID) return;

  window.gtag("config", GA_ID, {
    page_path: path,
  });
}

export function trackEvent(name, params = {}) {
  if (!window.gtag) return;

  window.gtag("event", name, params);
}
