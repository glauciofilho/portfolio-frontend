import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import { trackEvent } from "../analytics/ga";

export default function Privacy() {
  const { t } = useLanguage();

  useEffect(() => {
    trackEvent("view_privacy");
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 pt-24 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        {t.privacyTitle}
      </h1>

      <p className="mb-4">{t.privacyIntro}</p>
      <p className="mb-4">{t.privacyDataCollection}</p>
      <p className="mb-4">{t.privacyCollectedData}</p>
      <p className="mb-4">{t.privacyPurpose}</p>
      <p className="mb-4">{t.privacyNoSharing}</p>
      <p className="mb-4">{t.privacyConsent}</p>
    </section>
  );
}
