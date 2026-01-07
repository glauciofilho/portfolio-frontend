import { useLanguage } from "../../context/LanguageContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function CountriesChart({ countries }) {
  const { t } = useLanguage();
  const data = (countries || [])
    .filter(c => c.country)
    .map(c => ({
      name: c.country,
      total: c.total
    }));

  if (!data.length) {
    return (
      <div className="text-sm text-zinc-500">
        {t.noData}
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}