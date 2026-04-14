import { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "../i18n/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const pathLang = location.pathname.split("/")[1];
    const supportedLangs = ["en", "pt"];
    const lang = supportedLangs.includes(pathLang) ? pathLang : "en";

    const t = translations[lang];

    // Função que é chamada ao clicar no botão EN/PT
    const setLang = (newLang) => {
        if (newLang === lang) return;
        localStorage.setItem("site_lang", newLang);
        const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
        navigate(newPath);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            const savedLang = localStorage.getItem("site_lang") || "en";
            navigate(`/${savedLang}`, { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);