import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import { trackEvent } from "../analytics/ga";

export default function Terms() {
  const { t } = useLanguage();

  useEffect(() => {
    trackEvent("view_terms");
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 pt-24 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        {t.termsTitle}
      </h1>

      <p className="mb-4">{t.termsIntro}</p>
      <p className="mb-4">{t.termsUsage}</p>
      <p className="mb-4">{t.termsCopyright}</p>
      <p className="mb-4">{t.termsAcceptance}</p>
    </section>
  );
}