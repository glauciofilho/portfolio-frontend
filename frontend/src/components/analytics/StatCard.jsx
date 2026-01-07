export default function StatCard({ title, value }) {
  return (
    <div className="bg-cyan-900/40 border border-cyan-800 rounded-2xl p-6">
      <p className="text-sm text-cyan-300 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}