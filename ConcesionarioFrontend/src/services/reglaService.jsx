import axios from "axios";
import { appsettings } from "../settings/settings";
const API_URL = appsettings.apiUrl + "ReglaPrecio";

export async function listarReglas() {
  try {
    const response = await axios.get(`${API_URL}/Lista`);
    return response.data;
  } catch (error) {
    console.error("Error al listar reglas:", error);
    throw error.response?.data || error;
  }
}

export async function crearRegla(regla) {
  try {
    const datosEnviar = {
      precio: Number(regla.precio),
      vehiculoId: Number(regla.vehiculoId),
    };

    const response = await axios.post(`${API_URL}/Nuevo`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al crear regla:", error);
    throw error.response?.data || error;
  }
}

export async function editarRegla(id, regla) {
  try {
    const datosEnviar = {
      precio: Number(regla.precio),
      vehiculoId: Number(regla.vehiculoId),
    };

    const response = await axios.put(`${API_URL}/Editar/${id}`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al editar regla:", error);
    throw error.response?.data || error;
  }
}

export async function eliminarRegla(id) {
  try {
    const response = await axios.delete(`${API_URL}/Eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar regla:", error);
    throw error.response?.data || error;
  }
}
