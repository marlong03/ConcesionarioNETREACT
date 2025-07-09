import { Button, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalGeneric from "../general/ModalGeneric";
import { useState } from "react";
import ListarClientes from "../clientes/ListarClientes";
import CrearCliente from "../clientes/CrearCliente";
import { crearVenta } from "../../services/ventaService";
import { editarPublicacion } from "../../services/publicacionService";
import { Snackbar, Alert, LinearProgress } from "@mui/material";

function ModalVenderPublicacion({
  abrirVender,
  setAbrirVender,
  publicacionSeleccionado,
  onVentaSeleccionada,
  handleCerrarModal,
}) {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [abrirCrearCliente, setAbrirCrearCliente] = useState(false);
  const [reloadClientes, setReloadClientes] = useState(0);
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

  const confirmarCliente = async () => {
    setCargando(true);
    try {
      const clienteId = clienteSeleccionado.id;
      const publicacionId = publicacionSeleccionado.id;

      await crearVenta({ clienteId, publicacionId });
      const publicacionActualizada = {
        ...publicacionSeleccionado,
        estado: "vendido",
        vehiculoId: publicacionSeleccionado.vehiculo.id,
      };
      console.log(publicacionActualizada);

      await editarPublicacion(publicacionId, publicacionActualizada);
      setSnack({
        open: true,
        severity: "success",
        message: "✅ Venta creada con éxito",
      });
      setTimeout(() => {
        setCargando(false);
        setAbrirVender(false);
        handleCerrarModal();
        onVentaSeleccionada();
      }, 800);
    } catch (error) {
      console.error("Error al crear la venta:", error);
      setSnack({
        open: true,
        severity: "error",
        message: error?.response?.data || "❌ Error al crear la venta",
      });
    } 
  };

  return (
    <>
      <ModalGeneric open={abrirVender} onClose={() => setAbrirVender(false)}>
        {cargando && (
          <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
            <LinearProgress />
          </Box>
        )}

        <Box className="my-0" p={0} position="relative">
          <Box p={3} pt={1}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setAbrirVender(false)} variant="outlined">
                <CloseIcon />
              </Button>
            </Box>

            {!clienteSeleccionado ? (
              <Box>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  (Seleccione el cliente al cual se le va a realizar la venta)
                </Typography>

                {/* Se vuelve a cargar cada que reloadClientes */}
                <ListarClientes
                  key={reloadClientes}
                  onClienteSeleccionado={(cliente) =>
                    setClienteSeleccionado(cliente)
                  }
                />

                <Box mt={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => setAbrirCrearCliente(true)}
                  >
                    Crear Cliente
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="h5">Has escogido al cliente</Typography>
                <Typography variant="h6">
                  Nombre: <strong>{clienteSeleccionado.nombre}</strong>
                  <br />
                  Documento: <strong>{clienteSeleccionado.documento}</strong>
                  <br />
                </Typography>
                <Typography>
                  ¿Estás seguro de continuar con esta selección?
                </Typography>

                <Box mt={2} display="flex" justifyContent="end" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setClienteSeleccionado(null)}
                  >
                    Cambiar Cliente
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={confirmarCliente}
                  >
                    Confirmar Cliente
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </ModalGeneric>
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

      {abrirCrearCliente && (
        <ModalGeneric
          open={abrirCrearCliente}
          onClose={() => setAbrirCrearCliente(false)}
        >
          <CrearCliente
            onSuccess={(nuevoCliente) => {
              setClienteSeleccionado(nuevoCliente);
              setAbrirCrearCliente(false);
              setReloadClientes((prev) => prev + 1); 
            }}
          />
        </ModalGeneric>
      )}
    </>
  );
}

export default ModalVenderPublicacion;
