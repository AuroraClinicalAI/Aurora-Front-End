import api from "@config/axios";

export const get = async <T>(url: string): Promise<T> => {
  const response = await api.get(url);
  return response.data;
}
