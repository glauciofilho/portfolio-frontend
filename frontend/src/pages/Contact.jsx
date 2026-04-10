import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { sendContactMessage } from "../services/api";
import { trackEvent } from "../analytics/ga";
import { Send, ShieldCheck, FolderGit2, LineChart, Briefcase } from "lucide-react";

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
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Erro ao enviar contato:", err);
      alert("Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* CONTEÚDO DA ESQUERDA */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-cyan-950 leading-tight tracking-tight">
              {t.contactTitle}
            </h1>
            <p className="text-lg text-cyan-700 max-w-md leading-relaxed">
              {t.contactDescription}
            </p>
          </div>

          <div className="space-y-8">
            <div className="group flex items-start gap-5">
              <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-cyan-900 uppercase tracking-widest mb-1">
                  {t.contactProjectsTitle}
                </h3>
                <p className="text-base text-cyan-700 leading-relaxed">
                  {t.contactProjectsText}
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5">
              <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-cyan-900 uppercase tracking-widest mb-1">
                  {t.contactAnalyticsTitle}
                </h3>
                <p className="text-base text-cyan-700 leading-relaxed">
                  {t.contactAnalyticsText}
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5">
              <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-cyan-900 uppercase tracking-widest mb-1">
                  {t.contactProfessionalTitle}
                </h3>
                <p className="text-base text-cyan-700 leading-relaxed">
                  {t.contactProfessionalText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="bg-white border border-cyan-100 rounded-3xl p-8 md:p-12 shadow-[0px_20px_50px_rgba(8,145,178,0.05)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="bg-green-50 text-green-700 px-5 py-4 rounded-2xl border border-green-100 text-sm font-medium">
                  {t.contactSuccessMessage}
                </div>
              )}

              {/* NOME */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-cyan-800 uppercase tracking-widest ml-1" htmlFor="name">
                  {t.contactName}
                </label>
                <input
                  required
                  id="name"
                  placeholder={t.contactName}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-6 py-4 bg-cyan-50/50 border border-cyan-100 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 transition-all placeholder:text-cyan-400 text-cyan-950 outline-none"
                />
              </div>

              {/* EMAIL (Agora diretamente embaixo do nome) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-cyan-800 uppercase tracking-widest ml-1" htmlFor="email">
                  {t.contactEmail}
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  placeholder={t.contactEmail}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-6 py-4 bg-cyan-50/50 border border-cyan-100 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 transition-all placeholder:text-cyan-400 text-cyan-950 outline-none"
                />
              </div>

              {/* MENSAGEM */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-cyan-800 uppercase tracking-widest ml-1" htmlFor="message">
                  {t.contactMessage}
                </label>
                <textarea
                  required
                  id="message"
                  rows={5}
                  placeholder={t.contactMessage}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-6 py-4 bg-cyan-50/50 border border-cyan-100 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 transition-all placeholder:text-cyan-400 text-cyan-950 outline-none resize-none"
                />
              </div>

              {/* BOTÃO DE ENVIAR */}
              <button
                disabled={loading}
                className="w-full mt-4 py-5 bg-cyan-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-700/20 hover:bg-cyan-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? t.sending : t.send}
                {!loading && <Send className="w-5 h-5" />}
              </button>
            </form>

            {/* RODAPÉ DO FORMULÁRIO */}
            <div className="mt-10 pt-8 border-t border-cyan-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-cyan-700">
                <ShieldCheck className="w-5 h-5 text-cyan-600" />
                <span className="text-sm font-medium">{t.contactNote}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}