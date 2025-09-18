import type { User } from "@/types/ModelType";

export interface LoginData {
  correo: string;
  clave: string;
}
export interface LoginResponse {
  usuario: User;
}

export interface RegisterData {
  nombre?: string;
  correo: string;
  nombre_usuario: string;
  tipo_usuario: number;
  clave: string;
  confirmar_clave: string;
}
export interface RegisterResponse {
  usuario: User;
}