import { useState, useCallback, useEffect } from "react";
import { useServices } from "@/context/useServices";
import { AxiosError } from "axios";
import type { Reporte } from "@/types/BackendTypes";

export const useReportVerification = () => {
  const { reportesService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    message: string;
    pdf_bytes: number;
  } | null>(null);
  const [reports, setReports] = useState<Reporte[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoadingReports(true);
    try {
      const data = await reportesService.getAllReportes();
      setReports(
        data.sort(
          (a, b) =>
            new Date(b.fecha_creacion).getTime() -
            new Date(a.fecha_creacion).getTime(),
        ),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingReports(false);
    }
  }, [reportesService]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const verifyReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await reportesService.verifyReports();
      setResult(data);
      await fetchReports();
      return data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errMsg =
        err.response?.data?.error ||
        err.message ||
        "Error verificando reportes";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [reportesService, fetchReports]);

  return { verifyReports, loading, error, result, reports, loadingReports };
};
