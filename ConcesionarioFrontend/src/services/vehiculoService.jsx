import axios from "axios";
import { appsettings } from "../settings/settings";
const API_URL = appsettings.apiUrl + "Vehiculo";

export async function listarVehiculos() {
  try {
    const response = await axios.get(`${API_URL}/Lista`);
    return response.data;
  } catch (error) {
    console.error("Error al listar vehiculos:", error);
    throw error.response?.data || error;
  }
}

export async function crearVehiculo(vehiculo) {
  try {
    const datosEnviar = {
      modelo: vehiculo.modelo,
      tipo: vehiculo.tipo,
      imagenUrl: vehiculo.imagenUrl,
      puertas: vehiculo.puertas ? Number(vehiculo.puertas) : null,
      cilindraje: vehiculo.cilindraje ? Number(vehiculo.cilindraje) : null,
      velocidades: vehiculo.velocidades ? Number(vehiculo.velocidades) : null,
    };

    const response = await axios.post(`${API_URL}/Nuevo`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al crear vehiculo:", error);
    throw error.response?.data || error;
  }
}

export async function editarVehiculo(id, vehiculo) {
  try {
    const datosEnviar = {
      modelo: vehiculo.modelo,
      tipo: vehiculo.tipo,
      imagenUrl: vehiculo.imagenUrl,
      puertas: vehiculo.puertas ? Number(vehiculo.puertas) : null,
      cilindraje: vehiculo.cilindraje ? Number(vehiculo.cilindraje) : null,
      velocidades: vehiculo.velocidades ? Number(vehiculo.velocidades) : null,
    };
    const response = await axios.put(`${API_URL}/Editar/${id}`, datosEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al editar vehiculo:", error);
    throw error.response?.data || error;
  }
}

export async function eliminarVehiculo(id) {
  try {
    const response = await axios.delete(`${API_URL}/Eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar vehiculo:", error);
    throw error.response?.data || error;
  }
}
export async function subirImagenVehiculo(file) {
  const formData = new FormData();
  formData.append("imagen", file);

  try {
    const response = await axios.post(`${API_URL}/SubirImagen`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
}
