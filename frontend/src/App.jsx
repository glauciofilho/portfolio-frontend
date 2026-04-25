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
import View from "./pages/View";
import NotFound from "./pages/NotFound";

import { LanguageProvider } from "./context/LanguageContext";
import { trackPageView } from "./analytics/ga";

export default function App() {
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view/");

  // 🔹 Page view automático
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <ScrollToTop />

      <div className={`min-h-screen ${isViewPage ? "bg-white" : "bg-cyan-50 text-cyan-950"}`}>
        {!isViewPage && <Header />}

        {!isViewPage && <div className="h-28" />}

        <Routes>
          {/* As rotas agora ficam agrupadas dentro de /:lang */}
          <Route path="/:lang">
            <Route index element={<Home />} />
            <Route path="resume" element={<Resume />} />
            <Route path="projects" element={<Projects />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="view/:projectSlug" element={<View />} />

            {/* Rota de segurança: se o usuário digitar uma URL doida, joga pra Home */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <CookieBanner />

        {!isViewPage && <Footer />}
      </div>
    </LanguageProvider>
  );
}