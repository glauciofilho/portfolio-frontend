import { useLanguage } from "../context/LanguageContext";


export default function Contact() {
    const { t } = useLanguage();
    return (
        <section className="p-10 grid md:grid-cols-2 gap-6">
            <div>
                <p>Email: email@email.com</p>
                <p>GitHub: github.com</p>
                <p>LinkedIn: linkedin.com</p>
            </div>
            <form className="space-y-2">
                <input className="w-full p-2 bg-cyan-900 border rounded" placeholder="Email" />
                <textarea className="w-full p-2 bg-cyan-900 border rounded" placeholder="Message" />
                <button className="border px-4 py-2 rounded">{t.send}</button>
            </form>
        </section>
    );
}