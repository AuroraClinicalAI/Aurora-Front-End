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

  // Clasificaciones
  async getAllClasificaciones(): Promise<Clasificacion[]> {
    const response = await api.get<Clasificacion[]>("/clasificacion/");
    return response.data;
  }

  async getClasificacionById(id: number): Promise<Clasificacion> {
    const response = await api.get<Clasificacion>(`/clasificacion/${id}/`);
    return response.data;
  }

  // Modelos
  async getAllModelos(): Promise<Modelo[]> {
    const response = await api.get<Modelo[]>("/modelo/");
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
