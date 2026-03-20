import { type ReactNode, useMemo } from 'react';
import { AdminService } from '../services/AdminService';
import { AuthService } from '../services/AuthService';
import { AuditoriaService } from '../services/AuditoriaService';
import { CommonService } from '../services/CommonService';
import { DiagnosticosService } from '../services/DiagnosticosService';
import { PacientesService } from '../services/PacientesService';
import { ReportesService } from '../services/ReportesService';
import { UsuariosService } from '../services/UsuariosService';
import { AnalyticsService } from '../services/AnalyticsService';
import { ServiceContext } from './useServices';

export const ServiceProvider = ({ children }: { children: ReactNode }) => {

  const services = useMemo(() => ({
    adminService: new AdminService(),
    authService: new AuthService(),
    auditoriaService: new AuditoriaService(),
    commonService: new CommonService(),
    diagnosticosService: new DiagnosticosService(),
    pacientesService: new PacientesService(),
    reportesService: new ReportesService(),
    usuariosService: new UsuariosService(),
    analyticsService: new AnalyticsService(),
  }), []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
