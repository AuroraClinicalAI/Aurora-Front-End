import { useServices } from "@/context/useServices";
import { useState, useCallback, useEffect } from "react";
import type { ActivityStatistics } from "@/types/BackendTypes";

export const useActivityStatistics = () => {
  const { usuariosService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<ActivityStatistics | null>(null);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usuariosService.getSelfActivityStatistics();
      setStatistics(data);
      return data;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Error fetching activity statistics",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [usuariosService]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,
  };
};
