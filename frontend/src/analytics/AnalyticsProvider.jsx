import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPage } from "./ga";

export default function AnalyticsProvider({ children }) {
  const location = useLocation();

  // Inicializa GA uma única vez
  useEffect(() => {
    initGA();
  }, []);

  // Dispara pageview toda vez que muda a rota
  useEffect(() => {
    trackPage(location.pathname);
  }, [location.pathname]);

  return children;
}