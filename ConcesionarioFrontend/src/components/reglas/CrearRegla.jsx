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
import { crearRegla, editarRegla } from "../../services/reglaService";
import { listarVehiculos } from "../../services/vehiculoService";
import { useNavigate } from "react-router-dom";

function CrearRegla({ reglaEditar = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({
    precio: "",
    vehiculoId: "",
  });

  const [vehiculos, setVehiculos] = useState([]);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (reglaEditar) {
      setForm({
        precio: reglaEditar.precio || "",
        vehiculoId: reglaEditar.vehiculoId || "",
      });
    }
  }, [reglaEditar]);

  useEffect(() => {
    const cargarVehiculos = async () => {
      try {
        const data = await listarVehiculos();
        setVehiculos(data.reverse());
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      }
    };

    cargarVehiculos();
  }, []);

  const llenarForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validarForm = () => {
    const errores = {};
    if (!form.precio.toString().trim())
      errores.precio = "El precio es obligatorio";
    if (!form.vehiculoId) errores.vehiculoId = "Debe seleccionar un vehículo";

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    setCargando(true);

    try {
      if (reglaEditar) {
        await editarRegla(reglaEditar.id, form);
        setSnack({
          open: true,
          severity: "success",
          message: "Regla actualizada",
        });
        onSuccess();
      } else {
        await crearRegla(form);
        setSnack({ open: true, severity: "success", message: "Regla creada" });
        setForm({ precio: "", vehiculoId: "" });
        setTimeout(() => {
          navigate("/reglas/listar");
          setCargando(false);
        }, 800);
      }
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: error || "Error al guardar regla",
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
      <Typography variant="h5" mt={3} textAlign="center">
        <AttachMoneyIcon fontSize="large" />
        {reglaEditar ? " Editar Regla" : " Nueva Regla"}
      </Typography>
      <Typography
        variant="body2"
        mb={3}
        color="textSecondary"
        textAlign={"center"}
      >
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
          label="Precio*"
          name="precio"
          fullWidth
          type="number"
          value={form.precio}
          onChange={llenarForm}
          error={!!errors.precio}
          helperText={errors.precio}
          disabled={cargando}
          inputProps={{
                min: 1,
                max: 250000000,
              }}
        />

        <Autocomplete
          options={vehiculos}
          getOptionLabel={(option) => option.modelo}
          value={
            vehiculos.find((v) => v.id === parseInt(form.vehiculoId)) || null
          }
          onChange={(event, newValue) => {
            setForm((prev) => ({
              ...prev,
              vehiculoId: newValue ? newValue.id : "",
            }));
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Vehículo*"
              error={!!errors.vehiculoId}
              helperText={errors.vehiculoId}
              disabled={cargando}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={reglaEditar ? <SaveIcon /> : <AddBoxIcon />}
          disabled={cargando}
        >
          {cargando
            ? "Cargando..."
            : reglaEditar
            ? "Actualizar Regla"
            : "Crear Regla"}
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

export default CrearRegla;
