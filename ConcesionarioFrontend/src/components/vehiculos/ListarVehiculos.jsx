import { useState, useEffect } from "react";
import ListFilter from "../general/ListFilter";
import ModalVehiculos from "../vehiculos/ModalVehiculos";
import { listarVehiculos } from "../../services/vehiculoService";
import LoadingSkeleton from "../general/LoadingSkeleton";
import CardFilter from "../general/CardFilter";
import { Button, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
function ListarVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [vistaCard, setVistaCard] = useState(false); 

  const campos = [
    { label: "Tipo", key: "tipo" },
    { label: "Modelo", key: "modelo" },
    { label: "Cilindraje", key: "cilindraje" },
  ];

  const cargarVehiculos = async () => {
    try {
      setLoading(true);
      const data = await listarVehiculos();
      setVehiculos(data.reverse());
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const verDetalle = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
  };

  const cerrarModal = () => {
    setVehiculoSeleccionado(null);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>Error: {error.message || JSON.stringify(error)}</div>;

  return (
    <div className="container">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" onClick={() => setVistaCard(!vistaCard)}>
          <span className="mx-2">
            {vistaCard ? <FormatListBulletedIcon /> : <DashboardIcon />}
          </span>{" "}
          Cambiar a {vistaCard ? "Lista" : "Canva"}
        </Button>
      </Box>

      {vistaCard ? (
        <CardFilter
          titulo="Listado de Vehículos"
          indicacion="(Gestión  de vehículos busque, oprima Ver para visualizar una publicación)"
          data={vehiculos}
          campos={campos}
          itemsPorPagina={5}
          verDetalle={verDetalle}
        />
      ) : (
        <ListFilter
          titulo="Listado de Vehículos"
          indicacion="(Gestión  de vehículos use el buscador, haga clic en Ver para visualizar un vehículos)"
          data={vehiculos}
          campos={campos}
          itemsPorPagina={5}
          verDetalle={verDetalle}
        />
      )}

      <ModalVehiculos
        vehiculoSeleccionado={vehiculoSeleccionado}
        cerrarModal={cerrarModal}
        refrescarVehiculos={cargarVehiculos}
      />
    </div>
  );
}

export default ListarVehiculos;
