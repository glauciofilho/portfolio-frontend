import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SortSelect({ value, onChange }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const options = [
    { value: "date_desc", label: t.sortNewest },
    { value: "date_asc", label: t.sortOldest },
    { value: "name_asc", label: t.sortNameAsc },
    { value: "name_desc", label: t.sortNameDesc },
  ];

  const currentLabel = options.find(o => o.value === value)?.label || options[0].label;

  return (
    <div className="relative">
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative z-40 flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors border ${
            open
              ? "bg-cyan-950 border-cyan-700 text-white"
              : "bg-cyan-800 border-cyan-700 text-cyan-300 hover:text-white"
          }`}
      >
        <span className="text-cyan-400 font-normal mr-1">{t.sortLabel}:</span>
        <span className="font-medium text-white">{currentLabel}</span>
        <ChevronDown size={16} className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          {/* BACKDROP: Bloqueia interação externa */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          {/* DROPDOWN */}
          <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-cyan-950 border border-cyan-700 shadow-2xl z-50 overflow-hidden py-1">
            {options.map(opt => {
              const isActive = value === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    isActive ? "bg-cyan-900 text-cyan-400" : "text-white hover:bg-cyan-500 hover:text-cyan-950 font-bold"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isActive && <Check size={14} />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  );
}