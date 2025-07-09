import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  LinearProgress,
  Autocomplete,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { crearVenta, editarVenta } from "../../services/ventaService";
import { useNavigate } from "react-router-dom";
import { listarPublicaciones } from "../../services/publicacionService";
import { listarClientes } from "../../services/clienteService";

function CrearVenta({ ventaEditar = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({
    clienteId: "",
    publicacionId: "",
  });

  const [publicaciones, setPublicaciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ventaEditar) {
      setForm({
        clienteId: ventaEditar.cliente?.id || 0,
        publicacionId: ventaEditar.publicacion?.id || 0,
      });
      console.log(ventaEditar);
    }
  }, [ventaEditar]);
  const obtenerPublicaciones = async () => {
    try {
      const data = await listarPublicaciones();
      setPublicaciones(data);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    }
  };
  const obtenerClientes = async () => {
    try {
      const data = await listarClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    }
  };

  useEffect(() => {
    obtenerPublicaciones();
    obtenerClientes();
  }, []);

  const llenarForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validarForm = () => {
    const errores = {};
    if (!form.clienteId) errores.clienteId = "El cliente es obligatorio";
    if (!form.publicacionId)
      errores.publicacionId = "La publicacion es obligatoria";

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    setCargando(true);
    console.log(form);

    try {
      if (ventaEditar) {
        await editarVenta(ventaEditar.id, form);
        setSnack({
          open: true,
          severity: "success",
          message: "Venta actualizada",
        });
        onSuccess();
      } else {
        await crearVenta(form);
        setSnack({ open: true, severity: "success", message: "Venta creada" });
        setForm({ clienteId: 0, publicacionId: 0 });
        setTimeout(() => {
          navigate("/ventas/listar");
          setCargando(false);
        }, 800);
      }
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: error || "Error al guardar venta",
      });
      setCargando(false);
    }
  };

  const cerrarSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box className="col-12 col-md-6 mx-auto">
      {cargando && (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress />
        </Box>
      )}
      <Typography variant="h5" mb={3} mt={3} textAlign="center">
        <AttachMoneyIcon fontSize="large" />
        {ventaEditar ? " Editar Venta" : " Nueva Venta"}
      </Typography>

      <Box
        component="form"
        onSubmit={enviarForm}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Autocomplete
          options={publicaciones}
          getOptionLabel={(option) => option.vehiculo?.modelo || ""}
          value={
            publicaciones.find((v) => v.id === parseInt(form.publicacionId)) ||
            null
          }
          onChange={llenarForm}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Publicacion*"
              error={!!errors.publicacionId}
              helperText={errors.publicacionId}
              disabled={cargando}
            />
          )}
        />

        <Autocomplete
          options={clientes}
          getOptionLabel={(option) => option.nombre}
          value={
            clientes.find((v) => v.id === parseInt(form.clienteId)) || null
          }
          onChange={llenarForm}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cliente*"
              error={!!errors.clienteId}
              helperText={errors.clienteId}
              disabled={cargando}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={ventaEditar ? <SaveIcon /> : <AddBoxIcon />}
          disabled={cargando}
        >
          {cargando
            ? "Cargando..."
            : ventaEditar
            ? "Actualizar Venta"
            : "Crear Venta"}
        </Button>
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
    </Box>
  );
}

export default CrearVenta;
