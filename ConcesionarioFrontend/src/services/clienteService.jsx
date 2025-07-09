import axios from "axios";
import { appsettings } from "../settings/settings";
const API_URL = appsettings.apiUrl + "Cliente";

export async function listarClientes() {
  try {
    const response = await axios.get(`${API_URL}/Lista`);
    return response.data;
  } catch (error) {
    console.error("Error al listar clientes:", error);
    throw error.response?.data || error;
  }
}

export async function crearCliente(cliente) {
  try {
    const datosEnviar = {
      nombre: cliente.nombre,
      documento: cliente.documento,
    };
    const response = await axios.post(`${API_URL}/Nuevo`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw error.response?.data || error;
  }
}

export async function editarCliente(id, cliente) {
  try {
    const datosEnviar = {
      nombre: cliente.nombre,
      documento: cliente.documento,
    };
    const response = await axios.put(`${API_URL}/Editar/${id}`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al editar cliente:", error);
    throw error.response?.data || error;
  }
}

export async function eliminarCliente(id) {
  try {
    const response = await axios.delete(`${API_URL}/Eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error.response?.data || error;
  }
}
