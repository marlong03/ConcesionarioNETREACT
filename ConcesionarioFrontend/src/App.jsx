import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/general/Navbar";
import Footer from "./components/general/Footer";
import Inicio from "./pages/Inicio";

import PageClientes from "./pages/PageClientes";
import ListarClientes from "./components/Clientes/ListarClientes";
import CrearCliente from "./components/clientes/CrearCliente";


import PageVehiculos from "./pages/PageVehiculos";
import ListarVehiculos from "./components/vehiculos/ListarVehiculos";
import CrearVehiculo from "./components/vehiculos/CrearVehiculo";

import PagePublicaciones from "./pages/PagePublicaciones";
import ListarPublicaciones from "./components/publicaciones/ListarPublicaciones";
import CrearPublicacion from "./components/publicaciones/CrearPublicacion";

import ListarReglas from "./components/reglas/ListarReglas";
import CrearRegla from "./components/reglas/CrearRegla";
import ListarVentas from "./components/ventas/ListarVentas";
import CrearVenta from "./components/ventas/CrearVenta";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Navbar></Navbar>
          <main>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/clientes" element={<PageClientes />}>
                <Route index element={<ListarClientes />} />
                <Route path="listar" element={<ListarClientes />} />
                <Route path="crear" element={<CrearCliente />} />
              </Route>

              <Route path="/publicaciones" element={<PagePublicaciones />}>
                <Route index element={<ListarPublicaciones />} />
                <Route path="listar" element={<ListarPublicaciones />} />
                <Route path="crear" element={<CrearPublicacion />} />
              </Route>

              <Route path="/ventas" element={<PagePublicaciones />}>
                <Route index element={<ListarPublicaciones />} />
                <Route path="listar" element={<ListarVentas />} />
                <Route path="crear" element={<CrearVenta />} />
              </Route>

              <Route path="/vehiculos" element={<PageVehiculos />}>
                <Route index element={<ListarVehiculos />} />
                <Route path="listar" element={<ListarVehiculos />} />
                <Route path="crear" element={<CrearVehiculo />} />
              </Route>

              <Route path="/reglas" element={<PageVehiculos />}>
                <Route index element={<ListarVehiculos />} />
                <Route path="listar" element={<ListarReglas />} />
                <Route path="crear" element={<CrearRegla />} />
              </Route>

            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
