import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

export default function ProjectsTimelineChart({ projects }) {
  const { t } = useLanguage();

  const data = projects.reduce((acc, project) => {
    const date = project.created_at.slice(0, 7); // YYYY-MM
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div className="bg-cyan-900/40 border border-cyan-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        {t.analyticsProjectsOverTime}
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#22d3ee" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}