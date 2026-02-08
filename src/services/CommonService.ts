import api from "@/config/axios";
import type { Estado, TipoEstado } from "@/types/BackendTypes";
import type { ICommonService } from "./serviceInterfaces";

export class CommonService implements ICommonService {
  async getEstados(): Promise<Estado[]> {
    const response = await api.get<Estado[]>("/estado/");
    return response.data;
  }

  async getTiposEstado(): Promise<TipoEstado[]> {
    const response = await api.get<TipoEstado[]>("/tipo_estado/");
    return response.data;
  }
}
