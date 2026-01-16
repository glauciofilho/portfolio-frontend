import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { giveConsent, hasConsent } from "../analytics/consent";
import { trackEvent } from "../analytics/ga";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent()) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    giveConsent();
    trackEvent("consent_given");
    setVisible(false);

    // garante que o GA passe a funcionar imediatamente
    window.location.reload();
  }

  function rejectCookies() {
    trackEvent("consent_rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto bg-[#1e1e1e] text-zinc-200 rounded-2xl p-6 shadow-xl border border-zinc-800">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">

          {/* TEXT */}
          <div className="text-sm text-zinc-300 leading-relaxed">
            <p className="font-medium text-white mb-1">
              {t.cookiesBannerTitle}
            </p>
            <p>
              {t.cookiesBannerDescription}
            </p>
              <a
                href="/cookies"
                className="underline hover:text-white"
              >
                {t.learnMore}
              </a>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm rounded-lg border border-zinc-600 hover:bg-zinc-800 transition"
            >
              {t.reject}
            </button>

            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition"
            >
              {t.accept}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}