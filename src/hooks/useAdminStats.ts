import { useServices } from "@/context/useServices";
import type { AdminStats } from "@/types/BackendTypes";
import { useState, useCallback } from "react";

export const useAdminStats = () => {
  const { adminService } = useServices();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAdminStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getAdminStats();
      setStats(data);
      return data;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al obtener métricas admin",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [adminService]);

  return {
    stats,
    getAdminStats,
    loading,
    error,
  };
};
