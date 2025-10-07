import { type AuthData,type LoginData, type RegisterData, type RegisterResponse } from "@/types/AuthType";
import api from "@config/axios";

export const login = async (data: LoginData) => {
  const response = await api.post<AuthData>("/login/", data);
  return response.data;
}
export const register = async (data: RegisterData) => {
  const response = await api.post<RegisterResponse>("/register/", data);
  const user = response.data.usuario;
  return user;
}
export const logout = async () => {
  const response = await api.post("/logout/");
  return response;
}