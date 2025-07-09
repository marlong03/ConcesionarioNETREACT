import { useState, useEffect } from "react";
import ListFilter from "../general/ListFilter";
import ModalReglas from "../Reglas/ModalReglas";
import { listarReglas } from "../../services/reglaService";
import LoadingSkeleton from "../general/LoadingSkeleton";

function ListarReglas() {
  const [Reglas, setReglas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reglaSeleccionado, setReglaSeleccionado] = useState(null);

  const campos = [
    { label: "Tipo", key: "tipo" },
    { label: "Modelo", key: "modelo" }, 
    { label: "Precio", key: "precio" },
  ];

  const cargarReglas = async () => {
    try {
      setLoading(true);
      const data = await listarReglas();

      const reglasFormateadas = data.map((regla) => ({
        ...regla,
        modelo: regla.vehiculo?.modelo || "",
        tipo: regla.vehiculo?.tipo || "",
      }));

      setReglas(reglasFormateadas.reverse());
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarReglas();
  }, []);

  const verDetalle = (regla) => {
    setReglaSeleccionado(regla);
  };

  const cerrarModal = () => {
    setReglaSeleccionado(null);
  };

  if (loading) return <LoadingSkeleton />;

  if (error) return <div>Error: {error.message || JSON.stringify(error)}</div>;

  return (
    <div className="container">
      <ListFilter
        titulo="Listado de Reglas"
        indicacion="(Gestión  de reglas busque, oprima ver para visualizar una regla)"
        data={Reglas}
        campos={campos}
        itemsPorPagina={5}
        verDetalle={verDetalle}
      />

      <ModalReglas
        reglaSeleccionado={reglaSeleccionado}
        cerrarModal={cerrarModal}
        refrescarReglas={cargarReglas}
      />
    </div>
  );
}

export default ListarReglas;
