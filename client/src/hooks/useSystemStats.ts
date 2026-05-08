import { useState, useEffect } from "react";
import type { SystemStats } from "../types/system.types";
import { fetchSystemStats } from "../api/system.api";

interface useSystemStatsResult {
  stats: SystemStats | null;
  loading: boolean;
  error: string | null;
}

export const useSystemStats = (pollInterval = 2000): useSystemStatsResult => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await fetchSystemStats();
        if (!cancelled) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    const interval = setInterval(load, pollInterval);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pollInterval]);

  return { stats, loading, error };
}

