/**
 * Configuración global del frontend.
 * Valores parametrizables vía variables de entorno (VITE_*).
 */

/** Correo de soporte técnico – usado en mailto: y cualquier referencia al equipo de soporte. */
export const SUPPORT_EMAIL: string =
  import.meta.env.VITE_SUPPORT_EMAIL ?? "soporte@auroraudec.app";
