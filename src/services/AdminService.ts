import api from "@/config/axios";
import type {
  AdminStats,
  PaginatedResponse,
  Solicitud,
} from "@/types/BackendTypes";
import type { IAdminService } from "./serviceInterfaces";

export class AdminService implements IAdminService {
  async getAdminStats(): Promise<AdminStats> {
    const response = await api.get<AdminStats>("/admin/stats/");
    return response.data;
  }

  async getSolicitudes(
    params?: Record<string, string>,
  ): Promise<PaginatedResponse<Solicitud>> {
    const response = await api.get<PaginatedResponse<Solicitud>>(
      "/solicitudes/",
      { params },
    );
    return response.data;
  }

  async createSolicitud(data: Partial<Solicitud>): Promise<Solicitud> {
    const response = await api.post<Solicitud>("/solicitudes/", data);
    return response.data;
  }

  async resolverSolicitud(
    id: number,
    data?: { nota_resolucion?: string },
  ): Promise<Solicitud> {
    const response = await api.post<Solicitud>(
      `/solicitudes/${id}/resolver/`,
      data ?? {},
    );
    return response.data;
  }
}
