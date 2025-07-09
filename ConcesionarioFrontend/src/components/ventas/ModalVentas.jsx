import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModalClientes from "../clientes/ModalClientes";
import ModalGeneric from "../general/ModalGeneric";
import ModalEditarVenta from "./ModalEditarVenta";
import ModalEliminarVenta from "./ModalEliminarVenta";
import { formatoMonedaColombiana } from "../general/Utils";

function ModalVentas({ ventaSeleccionado, cerrarModal, refrescarVentas }) {
  const [abrirEdicion, setAbrirEdicion] = useState(false);
  const [abrirModalCliente, setAbrirModalCliente] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);

  const handleCerrarModal = () => {
    cerrarModal();
  };

  return (
    <>
      <ModalGeneric open={!!ventaSeleccionado} onClose={handleCerrarModal}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6">Detalles de la Venta</Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              (Aquí puedes editar o eliminar la venta seleccionada)
            </Typography>
          </Box>
          <Button onClick={handleCerrarModal} variant="outlined">
            <CloseIcon />
          </Button>
        </Box>

        {ventaSeleccionado && (
          <Box>
            <Typography variant="h6">
              Cliente
              <Button
                size="small"
                sx={{ ml: 1 }}
                onClick={() => setAbrirModalCliente(true)}
              >
                <RemoveRedEyeIcon className="px-1" />
                Ver
              </Button>
            </Typography>
            <Typography>
              <strong>Nombre:</strong> {ventaSeleccionado.cliente?.nombre}
              <br />
              <strong>Documento:</strong> {ventaSeleccionado.cliente?.documento}
            </Typography>
            <hr />
          </Box>
        )}

        {ventaSeleccionado && (
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={3}
            mb={2}
          >
            {/* Imagen */}
            {ventaSeleccionado.publicacion?.vehiculo?.imagenUrl && (
              <Box flex="1">
                <img
                  src={ventaSeleccionado.publicacion?.vehiculo?.imagenUrl}
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
                  <strong>Modelo:</strong>{" "}
                  {ventaSeleccionado.publicacion.vehiculo?.modelo}
                </Typography>
                <Typography variant="body1">
                  <strong>Tipo:</strong>{" "}
                  {ventaSeleccionado.publicacion.vehiculo?.tipo}
                </Typography>
                {ventaSeleccionado.publicacion.vehiculo?.puertas && (
                  <Typography variant="body1">
                    <strong>Puertas:</strong>{" "}
                    {ventaSeleccionado.publicacion.vehiculo?.puertas}
                  </Typography>
                )}
                {ventaSeleccionado.publicacion.vehiculo?.cilindraje && (
                  <Typography variant="body1">
                    <strong>Cilindraje:</strong>{" "}
                    {ventaSeleccionado.publicacion.vehiculo?.cilindraje}
                  </Typography>
                )}
                {ventaSeleccionado.publicacion.vehiculo?.velocidades && (
                  <Typography variant="body1">
                    <strong>Velocidades:</strong>{" "}
                    {ventaSeleccionado.publicacion.vehiculo?.velocidades}
                  </Typography>
                )}
                <Typography>
                  <strong>Precio:</strong>{" "}
                  {formatoMonedaColombiana(
                    ventaSeleccionado.publicacion?.precio
                  )}
                </Typography>
                <Typography>
                  <strong>Color:</strong>{" "}
                  {ventaSeleccionado.publicacion?.color}
                </Typography>
                <Typography>
                  <strong>Kilometraje:</strong>{" "}
                  {ventaSeleccionado.publicacion?.kilometraje}
                </Typography>
                <Typography>
                  <strong>Vehículo nuevo?:</strong>{" "}
                  {ventaSeleccionado.publicacion?.esNuevo ? "Nuevo" : "Usado"}
                </Typography>
                <Typography>
                  <strong>Fecha Creación:</strong>{" "}
                  {new Intl.DateTimeFormat("es-CO", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(
                    new Date(ventaSeleccionado.publicacion?.fechaCreacion)
                  )}
                </Typography>
                <Typography>
                  <strong>Estado disponibilidad:</strong>{" "}
                  {ventaSeleccionado.publicacion.estadoDisponibilidad
                    .charAt(0)
                    .toUpperCase() +
                    ventaSeleccionado.publicacion.estadoDisponibilidad
                      .slice(1)
                      .toLowerCase()}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        
      </ModalGeneric>

      {abrirModalCliente && (
        <ModalClientes
          clienteSeleccionado={ventaSeleccionado.cliente}
          cerrarModal={() => setAbrirModalCliente(false)}
        />
      )}

      {abrirEdicion && (
        <ModalEditarVenta
          abrirEdicion={abrirEdicion}
          setAbrirEdicion={setAbrirEdicion}
          ventaSeleccionado={ventaSeleccionado}
          refrescarVentas={refrescarVentas}
          handleCerrarModal={handleCerrarModal}
        />
      )}

      {abrirEliminar && (
        <ModalEliminarVenta
          abrirEliminar={abrirEliminar}
          setAbrirEliminar={setAbrirEliminar}
          ventaSeleccionado={ventaSeleccionado}
          refrescarVentas={refrescarVentas}
          handleCerrarModal={handleCerrarModal}
        />
      )}
    </>
  );
}

export default ModalVentas;
