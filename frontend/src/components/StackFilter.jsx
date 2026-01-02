import { ChevronDown, X, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function StackFilter({ stacks, selected, onChange }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  function toggleStack(stack) {
    if (selected.includes(stack)) {
      onChange(selected.filter(s => s !== stack));
    } else {
      onChange([...selected, stack]);
    }
  }

  const filtered = stacks.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {/* TRIGGER BUTTON (Com z-index alto se estiver aberto para ficar acima do backdrop, opcional, mas aqui deixamos o backdrop fechar tudo) */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative z-40 flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors border ${
          open || selected.length > 0
            ? "bg-cyan-950 border-cyan-700 text-white"
            : "bg-cyan-800 border-cyan-700 text-cyan-300 hover:text-white"
        }`}
      >
        <span>{t.filterStack}</span>
        {selected.length > 0 && (
          <span className="flex items-center justify-center bg-cyan-700 text-white text-[10px] w-5 h-5 rounded-full">
            {selected.length}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          {/* BACKDROP: Camada invisivel (ou levemente escura) que bloqueia cliques no resto da página */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          {/* DROPDOWN CONTENT */}
          <div className="absolute top-full left-0 mt-1 w-72 bg-cyan-950 border border-cyan-700 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">

            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-cyan-800 bg-cyan-950">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                {t.selectStack}
              </span>
              {selected.length > 0 && (
                <button
                  onClick={() => onChange([])}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>

            {/* SEARCH */}
            <div className="p-2 border-b border-cyan-800">
              <input
                placeholder={t.searchStack}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md bg-cyan-50 text-cyan-950 placeholder-cyan-950 outline-none focus:ring-1 focus:ring-cyan-600"
                autoFocus
              />
            </div>

            {/* LIST */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
              {filtered.map(stack => {
                const isSelected = selected.includes(stack);
                return (
                  <label
                    key={stack}
                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${
                      isSelected ? "bg-cyan-900/30 text-cyan-100" : "text-cyan-300 hover:bg-cyan-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                         isSelected ? "bg-cyan-600 border-cyan-600" : "border-cyan-600"
                      }`}>
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                      <span>{stack}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleStack(stack)}
                      className="hidden"
                    />
                  </label>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center py-4 text-xs text-cyan-500">
                  Nada encontrado
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}