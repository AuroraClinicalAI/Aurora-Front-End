import { useServices } from "@/context/useServices";
import type { Solicitud, PaginatedResponse } from "@/types/BackendTypes";
import { useState, useCallback } from "react";

export const useSolicitudes = () => {
  const { adminService } = useServices();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
  }>({ count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSolicitudes = useCallback(
    async (params?: Record<string, string>) => {
      setLoading(true);
      setError(null);
      try {
        const data: PaginatedResponse<Solicitud> =
          await adminService.getSolicitudes(params);
        setSolicitudes(data.results);
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        return data;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al obtener solicitudes",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [adminService],
  );

  const createSolicitud = useCallback(
    async (data: Partial<Solicitud>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await adminService.createSolicitud(data);
        return result;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al crear solicitud",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [adminService],
  );

  const resolverSolicitud = useCallback(
    async (id: number, data?: { nota_resolucion?: string }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await adminService.resolverSolicitud(id, data);
        return result;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al resolver solicitud",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [adminService],
  );

  return {
    solicitudes,
    pagination,
    getSolicitudes,
    createSolicitud,
    resolverSolicitud,
    loading,
    error,
  };
};
