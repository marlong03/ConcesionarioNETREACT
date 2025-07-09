import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListSelect from "../components/general/ListSelect";

function PageClientes() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.title = "👤 | Clientes - Concesionario";
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
        <GroupIcon /> Clientes
      </h2>
      <Typography variant="body2" color="textSecondary">
        (En esta página podrás Gestión ar los clientes del concesionario)
      </Typography>

      <div className="row mt-4">
        <List sx={{ bgcolor: "background.paper" }} className="col-12 col-md-3">
          <ListSelect title="Clientes" icon={<GroupIcon />}>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={
                location.pathname.includes("/listar") ||
                location.pathname === "/clientes"
              }
              onClick={() => navigate("/clientes/listar")}
            >
              <FormatListBulletedIcon className="mx-2" />
              <ListItemText primary="Listado de clientes" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={location.pathname.includes("/crear")}
              onClick={() => navigate("/clientes/crear")}
            >
              <AddBoxIcon className="mx-2" />
              <ListItemText primary="Nuevo cliente" />
            </ListItemButton>
          </ListSelect>
        </List>

        <div className="col-12 col-md-9 border-start ps-3 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PageClientes;
