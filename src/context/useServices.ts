import { createContext, useContext } from "react";
import type {
  IAuthService,
  IAuditoriaService,
  ICommonService,
  IDiagnosticosService,
  IPacientesService,
  IReportesService,
  IUsuariosService,
} from "../services/serviceInterfaces";

export interface IServiceContext {
  authService: IAuthService;
  auditoriaService: IAuditoriaService;
  commonService: ICommonService;
  diagnosticosService: IDiagnosticosService;
  pacientesService: IPacientesService;
  reportesService: IReportesService;
  usuariosService: IUsuariosService;
}

export const ServiceContext = createContext<IServiceContext | null>(null);

export const useServices = (): IServiceContext => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
