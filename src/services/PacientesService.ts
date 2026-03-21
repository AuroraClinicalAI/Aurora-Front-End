import api from "@/config/axios";
import type { Paciente, RangoEdad } from "@/types/BackendTypes";
import type { IPacientesService } from "./serviceInterfaces";

export class PacientesService implements IPacientesService {
  async getAllPacientes(): Promise<Paciente[]> {
    const response = await api.get<Paciente[]>("/paciente/");
    return response.data;
  }

  async getPacienteById(id: number): Promise<Paciente> {
    const response = await api.get<Paciente>(`/paciente/${id}/`);
    return response.data;
  }

  async createPaciente(data: Partial<Paciente>): Promise<Paciente> {
    const response = await api.post<Paciente>("/paciente/", data);
    return response.data;
  }

  async updatePaciente(id: number, data: Partial<Paciente>): Promise<Paciente> {
    const response = await api.patch<Paciente>(`/paciente/${id}/`, data);
    return response.data;
  }

  async getAllRangosEdad(): Promise<RangoEdad[]> {
    const response = await api.get<RangoEdad[]>("/rango_edad/");
    return response.data;
  }
}
