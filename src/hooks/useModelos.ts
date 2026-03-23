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

  const getDeletedModelos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await diagnosticosService.getDeletedModelos();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error fetching deleted modelos",
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, [diagnosticosService]);

  const softDeleteModelo = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await diagnosticosService.softDeleteModelo(id);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al eliminar modelo",
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const recoverModelo = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await diagnosticosService.recoverModelo(id);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al recuperar modelo",
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const toggleProductionModelo = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        return await diagnosticosService.toggleProductionModelo(id);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cambiar estado de producción",
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const trainCustomModelo = useCallback(
    async (file: File | null, datasetName: string, customName: string) => {
      setLoading(true);
      setError(null);
      try {
        return await diagnosticosService.trainCustomModelo(
          file,
          datasetName,
          customName,
        );
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error entrenando el modelo",
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const syncModelos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await diagnosticosService.syncModelos();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error sincronizando modelos",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [diagnosticosService]);

  return {
    getAllModelos,
    getDeletedModelos,
    softDeleteModelo,
    recoverModelo,
    toggleProductionModelo,
    trainCustomModelo,
    syncModelos,
    loading,
    error,
  };
};
