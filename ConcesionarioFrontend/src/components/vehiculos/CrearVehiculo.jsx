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
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  crearVehiculo,
  editarVehiculo,
  subirImagenVehiculo,
} from "../../services/vehiculoService";
import { useNavigate } from "react-router-dom";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
function CrearVehiculo({ vehiculoEditar = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({
    modelo: "",
    tipo: "",
    puertas: "",
    cilindraje: "",
    velocidades: "",
    imagenUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("vehiculoEditar", vehiculoEditar);

    if (vehiculoEditar) {
      setForm({
        modelo: vehiculoEditar.modelo || "",
        tipo: vehiculoEditar.tipo || "",
        puertas: vehiculoEditar?.puertas || "",
        cilindraje: vehiculoEditar?.cilindraje || "",
        velocidades: vehiculoEditar?.velocidades || "",
        imagenUrl: vehiculoEditar?.imagenUrl || "",
      });
    }
  }, [vehiculoEditar]);

  const llenarForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validarForm = () => {
    const errores = {};
    if (!form.modelo.trim()) errores.modelo = "El modelo es obligatorio";
    if (!form.tipo.trim()) errores.tipo = "El tipo es obligatorio";

    if (form.tipo.toLowerCase() === "carro" && !form.puertas) {
      errores.puertas = "Las puertas son obligatorias para un carro";
    }

    if (form.tipo.toLowerCase() === "moto") {
      if (!form.cilindraje) {
        errores.cilindraje = "El cilindraje es obligatorio para una moto";
      } else if (isNaN(form.cilindraje)) {
        errores.cilindraje = "El cilindraje debe ser un número";
      } else if (Number(form.cilindraje) > 400) {
        errores.cilindraje = "El cilindraje debe ser menor o igual a 400 cc";
      } else if (Number(form.cilindraje) <= 0) {
        errores.cilindraje = "El cilindraje debe ser mayor que 0";
      }
      if (!form.velocidades)
        errores.velocidades = "Las velocidades son obligatorias para una moto";
    }

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    setCargando(true);

    try {
      if (vehiculoEditar) {
        await editarVehiculo(vehiculoEditar.id, form);
        setSnack({
          open: true,
          severity: "success",
          message: "Vehículo actualizado",
        });
        onSuccess();
      } else {
        await crearVehiculo(form);
        setSnack({
          open: true,
          severity: "success",
          message: "Vehículo creado",
        });
        setForm({
          modelo: "",
          tipo: "",
          puertas: "",
          cilindraje: "",
          velocidades: "",
          imagenUrl: "",
        });
        setTimeout(() => {
          navigate("/vehiculos/listar");
          setCargando(false);
        }, 800);
      }
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: error || "Error al guardar vehículo",
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
        <DirectionsCarIcon fontSize="large" />
        {vehiculoEditar ? " Editar Vehículo" : " Nuevo Vehículo"}
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
          label="Modelo*"
          name="modelo"
          fullWidth
          value={form.modelo}
          onChange={llenarForm}
          error={!!errors.modelo}
          helperText={errors.modelo}
          disabled={cargando}
        />

        <FormControl fullWidth error={!!errors.tipo} disabled={cargando}>
          <InputLabel>Tipo*</InputLabel>
          <Select
            name="tipo"
            value={form.tipo}
            label="Tipo*"
            onChange={llenarForm}
          >
            <MenuItem value="carro">Carro</MenuItem>
            <MenuItem value="moto">Moto</MenuItem>
          </Select>
          {errors.tipo && (
            <Typography variant="caption" color="error">
              {errors.tipo}
            </Typography>
          )}
        </FormControl>

        {form.tipo.toLowerCase() === "carro" && (
          <TextField
            label="Puertas"
            name="puertas"
            fullWidth
            type="number"
            value={form.puertas}
            onChange={llenarForm}
            error={!!errors.puertas}
            helperText={errors.puertas}
            disabled={cargando}
          />
        )}

        {form.tipo.toLowerCase() === "moto" && (
          <Box>
            <TextField
              label="Cilindraje*"
              name="cilindraje"
              fullWidth
              type="number"
              value={form.cilindraje}
              onChange={llenarForm}
              error={!!errors.cilindraje}
              helperText={errors.cilindraje}
              disabled={cargando}
              inputProps={{
                min: 1,
                max: 400,
              }}
            />
            <TextField
              label="Número de cambios*"
              name="velocidades"
              fullWidth
              type="number"
              value={form.velocidades}
              onChange={llenarForm}
              error={!!errors.velocidades}
              helperText={errors.velocidades}
              disabled={cargando}
            />
          </Box>
        )}

        <Box textAlign="center">
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCameraIcon />}
            sx={{ mb: 2 }}
          >
            Subir Imagen
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                try {
                  const imageUrl = await subirImagenVehiculo(file);
                  setForm((prev) => ({ ...prev, imagenUrl: imageUrl }));
                } catch (error) {
                  alert("❌ Error al subir imagen");
                }
              }}
            />
          </Button>

          {form.imagenUrl && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                variant="rounded"
                src={form.imagenUrl}
                alt="Vista previa"
                sx={{ width: 120, height: 120, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                Vista previa de la imagen
              </Typography>
            </Box>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={vehiculoEditar ? <SaveIcon /> : <AddBoxIcon />}
          disabled={cargando}
        >
          {cargando
            ? "Cargando..."
            : vehiculoEditar
            ? "Actualizar Vehículo"
            : "Crear Vehículo"}
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

export default CrearVehiculo;
