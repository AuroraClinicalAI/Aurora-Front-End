import { useState, useEffect, useCallback } from "react";
import { useServices } from "@/context/useServices";
import type {
  ResearchFilters,
  ExportParams,
  ResearchSummary,
  PopulationData,
  PatternsData,
  CohortData,
} from "@/types/BackendTypes";

export const useResearchAnalytics = () => {
  const { analyticsService } = useServices();

  const [filters, setFilters] = useState<ResearchFilters | null>(null);
  const [activeFilters, setActiveFilters] = useState<ExportParams>({
    format: "csv",
  });

  const [summary, setSummary] = useState<ResearchSummary | null>(null);
  const [population, setPopulation] = useState<PopulationData | null>(null);
  const [patterns, setPatterns] = useState<PatternsData | null>(null);
  const [cohorts, setCohorts] = useState<CohortData[]>([]);

  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchFilters = useCallback(async () => {
    try {
      const data = await analyticsService.getFilters();
      setFilters(data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, [analyticsService]);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const [s, p, pt, c] = await Promise.all([
        analyticsService.getSummary(activeFilters),
        analyticsService.getPopulation(activeFilters),
        analyticsService.getPatterns(activeFilters),
        analyticsService.getCohorts(activeFilters),
      ]);
      setSummary(s);
      setPopulation(p);
      setPatterns(pt);
      setCohorts(c);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [analyticsService, activeFilters]);

  const updateFilters = (newFilters: Partial<ExportParams>) => {
    setActiveFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleExport = async (paramsOverride?: Partial<ExportParams>) => {
    setExporting(true);
    const finalParams = { ...activeFilters, ...paramsOverride };
    try {
      const data = await analyticsService.exportData(finalParams);

      if (finalParams.format === "csv" || finalParams.format === "xlsx") {
        const blob = data as Blob;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const extension = finalParams.format === "xlsx" ? "xlsx" : "csv";
        link.setAttribute(
          "download",
          `export_investigacion_${new Date().getTime()}.${extension}`,
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        // Handle JSON or other formats if needed
        console.log("Export data:", data);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    filters,
    activeFilters,
    updateFilters,
    summary,
    population,
    patterns,
    cohorts,
    loading,
    exporting,
    handleExport,
    refresh: fetchAnalytics,
  };
};
