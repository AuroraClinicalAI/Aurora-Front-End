import api from "@/config/axios";
import type { UserProfile } from "@/types/BackendTypes";
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
}
