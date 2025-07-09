import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import { crearCliente, editarCliente } from "../../services/clienteService";

function CrearCliente({ clienteEditar = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({ nombre: "", documento: "" });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (clienteEditar) {
      setForm({
        nombre: clienteEditar.nombre || "",
        documento: clienteEditar.documento || "",
      });
    }
  }, [clienteEditar]);

  const llenarForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validarForm = () => {
    const errores = {};
    if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio";
    if (!form.documento.trim())
      errores.documento = "El documento es obligatorio";
    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    setCargando(true);

    try {
      if (clienteEditar) {
        await editarCliente(clienteEditar.id, form);
        setSnack({
          open: true,
          severity: "success",
          message: "Cliente actualizado",
        });
        onSuccess();
      } else {
        await crearCliente(form);
        setSnack({
          open: true,
          severity: "success",
          message: "Cliente creado",
        });
        setForm({ nombre: "", documento: "" });

        setTimeout(() => {
          setCargando(false);

          onSuccess();
        }, 800);
      }
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: error || "Error al guardar cliente",
      });
      setCargando(false);
    }
  };

  const cerrarSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box className="col-12 col-md-6 mx-auto ">
      {cargando && (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress />
        </Box>
      )}
      <Typography variant="h5"  mt={3} textAlign="center">
        <PersonIcon fontSize="large" />
        {clienteEditar ? " Editar Cliente" : " Nuevo Cliente"}
      </Typography>
      <Typography variant="body2" mb={3} color="textSecondary" textAlign={"center"}>
        (Complete el formulario)
      </Typography>

      <Box
        component="form"
        onSubmit={enviarForm}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Nombre*"
          name="nombre"
          fullWidth
          value={form.nombre}
          onChange={llenarForm}
          error={!!errors.nombre}
          helperText={errors.nombre}
          disabled={cargando}
        />
        <TextField
          label="Documento*"
          name="documento"
          fullWidth
          value={form.documento}
          onChange={llenarForm}
          error={!!errors.documento}
          helperText={errors.documento}
          disabled={cargando}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={clienteEditar ? <SaveIcon /> : <AddBoxIcon />}
          disabled={cargando}
        >
          {cargando
            ? "cargando..."
            : clienteEditar
            ? "Actualizar Cliente"
            : "Crear Cliente"}
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

export default CrearCliente;
