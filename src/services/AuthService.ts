import { type LoginResponse,type LoginData, type RegisterData, type RegisterResponse } from "@/types/AuthType";
import api from "@config/axios";

export const login = async (data: LoginData) => {
  const response = await api.post<LoginResponse>("/login/", data);
  const user = response.data.usuario;
  return user;
}
export const register = async (data: RegisterData) => {
  const response = await api.post<RegisterResponse>("/register/", data);
  const user = response.data.usuario;
  return user;
}