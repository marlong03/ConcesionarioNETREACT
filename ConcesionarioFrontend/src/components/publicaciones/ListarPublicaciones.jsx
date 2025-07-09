import { useState, useEffect } from "react";
import ListFilter from "../general/ListFilter";
import ModalPublicaciones from "../Publicaciones/ModalPublicaciones";
import { listarPublicacionesDisponibles } from "../../services/publicacionService";
import LoadingSkeleton from "../general/LoadingSkeleton";
import CardFilter from "../general/CardFilter";
import { Button, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function ListarPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publicacionSeleccionado, setPublicacionSeleccionado] = useState(null);
  const [vistaCard, setVistaCard] = useState(true); 
  const esMovil = window.innerWidth <= 600; 
  const campos = [
    { label: "Tipo", key: "tipo" },
    { label: "Modelo", key: "modelo" },
    { label: "Precio", key: "precio" },
    { label: "Estado", key: "estadoDisponibilidad" },
  ];
  const onVentaSeleccionada = () =>{
      cargarPublicaciones()
  }
  const cargarPublicaciones = async () => {
    try {
      setLoading(true);
      const data = await listarPublicacionesDisponibles();

      const publicacionesFormateadas = data.map((publicacion) => ({
        ...publicacion,
        modelo: publicacion.vehiculo?.modelo || "",
        tipo: publicacion.vehiculo?.tipo || "",
        imagenUrl: publicacion.vehiculo?.imagenUrl || "",
      }));

      setPublicaciones(publicacionesFormateadas.reverse());
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const verDetalle = (publicacion) => {
    setPublicacionSeleccionado(publicacion);
  };

  const cerrarModal = () => {
    setPublicacionSeleccionado(null);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>Error: {error.message || JSON.stringify(error)}</div>;

  return (
    <div className="container">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" onClick={() => setVistaCard(!vistaCard)}>
          <span className="mx-2">
            {vistaCard ? <FormatListBulletedIcon /> : <DashboardIcon />}
          </span>
          Cambiar a {vistaCard ? "Lista" : "Canva"}
        </Button>
      </Box>

      {vistaCard || esMovil ? (
        <CardFilter
          titulo="Listado de Publicaciones"
          indicacion="(Gestión  de publicaciones busque, oprima Ver para visualizar una publicación)"

          data={publicaciones}
          campos={campos}
          itemsPorPagina={5}
          verDetalle={verDetalle}
        />
      ) : (
        <ListFilter
          titulo="Listado de Publicaciones"
          indicacion="(Gestión de publicaciones busque, oprima Ver para visualizar una publicación)"
          data={publicaciones}
          campos={campos}
          itemsPorPagina={5}
          verDetalle={verDetalle}
        />
      )}

      <ModalPublicaciones
        publicacionSeleccionado={publicacionSeleccionado}
        cerrarModal={cerrarModal}
        refrescarPublicaciones={cargarPublicaciones}
        onVentaSeleccionada={onVentaSeleccionada}
      />
    </div>
  );
}

export default ListarPublicaciones;
