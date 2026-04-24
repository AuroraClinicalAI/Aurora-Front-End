import api from "@/config/axios";
import type {
  Diagnostico,
  Clasificacion,
  EtiquetaClasificacion,
  Modelo,
  Retroalimentacion,
  TipoInteraccion,
  Grafica,
} from "@/types/BackendTypes";
import type { IDiagnosticosService } from "./serviceInterfaces";

export class DiagnosticosService implements IDiagnosticosService {
  // Diagnosticos
  async getAllDiagnosticos(): Promise<Diagnostico[]> {
    const response = await api.get<Diagnostico[]>("/diagnostico/");
    return response.data;
  }

  async getDiagnosticoById(id: number): Promise<Diagnostico> {
    const response = await api.get<Diagnostico>(`/diagnostico/${id}/`);
    return response.data;
  }

  async createDiagnostico(data: Partial<Diagnostico>): Promise<Diagnostico> {
    const response = await api.post<Diagnostico>("/diagnostico/", data);
    return response.data;
  }

  async updateDiagnostico(
    id: number,
    data: Partial<Diagnostico>,
  ): Promise<Diagnostico> {
    const response = await api.patch<Diagnostico>(`/diagnostico/${id}/`, data);
    return response.data;
  }

  async deleteDiagnostico(id: number): Promise<void> {
    await api.delete(`/diagnostico/${id}/`);
  }

  async analizarIA(
    id: number,
  ): Promise<
    Clasificacion | { status: string; message: string; id_diagnostico: number }
  > {
    const response = await api.post(`/diagnostico/${id}/analizar/`);
    return response.data;
  }

  async getRetroalimentacionesByDiagnostico(
    id: number,
  ): Promise<Retroalimentacion[]> {
    const response = await api.get<Retroalimentacion[]>(`/retroalimentacion/`, {
      params: { diagnostico: id },
    });
    return response.data;
  }

  async cambiarEstado(id: number, id_estado: number): Promise<Diagnostico> {
    const response = await api.patch<Diagnostico>(
      `/diagnostico/${id}/cambiar_estado/`,
      { id_estado },
    );
    return response.data;
  }

  async descargarReportePDF(id: number): Promise<Blob> {
    const response = await api.get<Blob>(`/diagnostico/${id}/reporte_pdf/`, {
      responseType: "blob",
    });
    return response.data;
  }

  async verifyReports(): Promise<{ message: string; pdf_bytes: number }> {
    const response = await api.get<{ message: string; pdf_bytes: number }>(
      "/diagnostico/verificar_reportes/",
    );
    return response.data;
  }

  // Clasificaciones
  async getAllClasificaciones(): Promise<Clasificacion[]> {
    const response = await api.get<Clasificacion[]>("/clasificacion/");
    return response.data;
  }

  async getClasificacionById(id: number): Promise<Clasificacion> {
    const response = await api.get<Clasificacion>(`/clasificacion/${id}/`);
    return response.data;
  }

  async getAllModelos(): Promise<Modelo[]> {
    const response = await api.get<Modelo[]>("/modelo/");
    return response.data;
  }

  async getDeletedModelos(): Promise<Modelo[]> {
    const response = await api.get<Modelo[]>("/modelo/recycle_bin/");
    return response.data;
  }

  async softDeleteModelo(id: number): Promise<void> {
    await api.post(`/modelo/${id}/soft_delete/`);
  }

  async recoverModelo(id: number): Promise<void> {
    await api.post(`/modelo/${id}/recover/`);
  }

  async toggleProductionModelo(id: number): Promise<Modelo> {
    const response = await api.post<Modelo>(`/modelo/${id}/toggle_production/`);
    return response.data;
  }

  async trainCustomModelo(
    file: File | null,
    datasetName: string,
    customName: string,
  ): Promise<Record<string, unknown>> {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (datasetName) {
      formData.append("dataset_name", datasetName);
    }
    if (customName) {
      formData.append("custom_name", customName);
    }
    const response = await api.post("/modelo/entrenar_modelo/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async syncModelos(): Promise<Record<string, unknown>> {
    const response = await api.post("/modelo/sincronizar_modelos/");
    return response.data;
  }

  // Etiquetas
  async getAllEtiquetas(): Promise<EtiquetaClasificacion[]> {
    const response = await api.get<EtiquetaClasificacion[]>("/etiqueta/");
    return response.data;
  }

  // Retroalimentacion
  async createRetroalimentacion(
    data: Partial<Retroalimentacion>,
  ): Promise<Retroalimentacion> {
    const response = await api.post<Retroalimentacion>(
      "/retroalimentacion/",
      data,
    );
    return response.data;
  }

  async updateRetroalimentacion(
    id: number,
    data: Partial<Retroalimentacion>,
  ): Promise<Retroalimentacion> {
    const response = await api.patch<Retroalimentacion>(
      `/retroalimentacion/${id}/`,
      data,
    );
    return response.data;
  }

  // Others
  async getAllTiposInteraccion(): Promise<TipoInteraccion[]> {
    const response = await api.get<TipoInteraccion[]>("/tipo_interaccion/");
    return response.data;
  }

  async getAllGraficas(): Promise<Grafica[]> {
    const response = await api.get<Grafica[]>("/grafica/");
    return response.data;
  }
}
