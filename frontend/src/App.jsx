import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


export default function App() {
    return (
        <LanguageProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-cyan-50 text-cyan-950">
                <Header />
                <div className="h-28" />
                <main className="px-4"></main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </div>
        </LanguageProvider>
    );
}