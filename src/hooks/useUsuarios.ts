import { useServices } from "@/context/useServices";
import { useState, useCallback } from "react";

export const useUsuarios = () => {
  const { usuariosService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await usuariosService.getAllUsuarios();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching usuarios");
      return [];
    } finally {
      setLoading(false);
    }
  }, [usuariosService]);

  const getUsuarioById = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        return await usuariosService.getUsuarioById(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching usuario");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [usuariosService],
  );

  return {
    getAllUsuarios,
    getUsuarioById,
    loading,
    error,
  };
};
