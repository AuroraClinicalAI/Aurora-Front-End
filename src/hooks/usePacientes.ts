import { useServices } from "@/context/useServices";
import { useState, useCallback } from "react";

export const usePacientes = () => {
  const { pacientesService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllPacientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await pacientesService.getAllPacientes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching pacientes");
      return [];
    } finally {
      setLoading(false);
    }
  }, [pacientesService]);

  const getPacienteById = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        return await pacientesService.getPacienteById(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching paciente");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [pacientesService],
  );

  const getAllRangosEdad = useCallback(async () => {
    try {
      return await pacientesService.getAllRangosEdad();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching rangos edad");
      return [];
    }
  }, [pacientesService]);

  return {
    getAllPacientes,
    getPacienteById,
    getAllRangosEdad,
    loading,
    error,
  };
};
