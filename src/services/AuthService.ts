import api from "@/config/axios";
import type {
  AuthData,
  LoginData,
  RegisterData,
  RegisterResponse,
  UpdatePasswordData,
  UpdateUserData,
} from "@/types/AuthType";
import type { UserProfile } from "@/types/BackendTypes";
import type { IAuthService } from "./serviceInterfaces";

export class AuthService implements IAuthService {
  async login(data: LoginData): Promise<AuthData> {
    const response = await api.post<AuthData>("/login/", data);
    return response.data;
  }

  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("/register/", data);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await api.post("/logout/");
    } catch {
      // Silently ignore logout errors
    }
  }

  async updateProfile(data: Partial<UpdateUserData>): Promise<UserProfile> {
    let payload: Partial<UpdateUserData> | FormData = data;

    if (data.imagen instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value as string | Blob);
        }
      });
      payload = formData;
    }

    const response = await api.patch("/me/", payload, {
      headers:
        payload instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
    });
    return response.data;
  }

  async changePassword(data: UpdatePasswordData): Promise<void> {
    await api.put("/change-password/", data);
  }

  async checkUsername(username: string): Promise<{ existe: boolean }> {
    const response = await api.post<{ existe: boolean }>(
      "/check_nombre_usuario/",
      { nombre_usuario: username },
    );
    return response.data;
  }

  async activateAccount(token: string): Promise<void> {
    await api.post("/activate/", { token });
  }

  async resendActivation(email: string): Promise<void> {
    await api.post("/resend-activation/", { correo: email });
  }

  async requestPasswordReset(email: string): Promise<void> {
    await api.post("/password-reset/", { correo: email });
  }

  async confirmPasswordReset(data: Record<string, string>): Promise<void> {
    await api.post("/password-reset-confirm/", data);
  }

  async getMe(): Promise<UserProfile> {
    const response = await api.get<UserProfile>("/me/");
    return response.data;
  }
}
