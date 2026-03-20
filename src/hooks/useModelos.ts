import { useServices } from "@/context/useServices";
import { useState, useCallback } from "react";

export const useModelos = () => {
  const { diagnosticosService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllModelos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await diagnosticosService.getAllModelos();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching modelos");
      return [];
    } finally {
      setLoading(false);
    }
  }, [diagnosticosService]);

  return {
    getAllModelos,
    loading,
    error,
  };
};
