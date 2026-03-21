export const UserRole = {
  PRACTICANTE: "PRACTICANTE",
  ADMIN: "ADMIN",
  MODERADOR: "MODERADOR",
  PSICOLOGO: "PSICOLOGO",
  EVALUADOR: "EVALUADOR",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ALL_ROLES = [
  UserRole.PRACTICANTE,
  UserRole.ADMIN,
  UserRole.MODERADOR,
  UserRole.PSICOLOGO,
  UserRole.EVALUADOR,
];
