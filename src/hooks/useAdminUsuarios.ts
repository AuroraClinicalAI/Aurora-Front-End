import { useServices } from "@/context/useServices";
import type { UserProfile, PaginatedResponse } from "@/types/BackendTypes";
import { useState, useCallback } from "react";

export const useAdminUsuarios = () => {
  const { usuariosService } = useServices();
  const [usuarios, setUsuarios] = useState<UserProfile[]>([]);
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
  }>({ count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsuariosPaginated = useCallback(
    async (params?: Record<string, string>) => {
      setLoading(true);
      setError(null);
      try {
        const data: PaginatedResponse<UserProfile> =
          await usuariosService.getAllUsuariosPaginated(params);
        setUsuarios(data.results);
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        return data;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al obtener usuarios",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [usuariosService],
  );

  const updateUsuario = useCallback(
    async (id: number, data: Partial<UserProfile>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await usuariosService.updateUsuario(id, data);
        return result;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al actualizar usuario",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [usuariosService],
  );

  const desactivarUsuario = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await usuariosService.desactivarUsuario(id);
        return true;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Error al desactivar usuario",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [usuariosService],
  );

  return {
    usuarios,
    pagination,
    getUsuariosPaginated,
    updateUsuario,
    desactivarUsuario,
    loading,
    error,
  };
};
