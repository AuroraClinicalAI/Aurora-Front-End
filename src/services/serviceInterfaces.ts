import type {
  LoginData,
  RegisterData,
  UpdateUserData,
  UpdatePasswordData,
  AuthData,
  RegisterResponse,
} from "@/types/AuthType";
import type {
  AdminStats,
  Auditoria,
  Estado,
  TipoEstado,
  Diagnostico,
  Clasificacion,
  EtiquetaClasificacion,
  Modelo,
  Retroalimentacion,
  TipoInteraccion,
  Grafica,
  Paciente,
  PaginatedResponse,
  RangoEdad,
  Reporte,
  UserProfile,
  PQRS,
  Solicitud,
  ActivityStatistics,
  ResearchSummary,
  PopulationData,
  PatternsData,
  CohortData,
  ResearchFilters,
  ExportParams,
  SystemHealth,
  ValidationMetrics,
} from "@/types/BackendTypes";

export interface IAuthService {
  login(data: LoginData): Promise<AuthData>;
  register(data: RegisterData): Promise<RegisterResponse>;
  logout(): Promise<void>;
  updateProfile(data: Partial<UpdateUserData>): Promise<UserProfile>;
  changePassword(data: UpdatePasswordData): Promise<void>;
  checkUsername(username: string): Promise<{ existe: boolean }>;
  activateAccount(token: string): Promise<void>;
  resendActivation(email: string): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  confirmPasswordReset(data: Record<string, string>): Promise<void>;
  getMe(): Promise<UserProfile>;
}

export interface IAuditoriaService {
  getAll(): Promise<Auditoria[]>;
  getById(id: number): Promise<Auditoria>;
  exportAudits(): Promise<Blob>;
}

export interface ICommonService {
  getEstados(): Promise<Estado[]>;
  getTiposEstado(): Promise<TipoEstado[]>;
}

export interface IDiagnosticosService {
  // Diagnosticos
  getAllDiagnosticos(): Promise<Diagnostico[]>;
  getDiagnosticoById(id: number): Promise<Diagnostico>;
  createDiagnostico(data: Partial<Diagnostico>): Promise<Diagnostico>;
  updateDiagnostico(
    id: number,
    data: Partial<Diagnostico>,
  ): Promise<Diagnostico>;
  deleteDiagnostico(id: number): Promise<void>;
  analizarIA(
    id: number,
    modelVersion?: string,
  ): Promise<
    Clasificacion | { status: string; message: string; id_diagnostico: number }
  >;
  getRetroalimentacionesByDiagnostico(id: number): Promise<Retroalimentacion[]>;
  cambiarEstado(id: number, id_estado: number): Promise<Diagnostico>;
  descargarReportePDF(id: number): Promise<Blob>;

  // Clasificaciones
  getAllClasificaciones(): Promise<Clasificacion[]>;
  getClasificacionById(id: number): Promise<Clasificacion>;

  // Modelos
  getAllModelos(): Promise<Modelo[]>;
  getDeletedModelos(): Promise<Modelo[]>;
  softDeleteModelo(id: number): Promise<void>;
  recoverModelo(id: number): Promise<void>;
  toggleProductionModelo(id: number): Promise<Modelo>;
  trainCustomModelo(
    file: File | null,
    datasetName: string,
    customName: string,
    algorithm: string,
    hyperparameters: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  syncModelos(): Promise<Record<string, unknown>>;

  // Etiquetas
  getAllEtiquetas(): Promise<EtiquetaClasificacion[]>;

  // Retroalimentacion
  createRetroalimentacion(
    data: Partial<Retroalimentacion>,
  ): Promise<Retroalimentacion>;
  updateRetroalimentacion(
    id: number,
    data: Partial<Retroalimentacion>,
  ): Promise<Retroalimentacion>;

  // Others
  getAllTiposInteraccion(): Promise<TipoInteraccion[]>;
  getAllGraficas(): Promise<Grafica[]>;
}

export interface IPacientesService {
  getAllPacientes(): Promise<Paciente[]>;
  getPacienteById(id: number): Promise<Paciente>;
  createPaciente(data: Partial<Paciente>): Promise<Paciente>;
  updatePaciente(id: number, data: Partial<Paciente>): Promise<Paciente>;

  getAllRangosEdad(): Promise<RangoEdad[]>;
}

export interface IReportesService {
  getAllReportes(): Promise<Reporte[]>;
  getReporteById(id: number): Promise<Reporte>;
  createReporte(data: Partial<Reporte>): Promise<Reporte>;
  downloadReporte(id: number): Promise<Blob>;
  verifyReports(): Promise<{ message: string; pdf_bytes: number }>;

  // PQRS
  getAllPQRS(): Promise<PQRS[]>;
  createPQRS(data: Partial<PQRS>): Promise<PQRS>;
  marcarPQRSLeido(id: number): Promise<PQRS>;
  responderPQRS(id: number, respuesta: string): Promise<PQRS>;
  testUploadModel(
    file: File,
    dataset?: string,
    customName?: string,
  ): Promise<{ message: string; filas: number }>;
}

export interface IUsuariosService {
  getAllUsuarios(): Promise<UserProfile[]>;
  getUsuarioById(id: number): Promise<UserProfile>;
  updateUsuario(id: number, data: Partial<UserProfile>): Promise<UserProfile>;
  getAllUsuariosPaginated(
    params?: Record<string, string>,
  ): Promise<PaginatedResponse<UserProfile>>;
  desactivarUsuario(id: number): Promise<void>;
  getSelfActivityStatistics(): Promise<ActivityStatistics>;
}

export interface IAnalyticsService {
  getSummary(params?: ExportParams): Promise<ResearchSummary>;
  getPopulation(params?: ExportParams): Promise<PopulationData>;
  getPatterns(params?: ExportParams): Promise<PatternsData>;
  getCohorts(params?: ExportParams): Promise<CohortData[]>;
  getFilters(): Promise<ResearchFilters>;
  exportData(params: ExportParams): Promise<Blob | unknown>;
  getSystemHealth(): Promise<SystemHealth>;
  getValidationMetrics(): Promise<ValidationMetrics>;
}

export interface IAdminService {
  getAdminStats(): Promise<AdminStats>;
  getSolicitudes(
    params?: Record<string, string>,
  ): Promise<PaginatedResponse<Solicitud>>;
  createSolicitud(data: Partial<Solicitud>): Promise<Solicitud>;
  resolverSolicitud(
    id: number,
    data?: { nota_resolucion?: string },
  ): Promise<Solicitud>;
}
