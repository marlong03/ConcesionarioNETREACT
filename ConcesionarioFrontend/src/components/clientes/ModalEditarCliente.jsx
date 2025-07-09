import { Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalGeneric from "../general/ModalGeneric";
import CrearCliente from "./CrearCliente";

function ModalEditarCliente({
  abrirEdicion,
  setAbrirEdicion,
  clienteSeleccionado,
  refrescarClientes = () => {},
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

          <CrearCliente
            clienteEditar={clienteSeleccionado}
            onSuccess={() => {
              setTimeout(() => {
                handleCerrarModal();
                refrescarClientes();
                setAbrirEdicion(false);
              }, 800);
            }}
          />
        </Box>
      </Box>
    </ModalGeneric>
  );
}

export default ModalEditarCliente;
