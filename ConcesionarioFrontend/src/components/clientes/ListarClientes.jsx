import { useState, useEffect } from "react";
import ListFilter from "../general/ListFilter";
import ModalClientes from "../clientes/ModalClientes";
import { listarClientes } from "../../services/clienteService";
import LoadingSkeleton from "../general/LoadingSkeleton";

function ListarClientes({ onClienteSeleccionado }) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const campos = [
    { label: "Nombre", key: "nombre" },
    { label: "Documento", key: "documento" },
  ];
  const cargarClientes = async () => {
    setLoading(true);
    try {
      const data = await listarClientes();
      setClientes(data.reverse());
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const verDetalle = (cliente) => {
    setClienteSeleccionado(cliente);
    onClienteSeleccionado && onClienteSeleccionado(cliente);
  };

  const cerrarModal = () => {
    setClienteSeleccionado(null);
  };

  if (loading) return <LoadingSkeleton />;

  if (error) return <div>Error: {error.message || JSON.stringify(error)}</div>;

  return (
    <div className="container">
      <ListFilter
        titulo={
          onClienteSeleccionado ? "Seleccionar Cliente" : "Listado de Clientes"
        }
        data={clientes}
        campos={campos}
        itemsPorPagina={5}
        verDetalle={verDetalle}
        indicacion="(Gestión de clientes use el buscador, haga clic en Ver para visualizar un cliente)"
      />

      <ModalClientes
        clienteSeleccionado={clienteSeleccionado}
        cerrarModal={cerrarModal}
        refrescarClientes={cargarClientes}
      />
    </div>
  );
}

export default ListarClientes;
