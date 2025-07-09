import axios from "axios";
import { appsettings } from "../settings/settings";
const API_URL = appsettings.apiUrl + "Venta";

export async function listarVentas() {
  try {
    const response = await axios.get(`${API_URL}/Lista`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error.response?.data || error;
  }
}

export async function obtenerVentasPorCliente(id) {
  try {
    const response = await axios.get(
      `${API_URL}/ObtenerVentasPorCliente/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error.response?.data || error;
  }
}

export async function crearVenta(venta) {
  try {
    const datosEnviar = {
      clienteId: Number(venta.clienteId),
      publicacionId: Number(venta.publicacionId),
    };
    const response = await axios.post(`${API_URL}/Nuevo`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al crear venta:", error);
    throw error.response?.data || error;
  }
}

export async function editarVenta(id, venta) {
  try {
    const datosEnviar = {
      clienteId: Number(venta.clienteId),
      publicacionId: Number(venta.publicacionId),
    };
    const response = await axios.put(`${API_URL}/Editar/${id}`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al editar venta:", error);
    throw error.response?.data || error;
  }
}
export async function eliminarVenta(id) {
  try {
    const response = await axios.delete(`${API_URL}/Eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    throw error.response?.data || error;
  }
}
