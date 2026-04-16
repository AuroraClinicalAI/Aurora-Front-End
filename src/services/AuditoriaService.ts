import api from "@/config/axios";
import type { Auditoria } from "@/types/BackendTypes";
import type { IAuditoriaService } from "./serviceInterfaces";

export class AuditoriaService implements IAuditoriaService {
  async getAll(): Promise<Auditoria[]> {
    const response = await api.get<Auditoria[]>("/auditoria/");
    return response.data;
  }

  async getById(id: number): Promise<Auditoria> {
    const response = await api.get<Auditoria>(`/auditoria/${id}/`);
    return response.data;
  }

  async exportAudits(): Promise<Blob> {
    const response = await api.get<Blob>("/auditoria/exportar/", {
      responseType: "blob",
    });
    return response.data;
  }
}
