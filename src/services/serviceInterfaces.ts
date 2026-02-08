import type {
  LoginData,
  RegisterData,
  UpdateUserData,
  UpdatePasswordData,
  AuthData,
  RegisterResponse,
} from "@/types/AuthType";
import type {
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
  RangoEdad,
  Reporte,
  UserProfile,
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
  confirmPasswordReset(data: any): Promise<void>;
  getMe(): Promise<UserProfile>;
}

export interface IAuditoriaService {
  getAll(): Promise<Auditoria[]>;
  getById(id: number): Promise<Auditoria>;
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

  // Clasificaciones
  getAllClasificaciones(): Promise<Clasificacion[]>;
  getClasificacionById(id: number): Promise<Clasificacion>;

  // Modelos
  getAllModelos(): Promise<Modelo[]>;

  // Etiquetas
  getAllEtiquetas(): Promise<EtiquetaClasificacion[]>;

  // Retroalimentacion
  createRetroalimentacion(
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
  downloadReporte(id: number): Promise<Blob>; // Assuming download capability
}

export interface IUsuariosService {
  getAllUsuarios(): Promise<UserProfile[]>;
  getUsuarioById(id: number): Promise<UserProfile>;
  updateUsuario(id: number, data: Partial<UserProfile>): Promise<UserProfile>;
  // Permissions handled via specialized endpoints or included in user profile
}
