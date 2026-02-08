import { useServices } from "@/context/useServices";
import type { Diagnostico } from "@/types/BackendTypes";
import { useState, useCallback } from "react";

export const useDiagnosticos = () => {
  const { diagnosticosService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllDiagnosticos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await diagnosticosService.getAllDiagnosticos();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching diagnosticos");
      return [];
    } finally {
      setLoading(false);
    }
  }, [diagnosticosService]);

  const getDiagnosticoById = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        return await diagnosticosService.getDiagnosticoById(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching diagnostico");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const createDiagnostico = useCallback(
    async (data: Partial<Diagnostico>) => {
      setLoading(true);
      setError(null);
      try {
        return await diagnosticosService.createDiagnostico(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error creating diagnostico");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  return {
    getAllDiagnosticos,
    getDiagnosticoById,
    createDiagnostico,
    loading,
    error,
  };
};
