export default function LanguageSwitch({ lang, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="relative w-16 h-8 bg-cyan-800 rounded-full cursor-pointer flex items-center px-1"
    >
      {/* Toggle */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
          lang === "pt" ? "translate-x-8" : ""
        }`}
      />

      {/* Labels */}
      <div className="flex w-full justify-between text-[11px] font-semibold z-10 px-1">
        <span
          className={`transition ${
            lang === "en" ? "text-cyan-900" : "text-cyan-400"
          }`}
        >
          EN
        </span>
        <span
          className={`transition ${
            lang === "pt" ? "text-cyan-900" : "text-cyan-400"
          }`}
        >
          PT
        </span>
      </div>
    </div>
  );
}
