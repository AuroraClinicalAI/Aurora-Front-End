import { useState, useCallback } from "react";
import { useServices } from "@/context/useServices";
import type { PQRS } from "@/types/BackendTypes";

export const usePQRS = () => {
  const { reportesService } = useServices();
  const [pqrsList, setPqrsList] = useState<PQRS[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllPQRS = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reportesService.getAllPQRS();
      setPqrsList(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al obtener PQRS");
      return null;
    } finally {
      setLoading(false);
    }
  }, [reportesService]);

  const marcarLeido = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        const updatedPqrs = await reportesService.marcarPQRSLeido(id);
        setPqrsList((prev) =>
          prev.map((p) => (p.id_pqrs === id ? updatedPqrs : p)),
        );
        return updatedPqrs;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al marcar como leído",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [reportesService],
  );

  const responderPQRS = useCallback(
    async (id: number, respuesta: string) => {
      setLoading(true);
      setError(null);
      try {
        const updatedPqrs = await reportesService.responderPQRS(id, respuesta);
        setPqrsList((prev) =>
          prev.map((p) => (p.id_pqrs === id ? updatedPqrs : p)),
        );
        return updatedPqrs;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al responder PQRS",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [reportesService],
  );

  return {
    pqrsList,
    getAllPQRS,
    marcarLeido,
    responderPQRS,
    loading,
    error,
  };
};
