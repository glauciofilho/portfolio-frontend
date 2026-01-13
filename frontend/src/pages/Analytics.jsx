import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  getProjects,
  getAnalyticsOverview,
  getAnalyticsCountries,
  getAnalyticsProjects,
} from "../services/api";
import { trackEvent } from "../analytics/ga";

import StatCard from "../components/analytics/StatCard";
import ProjectsTimelineChart from "../components/analytics/ProjectsTimelineChart";
import StackUsageChart from "../components/analytics/StackUsageChart";
import CountriesMap from "../components/analytics/CountriesMap";
import Ranking from "../components/analytics/Ranking";

export default function Analytics() {
  const { t, lang } = useLanguage();

  const [projects, setProjects] = useState([]);
  const [overview, setOverview] = useState(null);
  const [countries, setCountries] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackEvent("view_analytics");

    async function load() {
      try {
        setLoading(true);

        const [
          projectsData,
          overviewData,
          countriesData,
          rankingData,
        ] = await Promise.all([
          getProjects(),
          getAnalyticsOverview(),
          getAnalyticsCountries(),
          getAnalyticsProjects(),
        ]);

        setProjects(projectsData);
        setOverview(overviewData);
        setCountries(countriesData);
        setRanking(rankingData);

      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [lang]);

  const totalStacks = useMemo(() => {
    return new Set(
      projects.flatMap(p => p.stacks.map(s => s.name))
    ).size;
  }, [projects]);

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

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
        <StatCard
          title={t.analyticsProjects}
          value={projects.length}
        />
        <StatCard
          title={t.analyticsPageViews}
          value={overview?.page_views || 0}
        />
        <StatCard
          title={t.analyticsStacks}
          value={totalStacks}
        />
        <StatCard
          title={t.analyticsCountries}
          value={countries.length}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProjectsTimelineChart projects={projects} />
        <StackUsageChart projects={projects} />
        <CountriesMap countries={countries || []} />
        <Ranking
          projects={ranking}
          projectsMeta={projects}
        />
      </div>

    </section>
  );
}