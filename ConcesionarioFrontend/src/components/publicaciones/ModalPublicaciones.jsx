import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalGeneric from "../general/ModalGeneric";
import ModalEditarPublicacion from "./ModalEditarPublicacion";
import ModalEliminarPublicacion from "./ModalEliminarPublicacion";
import ModalVenderPublicacion from "./ModalVenderPublicacion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { formatoMonedaColombiana } from "../general/Utils";

function ModalPublicaciones({
  publicacionSeleccionado,
  cerrarModal,
  refrescarPublicaciones,
  onVentaSeleccionada,
}) {
  const [abrirEdicion, setAbrirEdicion] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);
  const [abrirVender, setAbrirVender] = useState(false);

  const handleCerrarModal = () => {
    cerrarModal();
  };

  return (
    <>
      <ModalGeneric
        open={!!publicacionSeleccionado}
        onClose={handleCerrarModal}
      >
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6">Detalles de la Publicacion</Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              (Aquí puedes editar o eliminar la publicacion seleccionado)
            </Typography>
          </Box>
          <Button onClick={handleCerrarModal} variant="outlined">
            <CloseIcon />
          </Button>
        </Box>
        {publicacionSeleccionado && (
          <Box>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={3}
              mb={2}
            >
              {/* Imagen */}
              {publicacionSeleccionado.imagenUrl && (
                <Box flex="1">
                  <img
                    src={publicacionSeleccionado.imagenUrl}
                    alt="Vehículo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 300,
                      borderRadius: 10,
                    }}
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
                    <strong>Modelo:</strong> {publicacionSeleccionado.modelo}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Tipo:</strong> {publicacionSeleccionado.tipo}
                  </Typography>
                  {publicacionSeleccionado.puertas && (
                    <Typography variant="body1">
                      <strong>Puertas:</strong>{" "}
                      {publicacionSeleccionado.puertas || "N/A"}
                    </Typography>
                  )}
                  {publicacionSeleccionado.cilindraje && (
                    <Typography variant="body1">
                      <strong>Cilindraje:</strong>{" "}
                      {publicacionSeleccionado.cilindraje || "N/A"}
                    </Typography>
                  )}
                  {publicacionSeleccionado.velocidades && (
                    <Typography variant="body1">
                      <strong>Velocidades:</strong>{" "}
                      {publicacionSeleccionado.velocidades || "N/A"}
                    </Typography>
                  )}
                  <Typography>
                    <strong>precio:</strong>{" "}
                    {formatoMonedaColombiana(publicacionSeleccionado.precio)}
                  </Typography>
                  <Typography>
                    <strong>color:</strong> {publicacionSeleccionado.color}
                  </Typography>
                  <Typography>
                    <strong>kilometraje:</strong>{" "}
                    {publicacionSeleccionado.kilometraje}
                  </Typography>
                  <Typography>
                    <strong>Vehículo nuevo?:</strong>{" "}
                    {publicacionSeleccionado.esNuevo ? "Nuevo" : "Usado"}
                  </Typography>
                  <Typography>
                    <strong>Fecha Creación:</strong>{" "}
                    {new Intl.DateTimeFormat("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(publicacionSeleccionado.fechaCreacion))}
                  </Typography>

                  <Typography>
                    <strong>Estado disponibilidad:</strong>{" "}
                    {publicacionSeleccionado.estadoDisponibilidad
                      .charAt(0)
                      .toUpperCase() +
                      publicacionSeleccionado.estadoDisponibilidad
                        .slice(1)
                        .toLowerCase()}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {publicacionSeleccionado.estadoDisponibilidad !== "vendido" && (
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => setAbrirEliminar(true)}
                  sx={{ mx: 1 }}
                  variant="outlined"
                  title={"Eliminar"}
                >
                  <DeleteIcon />
                </Button>

                <Button
                  onClick={() => setAbrirEdicion(true)}
                  sx={{ mx: 1 }}
                  variant="outlined"
                  title={"Editar"}
                >
                  <EditIcon />
                </Button>

                <Button
                  onClick={() => setAbrirVender(true)}
                  sx={{ mx: 1 }}
                  variant="contained"
                  title={"Vender"}
                >
                  <ShoppingCartIcon />
                </Button>
              </Box>
            )}
          </Box>
        )}
      </ModalGeneric>

      {abrirVender && (
        <ModalVenderPublicacion
          abrirVender={abrirVender}
          setAbrirVender={setAbrirVender}
          publicacionSeleccionado={publicacionSeleccionado}
          onVentaSeleccionada={onVentaSeleccionada}
          handleCerrarModal={handleCerrarModal}
        />
      )}
      {abrirEdicion && (
        <ModalEditarPublicacion
          abrirEdicion={abrirEdicion}
          setAbrirEdicion={setAbrirEdicion}
          publicacionSeleccionado={publicacionSeleccionado}
          refrescarPublicaciones={refrescarPublicaciones}
          handleCerrarModal={handleCerrarModal}
        />
      )}
      {abrirEliminar && (
        <ModalEliminarPublicacion
          abrirEliminar={abrirEliminar}
          setAbrirEliminar={setAbrirEliminar}
          publicacionSeleccionado={publicacionSeleccionado}
          refrescarPublicaciones={refrescarPublicaciones}
          handleCerrarModal={handleCerrarModal}
        />
      )}
    </>
  );
}

export default ModalPublicaciones;
