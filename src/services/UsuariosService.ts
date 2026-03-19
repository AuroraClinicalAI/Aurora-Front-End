import api from "@/config/axios";
import type { PaginatedResponse, UserProfile } from "@/types/BackendTypes";
import type { IUsuariosService } from "./serviceInterfaces";

export class UsuariosService implements IUsuariosService {
  async getAllUsuarios(): Promise<UserProfile[]> {
    const response = await api.get<UserProfile[]>("/usuarios/");
    return response.data;
  }

  async getUsuarioById(id: number): Promise<UserProfile> {
    const response = await api.get<UserProfile>(`/usuarios/${id}/`);
    return response.data;
  }

  async updateUsuario(
    id: number,
    data: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const response = await api.patch<UserProfile>(`/usuarios/${id}/`, data);
    return response.data;
  }

  async getAllUsuariosPaginated(
    params?: Record<string, string>,
  ): Promise<PaginatedResponse<UserProfile>> {
    const response = await api.get<PaginatedResponse<UserProfile>>(
      "/usuarios/",
      { params },
    );
    return response.data;
  }

  async desactivarUsuario(id: number): Promise<void> {
    await api.post(`/usuarios/${id}/desactivar/`);
  }
}
