import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListSelect from "../components/general/ListSelect";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
function PageVehiculos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    document.title = "🚗 | Vehículos - Concesionario";
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <Button
          variant="outlined"
          className="mt-4 mb-2"
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon /> <span className="ms-2"> Volver</span>
        </Button>
      </div>
      <div className="d-flex ">
        <SettingsIcon fontSize="large" />
        <h2 className="mx-2"> Configuraciones</h2>
      </div>
      <Typography variant="body2" color="textSecondary">
        (En esta página podrás Gestión ar los vehiculos del concesionario)
      </Typography>

      <div className="row mt-4">
        <List sx={{ bgcolor: "background.paper" }} className="col-12 col-md-3">
          <ListSelect title="Vehiculos" icon={<DirectionsCarIcon />}>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/listar") &&
                location.pathname.includes("/vehiculos")
              }
              onClick={() => navigate("/vehiculos/listar")}
            >
              <FormatListBulletedIcon className="mx-2" />
              <ListItemText primary="Listado de vehiculos" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/crear") &&
                location.pathname.includes("/vehiculos")
              }
              onClick={() => navigate("/vehiculos/crear")}
            >
              <AddBoxIcon className="mx-2" />
              <ListItemText primary="Nuevo vehiculos" />
            </ListItemButton>
          </ListSelect>

          <ListItemButton onClick={handleToggle}>
            <AttachMoneyIcon className="mr-3" />
            <ListItemText primary="Reglas de precios" className="mx-4" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/listar") &&
                location.pathname.includes("/reglas")
              }
              onClick={() => navigate("/reglas/listar")}
            >
              <FormatListBulletedIcon className="mx-2" />
              <ListItemText primary="Listado de precios" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/crear") &&
                location.pathname.includes("/reglas")
              }
              onClick={() => navigate("/reglas/crear")}
            >
              <AddBoxIcon className="mx-2" />
              <ListItemText primary="Nueva regla" />
            </ListItemButton>
          </Collapse>
        </List>

        <div className="col-12 col-md-9 border-start ps-3 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PageVehiculos;
