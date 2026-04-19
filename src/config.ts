/**
 * Configuración global del frontend.
 * Valores parametrizables vía variables de entorno (VITE_*).
 */

/** Correo de soporte técnico – usado en mailto: y cualquier referencia al equipo de soporte. */
export const SUPPORT_EMAIL: string =
  import.meta.env.VITE_SUPPORT_EMAIL ?? "soporte@auroraudec.app";

/** URL base de la API del servidor. */
export const API_BASE_URL: string =
  import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";
