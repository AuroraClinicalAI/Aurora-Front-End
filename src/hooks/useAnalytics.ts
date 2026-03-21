import { useState, useCallback } from "react";
import { useServices } from "../context/useServices";
import type {
  ResearchSummary,
  PopulationData,
  PatternsData,
  CohortData,
} from "../services/AnalyticsService";

export const useAnalytics = () => {
  const { analyticsService } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSummary = useCallback(async (): Promise<ResearchSummary | null> => {
    setLoading(true);
    setError(null);
    try {
      return await analyticsService.getSummary();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error fetching research summary",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [analyticsService]);

  const getPopulation =
    useCallback(async (): Promise<PopulationData | null> => {
      setLoading(true);
      setError(null);
      try {
        return await analyticsService.getPopulation();
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Error fetching population stats",
        );
        return null;
      } finally {
        setLoading(false);
      }
    }, [analyticsService]);

  const getPatterns = useCallback(async (): Promise<PatternsData | null> => {
    setLoading(true);
    setError(null);
    try {
      return await analyticsService.getPatterns();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error fetching symptom patterns",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [analyticsService]);

  const getCohorts = useCallback(async (): Promise<CohortData[] | null> => {
    setLoading(true);
    setError(null);
    try {
      return await analyticsService.getCohorts();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error fetching cohort data",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [analyticsService]);

  return {
    getSummary,
    getPopulation,
    getPatterns,
    getCohorts,
    loading,
    error,
  };
};
