import ReactGA from "react-ga4";

export const initGA = () => {
  if (!import.meta.env.VITE_GA_ID) return;
  ReactGA.initialize(import.meta.env.VITE_GA_ID);
};

export const trackPage = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (name, params = {}) => {
  ReactGA.event(name, params);
};