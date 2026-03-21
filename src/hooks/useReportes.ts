import { useServices } from "@/context/useServices";
import { useState, useCallback } from "react";

export const useReportes = () => {
  const { reportesService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllReportes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await reportesService.getAllReportes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching reportes");
      return [];
    } finally {
      setLoading(false);
    }
  }, [reportesService]);

  const getReporteById = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        return await reportesService.getReporteById(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching reporte");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [reportesService],
  );

  return {
    getAllReportes,
    getReporteById,
    loading,
    error,
  };
};
