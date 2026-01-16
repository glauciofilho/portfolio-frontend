import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { sendContactMessage } from "../services/api";
import { trackEvent } from "../analytics/ga";

export default function Contact() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await sendContactMessage(form);
      trackEvent("contact_submit");

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl font-bold text-cyan-900 mb-6">
            {t.contactTitle}
          </h1>

          <p className="text-cyan-700 mb-12 max-w-md">
            {t.contactDescription}
          </p>

          <div className="space-y-8">

            <div>
              <h3 className="font-semibold text-cyan-900 mb-1">
                {t.contactProjectsTitle}
              </h3>
              <p className="text-sm text-cyan-600">
                {t.contactProjectsText}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-cyan-900 mb-1">
                {t.contactAnalyticsTitle}
              </h3>
              <p className="text-sm text-cyan-600">
                {t.contactAnalyticsText}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-cyan-900 mb-1">
                {t.contactProfessionalTitle}
              </h3>
              <p className="text-sm text-cyan-600">
                {t.contactProfessionalText}
              </p>
            </div>

          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-white border border-cyan-200 rounded-2xl p-8 space-y-6 shadow-sm">
          {success && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4">
              {t.contactSuccessMessage}
            </div>
          )}

          <p className="text-sm text-cyan-500">
            {t.contactNote}
          </p>

          <div>
            <label className="block text-sm font-medium text-cyan-900 mb-1">
              {t.contactName}
            </label>
            <input
              required
              placeholder={t.contactName}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-cyan-200 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-900 mb-1">
              {t.contactEmail}
            </label>
            <input
              required
              type="email"
              placeholder={t.contactEmail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-cyan-200 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-900 mb-1">
              {t.contactMessage}
            </label>
            <textarea
              required
              rows={4}
              placeholder={t.contactMessage}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-cyan-200 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-cyan-700 text-white py-3 rounded-lg"
          >
            {loading ? t.sending : t.send}
          </button>
        </form>

      </div>
    </section>
  );
}