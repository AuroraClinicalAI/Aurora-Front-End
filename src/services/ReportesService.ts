import api from "@/config/axios";
import type { Reporte, PQRS } from "@/types/BackendTypes";
import type { IReportesService } from "./serviceInterfaces";

export class ReportesService implements IReportesService {
  async getAllReportes(): Promise<Reporte[]> {
    const response = await api.get<Reporte[]>("/reporte/");
    return response.data;
  }

  async getReporteById(id: number): Promise<Reporte> {
    const response = await api.get<Reporte>(`/reporte/${id}/`);
    return response.data;
  }

  async createReporte(data: Partial<Reporte>): Promise<Reporte> {
    const response = await api.post<Reporte>("/reporte/", data);
    return response.data;
  }

  async downloadReporte(id: number): Promise<Blob> {
    const response = await api.get(`/reporte/${id}/download/`, {
      responseType: "blob",
    });
    return response.data;
  }

  async getAllPQRS(): Promise<PQRS[]> {
    const response = await api.get<PQRS[]>("/pqrs/");
    return response.data;
  }

  async createPQRS(data: Partial<PQRS>): Promise<PQRS> {
    const response = await api.post<PQRS>("/pqrs/", data);
    return response.data;
  }
}
