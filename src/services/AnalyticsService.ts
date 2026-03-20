import api from "@/config/axios";

export interface ResearchSummary {
  total_cases: number;
  risk_cases: number;
  model_accuracy: number;
  f1_score: number;
}

export interface AgeDistribution {
  rango: string;
  count: number;
}

export interface SexDistribution {
  sexo: string;
  count: number;
}

export interface AnonymizedCase {
  id: string;
  age: string;
  sex: string;
  score: string;
  class: string;
}

export interface PopulationData {
  age_distribution: AgeDistribution[];
  sex_distribution: SexDistribution[];
  anonymized_cases: AnonymizedCase[];
}

export interface TopPattern {
  label: string;
  cases: number;
  percentage: number;
}

export interface PatternsData {
  top_patterns: TopPattern[];
  correlation_matrix: Record<string, number>;
}

export interface CohortData {
  period: string;
  cases: number;
  diff: string;
}

export interface IAnalyticsService {
  getSummary(): Promise<ResearchSummary>;
  getPopulation(): Promise<PopulationData>;
  getPatterns(): Promise<PatternsData>;
  getCohorts(): Promise<CohortData[]>;
}

export class AnalyticsService implements IAnalyticsService {
  public async getSummary(): Promise<ResearchSummary> {
    const response = await api.get<ResearchSummary>("/research/summary/");
    return response.data;
  }

  public async getPopulation(): Promise<PopulationData> {
    const response = await api.get<PopulationData>("/research/population/");
    return response.data;
  }

  public async getPatterns(): Promise<PatternsData> {
    const response = await api.get<PatternsData>("/research/patterns/");
    return response.data;
  }

  public async getCohorts(): Promise<CohortData[]> {
    const response = await api.get<CohortData[]>("/research/cohorts/");
    return response.data;
  }
}
