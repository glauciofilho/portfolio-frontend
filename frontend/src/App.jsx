import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer";


export default function App() {
    return (
        <LanguageProvider>
            <div className="min-h-screen bg-cyan-50 text-cyan-950">
                <Header />
                <div className="h-28" />
                <main className="px-4"></main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </div>
        </LanguageProvider>
    );
}