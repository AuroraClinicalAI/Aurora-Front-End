import api from "@/config/axios";
import type {
  ResearchSummary,
  PopulationData,
  PatternsData,
  CohortData,
  ResearchFilters,
  ExportParams,
  SystemHealth,
  ValidationMetrics,
} from "@/types/BackendTypes";

export type {
  ResearchSummary,
  PopulationData,
  PatternsData,
  CohortData,
  ResearchFilters,
  ExportParams,
  SystemHealth,
  ValidationMetrics,
};

export interface IAnalyticsService {
  getSummary(params?: ExportParams): Promise<ResearchSummary>;
  getPopulation(params?: ExportParams): Promise<PopulationData>;
  getPatterns(params?: ExportParams): Promise<PatternsData>;
  getCohorts(params?: ExportParams): Promise<CohortData[]>;
  getFilters(): Promise<ResearchFilters>;
  exportData(params: ExportParams): Promise<Blob | unknown>;
  getSystemHealth(): Promise<SystemHealth>;
  getValidationMetrics(): Promise<ValidationMetrics>;
}

export class AnalyticsService implements IAnalyticsService {
  public async getSummary(params?: ExportParams): Promise<ResearchSummary> {
    const rest = { ...params };
    delete rest.format;
    const response = await api.get<ResearchSummary>(
      "/research-analytics/summary/",
      { params: rest },
    );
    return response.data;
  }

  public async getPopulation(params?: ExportParams): Promise<PopulationData> {
    const rest = { ...params };
    delete rest.format;
    const response = await api.get<PopulationData>(
      "/research-analytics/population/",
      { params: rest },
    );
    return response.data;
  }

  public async getPatterns(params?: ExportParams): Promise<PatternsData> {
    const rest = { ...params };
    delete rest.format;
    const response = await api.get<PatternsData>(
      "/research-analytics/patterns/",
      { params: rest },
    );
    return response.data;
  }

  public async getCohorts(params?: ExportParams): Promise<CohortData[]> {
    const rest = { ...params };
    delete rest.format;
    const response = await api.get<CohortData[]>(
      "/research-analytics/cohorts/",
      { params: rest },
    );
    return response.data;
  }

  public async getFilters(): Promise<ResearchFilters> {
    const response = await api.get<ResearchFilters>(
      "/research-analytics/filters/",
    );
    return response.data;
  }

  public async exportData(params: ExportParams): Promise<Blob | unknown> {
    const { format, ...rest } = params;
    const response = await api.get("/research-analytics/export_data/", {
      params: { ...rest, export_format: format },
      responseType: format === "csv" || format === "xlsx" ? "blob" : "json",
    });
    return response.data;
  }

  public async getSystemHealth(): Promise<SystemHealth> {
    const response = await api.get<SystemHealth>(
      "/research-analytics/system_health/",
    );
    return response.data;
  }

  public async getValidationMetrics(): Promise<ValidationMetrics> {
    const response = await api.get<ValidationMetrics>(
      "/research-analytics/validation_metrics/",
    );
    return response.data;
  }
}
