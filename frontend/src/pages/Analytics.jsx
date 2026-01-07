import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getProjects, getAnalytics } from "../services/api";

import StatCard from "../components/analytics/StatCard";
import ProjectsTimelineChart from "../components/analytics/ProjectsTimelineChart";
import StackUsageChart from "../components/analytics/StackUsageChart";
import CountriesChart from "../components/analytics/CountriesChart";
import Ranking from "../components/analytics/Ranking";

export default function Analytics() {
  const { t, lang } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [projectsData, analyticsData] = await Promise.all([
          getProjects(),
          getAnalytics(),
        ]);

        setProjects(projectsData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lang]);

  const totalFiles = useMemo(() => {
    if (!analytics?.projects) return 0;
    return analytics.projects.reduce((acc, p) => acc + (p.total || 0), 0);
  }, [analytics]);

  if (loading) {
    return (
      <section className="pt-32 text-center text-cyan-500">
        {t.loadingAnalytics}
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      {/* HEADER */}
      <header className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-cyan-900 mb-4">
          {t.analyticsTitle}
        </h1>
        <p className="max-w-2xl mx-auto text-cyan-600">
          {t.analyticsDescription}
        </p>
      </header>

      {/* STATS*/}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-16">
        <StatCard title={t.analyticsProjects} value={projects.length} />
        <StatCard title={t.analyticsFiles} value={totalFiles} />
        <StatCard
          title={t.analyticsStacks}
          value={
            new Set(
              projects.flatMap(p => p.stacks.map(s => s.name))
            ).size
          }
        />
        <StatCard
          title={t.analyticsCountries}
          value={analytics?.countries?.length || 0}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProjectsTimelineChart projects={projects} />
        <StackUsageChart projects={projects} />
        <CountriesChart countries={analytics?.countries || []} />
        <Ranking projects={analytics} />
      </div>
    </section>
  );
}