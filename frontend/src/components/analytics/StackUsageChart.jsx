import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

const COLORS = [
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75"
];

export default function StackUsageChart({ projects = [] }) {
  const { t } = useLanguage();

  // 🔒 Segurança total
  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-zinc-500 text-sm">
        {t.noData}
      </div>
    );
  }

  // 🔄 Conta stacks
  const stackCount = {};

  projects.forEach((project) => {
    if (!Array.isArray(project.stacks)) return;

    project.stacks.forEach((stack) => {
      stackCount[stack.name] =
        (stackCount[stack.name] || 0) + 1;
    });
  });

  const data = Object.entries(stackCount).map(
    ([name, value]) => ({ name, value })
  );

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-zinc-500 text-sm">
        {t.noData}
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-xl p-4 border border-cyan-500/10 h-80">
      <h3 className="text-sm font-semibold mb-4 text-cyan-400">
        {t.analyticsStacks}
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}