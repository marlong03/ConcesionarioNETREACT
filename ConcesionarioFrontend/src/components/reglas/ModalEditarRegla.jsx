import { Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalGeneric from "../general/ModalGeneric";
import CrearRegla from "./CrearRegla";

function ModalEditarRegla({
  abrirEdicion,
  setAbrirEdicion,
  reglaSeleccionado,
  refrescarReglas = () => {},
  handleCerrarModal = () => {},
}) {
  return (
    <ModalGeneric open={abrirEdicion} onClose={() => setAbrirEdicion(false)}>
      <Box className="my-0" p={0} position="relative">
        <Box p={3} pt={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={() => setAbrirEdicion(false)} variant="outlined">
              <CloseIcon />
            </Button>
          </Box>

          <CrearRegla
            reglaEditar={reglaSeleccionado}
            onSuccess={() => {
              setTimeout(() => {
                handleCerrarModal();
                refrescarReglas();
                setAbrirEdicion(false);
              }, 800);
            }}
          />
        </Box>
      </Box>
    </ModalGeneric>
  );
}

export default ModalEditarRegla;
