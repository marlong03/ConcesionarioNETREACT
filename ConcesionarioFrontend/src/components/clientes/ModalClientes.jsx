import { useEffect, useState } from "react";
import { Typography, Button, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ModalGeneric from "../general/ModalGeneric";
import { obtenerVentasPorCliente } from "../../services/ventaService";
import LoadingSkeleton from "../general/LoadingSkeleton";
import ListFilter from "../general/ListFilter";
import ModalEditarCliente from "./ModalEditarCliente";
import ModalEliminarCliente from "./ModalEliminarCliente";
import ModalPublicaciones from "../Publicaciones/ModalPublicaciones";

function ModalClientes({
  clienteSeleccionado,
  cerrarModal,
  refrescarClientes,
}) {
  const [mostrarVentas, setMostrarVentas] = useState(false);
  const [publicacionSeleccionado, setPublicacionSeleccionado] = useState({});

  const [ventas, setVentas] = useState([]);
  const [loadingVentas, setLoadingVentas] = useState(false);
  const [abrirEdicion, setAbrirEdicion] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);
  const [abrirModalPublicacion, setAbrirModalPublicacion] = useState(false);
  const cargarVentas = async () => {
    if (!clienteSeleccionado) return;
    setLoadingVentas(true);
    try {
      const ventasData = await obtenerVentasPorCliente(clienteSeleccionado.id);
      setVentas(ventasData);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    } 
    setLoadingVentas(false);
  };

  useEffect(() => {
    if (clienteSeleccionado && mostrarVentas) {
      setLoadingVentas(true);
      cargarVentas();
    }
  }, [clienteSeleccionado, mostrarVentas]);

  const toggleVentas = () => setMostrarVentas((prev) => !prev);

  const handleCerrarModal = () => {
    setMostrarVentas(false);
    setVentas([]);
    cerrarModal();
  };

  const ventasNormalizada = ventas.map((venta) => ({
    id: venta.id,
    modelo: venta.publicacion?.vehiculo?.modelo || "",
    estado: venta.publicacion?.estadoDisponibilidad || "",
    precio: venta.publicacion?.precio || 0,
    imagenUrl: venta.publicacion?.vehiculo?.imagenUrl || "", 
    original: venta,
  }));

  return (
    <>
      <ModalGeneric open={!!clienteSeleccionado} onClose={handleCerrarModal}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6">Detalles del Cliente</Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              (Aquí puedes editar o eliminar el cliente seleccionado)
            </Typography>
          </Box>
          <Button onClick={handleCerrarModal} variant="outlined">
            <CloseIcon />
          </Button>
        </Box>

        {clienteSeleccionado && (
          <Box>
            <Typography>
              <strong>Nombre:</strong> {clienteSeleccionado.nombre}
            </Typography>
            <Typography>
              <strong>Documento:</strong> {clienteSeleccionado.documento}
            </Typography>
          </Box>
        )}

        <Box mt={4} borderTop={1} pt={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">Ventas realizadas al cliente</Typography>
            <IconButton onClick={toggleVentas}>
              {mostrarVentas ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Typography variant="body2" color="textSecondary">
            (Despliega para mostrar las ventas realizadas por el cliente)
          </Typography>

          <Collapse in={mostrarVentas}>
            <Box mt={2}>
              {loadingVentas ? (
                <LoadingSkeleton />
              ) : (
                <ListFilter
                  titulo=""
                  data={ventasNormalizada}
                  campos={[
                    { label: "Modelo", key: "modelo" },
                    { label: "Estado", key: "estado" },
                    { label: "Precio", key: "precio" },
                  ]}
                  itemsPorPagina={5}
                  verDetalle={(item) => {
                    
                    //Reconstruimos la publicacion con imagen 
                    const publicacion = item.original.publicacion;
                    setPublicacionSeleccionado({
                      ...publicacion,
                      imagenUrl: publicacion?.vehiculo?.imagenUrl || "", 
                    });
                    setAbrirModalPublicacion(true);
                  }}
                />
              )}
            </Box>
          </Collapse>
        </Box>

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
      {abrirModalPublicacion && (
        <ModalPublicaciones
          publicacionSeleccionado={publicacionSeleccionado}
          cerrarModal={() => {setAbrirModalPublicacion(false)}}
          refrescarPublicaciones={()=>{}}
          onVentaSeleccionada={()=>{}}
        />
      )}
      {abrirEdicion && (
        <ModalEditarCliente
          abrirEdicion={abrirEdicion}
          setAbrirEdicion={setAbrirEdicion}
          clienteSeleccionado={clienteSeleccionado}
          cargarVentas={cargarVentas}
          refrescarClientes={refrescarClientes}
          handleCerrarModal={handleCerrarModal}
        />
      )}
      {abrirEliminar && (
        <ModalEliminarCliente
          abrirEliminar={abrirEliminar}
          setAbrirEliminar={setAbrirEliminar}
          clienteSeleccionado={clienteSeleccionado}
          refrescarClientes={refrescarClientes}
          handleCerrarModal={handleCerrarModal}
        />
      )}
    </>
  );
}

export default ModalClientes;
