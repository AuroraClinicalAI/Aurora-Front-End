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

  async verifyReports(): Promise<{ message: string; pdf_bytes: number }> {
    const response = await api.get<{ message: string; pdf_bytes: number }>(
      "/reporte/verificar_reportes/",
    );
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

  async marcarPQRSLeido(id: number): Promise<PQRS> {
    const response = await api.post<PQRS>(`/pqrs/${id}/marcar_leido/`);
    return response.data;
  }

  async responderPQRS(id: number, respuesta: string): Promise<PQRS> {
    const response = await api.post<PQRS>(`/pqrs/${id}/responder/`, {
      respuesta,
    });
    return response.data;
  }

  async testUploadModel(
    file: File,
  ): Promise<{ message: string; filas: number }> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/reporte/prueba_carga/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
}
