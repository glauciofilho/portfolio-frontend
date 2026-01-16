import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import { trackEvent } from "../analytics/ga";

export default function Cookies() {
  const { t } = useLanguage();

  useEffect(() => {
    trackEvent("view_cookies");
  }, []);


  return (
    <section className="max-w-4xl mx-auto px-6 pt-24 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        {t.cookiesTitle}
      </h1>

      <p className="mb-4">{t.cookiesIntro}</p>
      <p className="mb-4">{t.cookiesUsage}</p>
      <p className="mb-4">{t.cookiesManagement}</p>
    </section>
  );
}