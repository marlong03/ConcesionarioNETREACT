import axios from "axios";
import { appsettings } from "../settings/settings";
const API_URL = appsettings.apiUrl + "Publicacion";

export async function listarPublicaciones() {
  try {
    const response = await axios.get(`${API_URL}/Lista`);
    return response.data;
  } catch (error) {
    console.error("Error al listar publicaciones:", error);
    throw error.response?.data || error;
  }
}

export async function listarPublicacionesDisponibles() {
  try {
    const response = await axios.get(`${API_URL}/ListaDisponibles`);
    return response.data;
  } catch (error) {
    console.error("Error al listar publicaciones:", error);
    throw error.response?.data || error;
  }
}

export async function crearPublicacion(publicacion) {
  try {
    const datosEnviar = {
      precio: Number(publicacion.precio),
      estadoDisponibilidad: publicacion.estado,
      esNuevo: publicacion.esNuevo,
      color: publicacion.color,
      kilometraje: Number(publicacion.kilometraje),
      vehiculoId: Number(publicacion.vehiculoId),
    };

    const response = await axios.post(`${API_URL}/Nuevo`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al crear publicacion:", error);
    throw error.response?.data || error;
  }
}

export async function editarPublicacion(id, publicacion) {
  try {
    const datosEnviar = {
      precio: Number(publicacion.precio),
      estadoDisponibilidad: publicacion.estado,
      esNuevo: publicacion.esNuevo,
      color: publicacion.color,
      kilometraje: Number(publicacion.kilometraje),
      vehiculoId: Number(publicacion.vehiculoId),
    };
    console.log(datosEnviar);

    const response = await axios.put(`${API_URL}/Editar/${id}`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al editar publicacion:", error);
    throw error.response?.data || error;
  }
}

export async function eliminarPublicacion(id) {
  try {
    const response = await axios.delete(`${API_URL}/Eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar publicacion:", error);
    throw error.response?.data || error;
  }
}
