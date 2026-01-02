import { LayoutGrid, List } from "lucide-react";

export default function ViewToggle({ value, onChange }) {
  return (
    <div className="flex rounded-lg bg-zinc-800 p-1">
      <button
        onClick={() => onChange("grid")}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
          value === "grid"
            ? "bg-cyan-500 text-white"
            : "text-zinc-400"
        }`}
      >
        <LayoutGrid size={16} />
        Grid
      </button>

      <button
        onClick={() => onChange("list")}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
          value === "list"
            ? "bg-cyan-500 text-white"
            : "text-zinc-400"
        }`}
      >
        <List size={16} />
        List
      </button>
    </div>
  );
}