import { useState } from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalGeneric from "../general/ModalGeneric";
import ModalEditarRegla from "./ModalEditarRegla";
import ModalEliminarRegla from "./ModalEliminarRegla";
import { formatoMonedaColombiana } from "../general/Utils";
function ModalReglas({ reglaSeleccionado, cerrarModal, refrescarReglas }) {
  const [abrirEdicion, setAbrirEdicion] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);

  const handleCerrarModal = () => {
    cerrarModal();
  };

  return (
    <>
      <ModalGeneric open={!!reglaSeleccionado} onClose={handleCerrarModal}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6">Detalles de la Regla</Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              (Aquí puedes editar o eliminar la regla seleccionado)
            </Typography>
          </Box>
          <Button onClick={handleCerrarModal} variant="outlined">
            <CloseIcon />
          </Button>
        </Box>

        {reglaSeleccionado && (
          <Box>
            <Grid
              display="flex"
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box>
                {reglaSeleccionado.vehiculo?.imagenUrl && (
                  <Box
                    component="img"
                    src={reglaSeleccionado.vehiculo?.imagenUrl}
                    alt="imagen del item"
                    sx={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
              <Box>
                <Typography>
                  <strong>Modelo:</strong> {reglaSeleccionado.vehiculo?.modelo}
                </Typography>
                <Typography>
                  <strong>Precio:</strong>{" "}
                  {formatoMonedaColombiana(reglaSeleccionado.precio)}
                </Typography>
              </Box>
            </Grid>
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
        <ModalEditarRegla
          abrirEdicion={abrirEdicion}
          setAbrirEdicion={setAbrirEdicion}
          reglaSeleccionado={reglaSeleccionado}
          refrescarReglas={refrescarReglas}
          handleCerrarModal={handleCerrarModal}
        />
      )}
      {abrirEliminar && (
        <ModalEliminarRegla
          abrirEliminar={abrirEliminar}
          setAbrirEliminar={setAbrirEliminar}
          reglaSeleccionado={reglaSeleccionado}
          refrescarReglas={refrescarReglas}
          handleCerrarModal={handleCerrarModal}
        />
      )}
    </>
  );
}

export default ModalReglas;
