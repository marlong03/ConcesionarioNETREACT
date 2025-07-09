import { useEffect } from "react";
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
import StoreIcon from "@mui/icons-material/Store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
function PagePublicaciones() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.title = "🚗 | Publicaciones - Concesionario";
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

      <h2>
        <StoreIcon fontSize="large" /> Publicaciones
      </h2>
      <Typography variant="body2" color="textSecondary">
        (En esta página podrás Gestión ar los publicaciones del concesionario)
      </Typography>

      <div className="row mt-4">
        <List sx={{ bgcolor: "background.paper" }} className="col-12 col-md-3">
          <ListSelect title="Publicaciones" icon={<StoreIcon />}>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/listar") &&
                location.pathname.includes("/publicaciones")
              }
              onClick={() => navigate("/publicaciones/listar")}
            >
              <FormatListBulletedIcon className="mx-2" />
              <ListItemText primary="Listado de publicaciones" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/crear") &&
                location.pathname.includes("/publicaciones")
              }
              onClick={() => navigate("/publicaciones/crear")}
            >
              <AddBoxIcon className="mx-2" />
              <ListItemText primary="Nueva publicación" />
            </ListItemButton>
          </ListSelect>

          <ListSelect title="Ventas" icon={<AttachMoneyIcon />}>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/listar") &&
                location.pathname.includes("/ventas")
              }
              onClick={() => navigate("/ventas/listar")}
            >
              <FormatListBulletedIcon className="mx-2" />
              <ListItemText primary="Listado de ventas" />
            </ListItemButton>
            {/* <ListItemButton
              sx={{ pl: 4 }}
              selected={location.pathname.includes('/crear')}
              onClick={() => navigate('/ventas/crear')}
            >
              <AddBoxIcon className="mx-2" />
              <ListItemText primary="Nueva venta" />
            </ListItemButton> */}
          </ListSelect>
        </List>

        <div className="col-12 col-md-9 border-start ps-3 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PagePublicaciones;
