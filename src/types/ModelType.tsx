export interface UserType {
  id_tipo_usuario: number;
  tipo_usuario: string;
}
export interface User {
  id: number;
  nombre?: string;
  correo: string;
  nombre_usuario: string;
  tipo_usuario: string;
  tipo_usuario_info: UserType;
  role_name: string;
  last_login: string;
}