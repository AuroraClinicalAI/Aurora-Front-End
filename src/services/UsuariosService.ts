import api from "@/config/axios";
import type {
  PaginatedResponse,
  UserProfile,
  ActivityStatistics,
  InvitationResponse,
  InvitationCheckResponse,
} from "@/types/BackendTypes";
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

  async getSelfActivityStatistics(): Promise<ActivityStatistics> {
    const response = await api.get<ActivityStatistics>(
      "/me/activity-statistics/",
    );
    return response.data;
  }

  async invitarUsuario(correo: string, tipo_usuario: string): Promise<InvitationResponse> {
    const response = await api.post<InvitationResponse>("/usuarios/invitar/", {
      correo,
      tipo_usuario,
    });
    return response.data;
  }

  async renovarInvitacion(correo: string): Promise<InvitationResponse> {
    const response = await api.post<InvitationResponse>("/usuarios/invitar-renovar/", {
      correo,
    });
    return response.data;
  }

  async checkInvitationToken(token: string): Promise<InvitationCheckResponse> {
    const response = await api.get<InvitationCheckResponse>("/invitation-check/", {
      params: { token },
    });
    return response.data;
  }

  async registerWithInvitation(data: Record<string, string>): Promise<{ message: string; usuario: UserProfile }> {
    const response = await api.post<{ message: string; usuario: UserProfile }>("/register-invitation/", data);
    return response.data;
  }
}
