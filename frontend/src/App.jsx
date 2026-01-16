import CookieBanner from "./components/CoockeBanner";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import Cookies from "./pages/Cookies";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import { LanguageProvider } from "./context/LanguageContext";
import { trackPageView } from "./analytics/ga";

export default function App() {
  const location = useLocation();

  // 🔹 Page view automático
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <ScrollToTop />

      <div className="min-h-screen bg-cyan-50 text-cyan-950">
        <Header />

        <div className="h-28" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>

        <CookieBanner />

        <Footer />
      </div>
    </LanguageProvider>
  );
}