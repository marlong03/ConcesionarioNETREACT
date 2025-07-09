import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  LinearProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  crearPublicacion,
  editarPublicacion,
} from "../../services/publicacionService";
import { listarVehiculos } from "../../services/vehiculoService";
import { useNavigate } from "react-router-dom";

function CrearPublicacion({ publicacionEditar = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({
    precio: "",
    estado: "",
    vehiculoId: "",
    color: "",
    kilometraje: "",
    esNuevo: false,
  });

  const [vehiculos, setVehiculos] = useState([]);
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [cargando, setCargando] = useState(false);
  const opcionesEstadoDisponiblidad = [
    { label: "Disponible", value: "disponible" },
  ];
  const opcionesEstado = [
    { label: "Nuevo", value: true },
    { label: "Usado", value: false },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (publicacionEditar) {
      console.log(publicacionEditar);

      setForm({
        precio: publicacionEditar.precio || "",
        estado: publicacionEditar.estadoDisponibilidad || "",
        color: publicacionEditar.color || "",
        kilometraje: publicacionEditar.kilometraje || "",
        esNuevo: publicacionEditar.esNuevo || false,
        vehiculoId:
          publicacionEditar.vehiculo?.id || publicacionEditar.vehiculoId || "",
      });
    }
  }, [publicacionEditar]);

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
    if (!form.color) errores.color = "Debe seleccionar un color";
    if (!form.kilometraje && form.kilometraje !== 0) {
      errores.kilometraje = "El kilometraje es obligatorio";
    } else if (isNaN(form.kilometraje) || form.kilometraje < 0) {
      errores.kilometraje = "El kilometraje debe ser un número válido";
    }

    if (form.esNuevo !== true && form.esNuevo !== false) {
      errores.esNuevo = "Debe seleccionar si el vehículo es nuevo o usado";
    }
    if (!form.estado)
      errores.estado = "El estado de la publicación es obligatorio";

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    setCargando(true);

    try {
      if (publicacionEditar) {
        await editarPublicacion(publicacionEditar.id, form);
        setSnack({
          open: true,
          severity: "success",
          message: "Publicacion actualizada",
        });
        onSuccess();
      } else {
        await crearPublicacion(form);
        setSnack({
          open: true,
          severity: "success",
          message: "Publicacion creada",
        });
        setForm({
          precio: "",
          estado: "",
          vehiculoId: "",
          color: "",
          kilometraje: "",
          esNuevo: false,
        });

        setTimeout(() => {
          navigate("/publicaciones/listar");
          setCargando(false);
        }, 800);
      }
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: error || "Error al guardar publicacion",
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
        {publicacionEditar ? " Editar Publicacion" : " Nueva Publicacion"}
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
        <Autocomplete
          options={vehiculos}
          getOptionLabel={(option) => option.modelo}
          value={
            vehiculos.find((v) => v.id === Number(form.vehiculoId)) || null
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

        <TextField
          label="Color*"
          name="color"
          fullWidth
          type="text"
          value={form.color}
          onChange={llenarForm}
          error={!!errors.color}
          helperText={errors.color}
          disabled={cargando}
        />
        <TextField
          label="Kilometraje*"
          name="kilometraje"
          fullWidth
          type="number"
          value={form.kilometraje}
          onChange={llenarForm}
          error={!!errors.kilometraje}
          helperText={errors.kilometraje}
          disabled={cargando}
        />
        <FormControl fullWidth error={!!errors.esNuevo} disabled={cargando}>
          <InputLabel>Vehículo nuevo?*</InputLabel>
          <Select
            name="esNuevo"
            value={form.esNuevo}
            label="Estado (Nuevo/Usado)*"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                esNuevo: e.target.value,
              }))
            }
          >
            {opcionesEstado.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
          {errors.estado && (
            <Typography variant="caption" color="error">
              {errors.estado}
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth error={!!errors.estado} disabled={cargando}>
          <InputLabel>Estado disponibilidad*</InputLabel>
          <Select
            name="estado"
            value={form.estado}
            label="Estado disponibilidad*"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                estado: e.target.value,
              }))
            }
          >
            {opcionesEstadoDisponiblidad.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
          {errors.estado && (
            <Typography variant="caption" color="error">
              {errors.estado}
            </Typography>
          )}
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={publicacionEditar ? <SaveIcon /> : <AddBoxIcon />}
          disabled={cargando}
        >
          {cargando
            ? "Cargando..."
            : publicacionEditar
            ? "Actualizar Publicacion"
            : "Crear Publicacion"}
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

export default CrearPublicacion;
