import { useState, useCallback, useEffect } from "react";
import { useServices } from "@/context/useServices";
import type {
  SystemHealth,
  ValidationMetrics,
  Auditoria,
} from "@/types/BackendTypes";

export const useValidationDashboard = () => {
  const { analyticsService, auditoriaService } = useServices();

  const [metrics, setMetrics] = useState<ValidationMetrics | null>(null);
  const [metricsLoading, setMetricsLoading] = useState<boolean>(true);
  const [metricsError, setMetricsError] = useState<string | null>(null);

  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [healthLoading, setHealthLoading] = useState<boolean>(true);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [recentActivity, setRecentActivity] = useState<Auditoria[]>([]);

  const fetchActivity = useCallback(async () => {
    try {
      const audits = await auditoriaService.getAll();
      setRecentActivity(audits);
    } catch (error) {
      console.error(error);
    }
  }, [auditoriaService]);

  const fetchMetrics = useCallback(async () => {
    try {
      setMetricsLoading(true);
      const data = await analyticsService.getValidationMetrics();
      setMetrics(data);
      setMetricsError(null);
    } catch (error: unknown) {
      const err = error as Error;
      setMetricsError(err.message || "Error al obtener métricas");
    } finally {
      setMetricsLoading(false);
    }
  }, [analyticsService]);

  const fetchHealth = useCallback(async () => {
    try {
      const data = await analyticsService.getSystemHealth();
      setHealth(data);
      setHealthError(null);
    } catch (error: unknown) {
      const err = error as Error;
      setHealthError(err.message || "Error al obtener estado de salud");
    } finally {
      setHealthLoading(false);
    }
  }, [analyticsService]);

  const exportAudits = useCallback(async () => {
    try {
      const blob = await auditoriaService.exportAudits();
      const url = window.URL.createObjectURL(new Blob([blob as BlobPart]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "auditorias.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: unknown) {
      console.error("Error al exportar auditorías", error);
    }
  }, [auditoriaService]);

  useEffect(() => {
    fetchMetrics();
    fetchHealth();
    fetchActivity();

    const interval = setInterval(() => {
      fetchHealth();
      fetchMetrics();
      fetchActivity();
    }, 300000);

    return () => clearInterval(interval);
  }, [fetchMetrics, fetchHealth, fetchActivity]);

  return {
    recentActivity,
    metrics,
    metricsLoading,
    metricsError,
    fetchMetrics,
    health,
    healthLoading,
    healthError,
    fetchHealth,
    exportAudits,
  };
};
