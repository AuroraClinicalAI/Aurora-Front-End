import axios from "axios";

// This will be configured with the actual API base URL in the future
const API_URL = "/api";

export const getDiagnosticoById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/diagnosticos/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diagnosis:", error);
    throw error;
  }
};

export const createDiagnostico = async (data: unknown) => {
  try {
    const response = await axios.post(`${API_URL}/diagnosticos/`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating diagnosis:", error);
    throw error;
  }
};
