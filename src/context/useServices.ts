import { createContext, useContext } from "react";
import type {
  IAdminService,
  IAuthService,
  IAuditoriaService,
  ICommonService,
  IDiagnosticosService,
  IPacientesService,
  IReportesService,
  IUsuariosService,
} from "../services/serviceInterfaces";
import type { IAnalyticsService } from "../services/AnalyticsService";

export interface IServiceContext {
  adminService: IAdminService;
  authService: IAuthService;
  auditoriaService: IAuditoriaService;
  commonService: ICommonService;
  diagnosticosService: IDiagnosticosService;
  pacientesService: IPacientesService;
  reportesService: IReportesService;
  usuariosService: IUsuariosService;
  analyticsService: IAnalyticsService;
}

export const ServiceContext = createContext<IServiceContext | null>(null);

export const useServices = (): IServiceContext => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
