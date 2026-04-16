import { useState, useCallback } from "react";
import { useServices } from "@/context/useServices";
import { AxiosError } from "axios";

export const useModelTesting = () => {
  const { reportesService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    message: string;
    filas: number;
  } | null>(null);

  const testUploadModel = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const data = await reportesService.testUploadModel(file);
        setResult(data);
        return data;
      } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        const errMsg =
          err.response?.data?.error || err.message || "Error en la carga";
        setError(errMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [reportesService],
  );

  return { testUploadModel, loading, error, result };
};
