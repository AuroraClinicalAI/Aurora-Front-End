import {
  type AuthData,
  type LoginData,
  type RegisterData,
  type RegisterResponse,
  type UpdatePasswordData,
  type UpdateUserData,
} from "@/types/AuthType";
import api from "@config/axios";

export const login = async (data: LoginData) => {
  const response = await api.post<AuthData>("/login/", data);
  return response.data;
};
export const register = async (data: RegisterData) => {
  const response = await api.post<RegisterResponse>("/register/", data);
  const user = response.data.usuario;
  return user;
};
export const logout = async () => {
  const response = await api.post("/logout/");
  return response;
};
export const updateProfile = async (data: Partial<UpdateUserData>) => {
  const response = await api.patch("/me/", data);
  return response.data;
};
export const changePassword = async (data: UpdatePasswordData) => {
  const response = await api.put("/change-password/", data);
  return response.data;
};
export const checkUsername = async (username: string) => {
  const response = await api.get<{ existe: boolean }>(
    `/check_nombre_usuario/?nombre_usuario=${username}`,
  );
  return response.data;
};
export const activateAccount = async (token: string) => {
  const response = await api.post("/activate/", { token });
  return response.data;
};
