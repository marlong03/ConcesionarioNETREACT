import  { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import Typography from "@mui/material/Typography";
function Inicio() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "🚗 | Inicio - Concesionario";
  }, []);

  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      <div
        className="text-center bg-light w-100 h-100 p-5  "
        style={{
          boxShadow: "inset 0 0 20px rgba(29, 29, 29, 0.35)",
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          className="d-flex align-items-center justify-content-center text-center"
          sx={{
            fontSize: {
              xs: "1.8rem", 
              sm: "2.2rem", 
              md: "2.5rem", 
              lg: "3rem", 
            },
            fontWeight: "400",
          }}
        >
          Bienvenido al Concesionario
          <CarRentalIcon fontSize="inherit" className="mx-2" />
        </Typography>
      </div>
      <p className="text-secondary mt-3">
        (Seleccione una opción para continuar)
      </p>

      <div className="d-flex justify-content-center align-content-center flex-wrap ">
        <Button
          variant="contained"
          onClick={() => navigate("/vehiculos")}
          style={{
            margin: "10px",
            marginTop: "16px",
            height: "100px",
            width: "180px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SettingsIcon fontSize="large" className="mb-2" />
          Configuraciones
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/publicaciones")}
          style={{
            margin: "10px",
            height: "115px",
            width: "190px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ShoppingCartIcon fontSize="large" className="mb-2" />
          Publicaciones
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/clientes")}
          style={{
            margin: "10px",
            marginTop: "16px",
            height: "100px",
            width: "180px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GroupIcon fontSize="large" className="mb-2" />
          Clientes
        </Button>
      </div>
    </div>
  );
}

export default Inicio;
