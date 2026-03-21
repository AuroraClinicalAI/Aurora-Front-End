import type { User } from "@/types/ModelType";

export interface LoginData {
  correo: string;
  clave: string;
}
export interface AuthData {
  usuario: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

export interface RegisterData {
  nombre?: string;
  correo: string;
  nombre_usuario: string;
  clave: string;
  confirmar_clave: string;
  imagen?: string;
}
export interface UpdateUserData {
  nombre: string;
  imagen?: File;
}
export interface UpdatePasswordData {
  correo: string;
  clave: string;
  nueva_clave: string;
  confirmar_clave: string;
}
export interface RegisterResponse {
  usuario: User;
}
export interface UserState extends AuthData {
  loading: boolean;
  isAuthenticated: boolean;
}
