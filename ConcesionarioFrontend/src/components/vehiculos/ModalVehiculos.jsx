import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalGeneric from "../general/ModalGeneric";
import ModalEditarVehiculo from "./ModalEditarVehiculo";
import ModalEliminarVehiculo from "./ModalEliminarVehiculo";

function ModalVehiculos({
  vehiculoSeleccionado,
  cerrarModal,
  refrescarVehiculos,
}) {
  const [abrirEdicion, setAbrirEdicion] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);

  const handleCerrarModal = () => {
    cerrarModal();
  };

  return (
    <>
      <ModalGeneric open={!!vehiculoSeleccionado} onClose={handleCerrarModal}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6">Detalles del Vehiculo</Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              (Aquí puedes editar o eliminar el vehículo seleccionado)
            </Typography>
          </Box>
          <Button onClick={handleCerrarModal} variant="outlined">
            <CloseIcon />
          </Button>
        </Box>

        {vehiculoSeleccionado && (
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={3}
            mb={2}
          >
            {/* Imagen */}
            {vehiculoSeleccionado.imagenUrl && (
              <Box flex="1">
                <img
                  src={vehiculoSeleccionado.imagenUrl}
                  alt="Vehículo"
                  style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 10 }}
                />
              </Box>
            )}

            {/* Características */}
            <Box flex="1">
              <Typography variant="h6" gutterBottom>
                Características del Vehículo
              </Typography>

              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body1">
                  <strong>Modelo:</strong> {vehiculoSeleccionado.modelo}
                </Typography>
                <Typography variant="body1">
                  <strong>Tipo:</strong> {vehiculoSeleccionado.tipo}
                </Typography>
                {vehiculoSeleccionado.puertas && (
                  <Typography variant="body1">
                    <strong>Puertas:</strong>{" "}
                    {vehiculoSeleccionado.puertas || "N/A"}
                  </Typography>
                )}
                {vehiculoSeleccionado.cilindraje && (
                  <Typography variant="body1">
                    <strong>Cilindraje:</strong>{" "}
                    {vehiculoSeleccionado.cilindraje || "N/A"}
                  </Typography>
                )}
                {vehiculoSeleccionado.velocidades && (
                  <Typography variant="body1">
                    <strong>Velocidades:</strong>{" "}
                    {vehiculoSeleccionado.velocidades || "N/A"}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setAbrirEdicion(true)}
            sx={{ mx: 1 }}
            variant="outlined"
          >
            <EditIcon />
          </Button>

          <Button
            onClick={() => setAbrirEliminar(true)}
            sx={{ mx: 1 }}
            variant="outlined"
          >
            <DeleteIcon />
          </Button>
        </Box>
      </ModalGeneric>
      {abrirEdicion && (
        <ModalEditarVehiculo
          abrirEdicion={abrirEdicion}
          setAbrirEdicion={setAbrirEdicion}
          vehiculoSeleccionado={vehiculoSeleccionado}
          refrescarVehiculos={refrescarVehiculos}
          handleCerrarModal={handleCerrarModal}
        />
      )}
      {abrirEliminar && (
        <ModalEliminarVehiculo
          abrirEliminar={abrirEliminar}
          setAbrirEliminar={setAbrirEliminar}
          vehiculoSeleccionado={vehiculoSeleccionado}
          refrescarVehiculos={refrescarVehiculos}
          handleCerrarModal={handleCerrarModal}
        />
      )}
    </>
  );
}

export default ModalVehiculos;
