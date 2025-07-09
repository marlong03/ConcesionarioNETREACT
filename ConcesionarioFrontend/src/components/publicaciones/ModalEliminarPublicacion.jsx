import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalGeneric from "../general/ModalGeneric";
import { eliminarPublicacion } from "../../services/publicacionService";
function ModalEliminarpublicacion({
  abrirEliminar,
  setAbrirEliminar,
  publicacionSeleccionado,
  refrescarPublicaciones = () => {},
  handleCerrarModal = () => {},
}) {
  const [cargando, setCargando] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const cerrarSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const handleEliminarpublicacion = async () => {
    if (!publicacionSeleccionado) return;

    setCargando(true);

    try {
      await eliminarPublicacion(publicacionSeleccionado.id);
      setSnack({
        open: true,
        severity: "success",
        message: "Publicacion eliminado correctamente",
      });
      setTimeout(() => {
        refrescarPublicaciones();
        handleCerrarModal();
        setAbrirEliminar(false);
        setCargando(false);
      }, 800);
    } catch (error) {
      console.error("Error al eliminar el publicacion:", error);
      setSnack({
        open: true,
        severity: "error",
        message: "Error al eliminar el publicacion",
      });
    } 
  };

  return (
    <ModalGeneric open={abrirEliminar} onClose={() => setAbrirEliminar(false)}>
      <Box className="my-0" p={0} position="relative">
        {cargando && (
          <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
            <LinearProgress />
          </Box>
        )}

        <Box p={3} pt={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={() => setAbrirEliminar(false)} variant="outlined">
              <CloseIcon />
            </Button>
          </Box>

          <Typography variant="h6">
            ¿Estás seguro de que deseas eliminar al publicacion{" "}
            <strong>{publicacionSeleccionado?.modelo || "Desconocido"}</strong>?
          </Typography>

          <Box mt={2}>
            <Typography variant="body1">
              (Esta acción no se puede deshacer. El publicacion será eliminado
              permanentemente)
            </Typography>
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleEliminarpublicacion}
              variant="outlined"
              color="error"
              disabled={cargando}
            >
              {cargando ? "Eliminando..." : "Eliminar Publicacion"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={cerrarSnack}
      >
        <Alert onClose={cerrarSnack} severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </ModalGeneric>
  );
}

export default ModalEliminarpublicacion;
