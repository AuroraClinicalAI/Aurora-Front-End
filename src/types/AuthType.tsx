import type { User } from "@/types/ModelType";

export interface LoginData {
  correo: string;
  clave: string;
}
export interface AuthData {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

export interface RegisterData {
  nombre?: string;
  correo: string;
  nombre_usuario: string;
  tipo_usuario: number;
  clave: string;
  confirmar_clave: string;
  imagen?: string;
}
export interface UpdateUserData {
  nombre: string;
}
export interface UpdatePasswordData {
  clave: string;
  nueva_clave: string;
  confirmar_nueva_clave: string;
}
export interface RegisterResponse {
  usuario: User;
}
export interface UserState extends AuthData {
  loading: boolean;
  isAuthenticated: boolean;
}