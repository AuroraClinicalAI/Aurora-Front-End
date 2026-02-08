import { type ReactNode, useMemo } from 'react';
import { AuthService } from '../services/AuthService';
import { AuditoriaService } from '../services/AuditoriaService';
import { CommonService } from '../services/CommonService';
import { DiagnosticosService } from '../services/DiagnosticosService';
import { PacientesService } from '../services/PacientesService';
import { ReportesService } from '../services/ReportesService';
import { UsuariosService } from '../services/UsuariosService';
import { ServiceContext } from './useServices';

export const ServiceProvider = ({ children }: { children: ReactNode }) => {

  // We instantiate the services here. In the future, this could be more sophisticated
  // (e.g., using a DI container library, or passing config).
  // For now, simple instantiation is sufficient.
  const services = useMemo(() => ({
    authService: new AuthService(),
    auditoriaService: new AuditoriaService(),
    commonService: new CommonService(),
    diagnosticosService: new DiagnosticosService(),
    pacientesService: new PacientesService(),
    reportesService: new ReportesService(),
    usuariosService: new UsuariosService(),
  }), []);

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
