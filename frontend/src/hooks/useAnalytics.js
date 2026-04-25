import { useState, useEffect, useMemo } from 'react';
import {
  getProjects,
  getAnalyticsOverview,
  getAnalyticsCountries,
  getAnalyticsProjects,
} from '../services/api';

export function useAnalytics(lang) {
  const [projects, setProjects] = useState([]);
  const [overview, setOverview] = useState(null);
  const [countries, setCountries] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    
    async function load() {
      try {
        setLoading(true);

        const [
          projectsData,
          overviewData,
          countriesData,
          rankingData,
        ] = await Promise.all([
          getProjects(lang, controller.signal),
          getAnalyticsOverview(controller.signal),
          getAnalyticsCountries(controller.signal),
          getAnalyticsProjects(controller.signal),
        ]);

        setProjects(projectsData || []);
        setOverview(overviewData || null);
        setCountries(countriesData || []);
        setRanking(rankingData || []);

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Analytics error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [lang]);

  const totalStacks = useMemo(() => {
    return new Set(
      projects.flatMap(p => p.stacks?.map(s => s.name) || [])
    ).size;
  }, [projects]);

  return {
    projects,
    overview,
    countries,
    ranking,
    loading,
    totalStacks
  };
}
