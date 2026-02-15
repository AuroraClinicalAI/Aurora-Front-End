export interface Estado {
  id_estado: number;
  nombre: string;
  descripcion?: string;
  tipo: number; // FK ID
}

export interface TipoEstado {
  id_tipo_estado: number;
  nombre: string;
}

export interface Auditoria {
  id_auditoria: number;
  fecha_inicio: string;
  fecha_fin: string;
  autor_auditoria: number; // User ID
  tipo_cambio: string;
  descripcion: string;
}

export interface Clasificacion {
  id_clasificacion: number;
  id_diagnostico: number;
  id_etiqueta: number;
  modelo_usado: string;
  probabilidad_certeza: number;
  estado: string;
}

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | JSONValue[]
  | null;

export interface SintomaIdentificado {
  name: string;
  intensity: number;
}

export interface Diagnostico {
  id_diagnostico: number;
  id_practicante: number;
  id_paciente: number;
  nombre: string;
  historia_clinica: string;
  tamizaje: JSONValue;
  impresion_clinica: string;
  hipotesis_diagnostica: string;
  fecha: string;
  estado: string | number | Estado;
  sintomas_identificados?: SintomaIdentificado[];
}

export interface EtiquetaClasificacion {
  id_etiqueta: number;
  nombre_etiqueta: string;
  descripcion: string;
}

export interface Paciente {
  id_paciente: number;
  rango_edad: number;
  sexo: number;
}

export interface RangoEdad {
  id_rango_edad: number;
  nombre_rango: string;
  descripcion: string;
}

export interface Reporte {
  id_reporte: number;
  nombre_reporte: string;
  descripcion: string;
  fecha_creacion: string;
  autor: number;
  ruta_archivo: string;
  clasificacion_utilizada: string;
}

export interface UserPermission {
  id: number;
  name: string;
  codename: string;
}

export interface UserProfile {
  id: number;
  nombre?: string;
  correo: string;
  nombre_usuario: string;
  tipo_usuario: string;
  last_login: string;
  imagen?: string;
  permissions?: string[]; // strings or objects depending on serializer
}

export interface Modelo {
  id_modelo: number;
  nombre_modelo: string;
  fecha_entrenamiento: string;
  precision: number;
}

export interface Retroalimentacion {
  id: number;
  supervisor: number;
  diagnostico: number;
  titulo: string;
  comentario: string;
  estado: string;
  tipo_interaccion: number; // FK
  fecha: string;
}

export interface TipoInteraccion {
  id_tipo_interaccion: number;
  nombre: string;
  descripcion: string;
}

export interface Grafica {
  id_grafica: number;
  nombre_grafica: string;
}

export interface PQRS {
  id_pqrs: number;
  usuario: number;
  tipo: "PETICION" | "QUEJA" | "RECLAMO" | "SUGERENCIA";
  asunto: string;
  mensaje: string;
  fecha_creacion: string;
  leido: boolean;
}
