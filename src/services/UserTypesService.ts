import api from "@/config/axios";
import type { UserType } from "@/types/ModelType";

export const getUserTypes = async (): Promise<UserType[]> => {
  const response = await api.get<UserType[]>("tipo_usuario/");
  return response.data;
}