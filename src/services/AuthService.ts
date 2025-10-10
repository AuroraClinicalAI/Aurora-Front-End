import { type AuthData,type LoginData, type RegisterData, type RegisterResponse, type UpdatePasswordData, type UpdateUserData } from "@/types/AuthType";
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
export const updateName = async (data: UpdateUserData) => {
  const response = await api.put("/user/", data);
  return response;
}
export const changePassword = async (data: UpdatePasswordData) => {
  const response = await api.put("/changepassword", data);
  return response;
}