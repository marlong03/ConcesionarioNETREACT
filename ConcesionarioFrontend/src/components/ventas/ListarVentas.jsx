import { useState, useEffect } from "react";
import ListFilter from "../general/ListFilter";
import ModalVentas from "../Ventas/ModalVentas";
import { listarVentas } from "../../services/ventaService";
import LoadingSkeleton from "../general/LoadingSkeleton";
import CardFilter from "../general/CardFilter";
import { Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { formatoMonedaColombiana } from "../general/Utils";

function ListarVentas() {
  const [Ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ventaSeleccionado, setVentaSeleccionado] = useState(null);
  const [vistaCard, setVistaCard] = useState(true);

  const campos = [
    { label: "Cliente", key: "clienteNombre" },
    { label: "Publicación", key: "publicacionModelo" },
    { label: "Precio", key: "publicacionPrecio" },
  ];

  const cargarVentas = async () => {
    try {
      setLoading(true);
      const data = await listarVentas();

      const ventasFormateadas = data.map((venta) => ({
        ...venta,
        clienteNombre: venta.cliente?.nombre || "",
        publicacionModelo: venta.publicacion?.vehiculo?.modelo || "",
        publicacionPrecio: formatoMonedaColombiana(
          venta.publicacion?.precio || ""
        ),
        imagenUrl: venta.publicacion?.vehiculo?.imagenUrl || "",
      }));

      setVentas(ventasFormateadas.reverse());
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const verDetalle = (venta) => {
    setVentaSeleccionado(venta);
  };

  const cerrarModal = () => {
    setVentaSeleccionado(null);
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
          titulo="Listado de Ventas"
          indicacion="(Gestión  de ventas use el buscador, haga clic en Ver para visualizar una venta)"
          data={Ventas}
          campos={campos}
          itemsPorPagina={5}
          verDetalle={verDetalle}
        />
      ) : (
        <ListFilter
          titulo="Listado de Ventas"
          indicacion="(Gestión  de ventas use el buscador, haga clic en Ver para visualizar una venta)"
          data={Ventas}
          campos={campos}
          itemsPorPagina={5}
          verDetalle={verDetalle}
        />
      )}

      <ModalVentas
        ventaSeleccionado={ventaSeleccionado}
        cerrarModal={cerrarModal}
        refrescarVentas={cargarVentas}
      />
    </div>
  );
}

export default ListarVentas;
