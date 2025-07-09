import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import CarRentalIcon from "@mui/icons-material/CarRental";
function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const navigate = useNavigate();

  const navbarItems = [
    { label: "Publicaciones", path: "/publicaciones" },
    { label: "Clientes", path: "/clientes" },
    { label: "Configuraciones", path: "/vehiculos" },
  ];

  const NavbarList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navbarItems.map((item) => (
          <ListItem button key={item.label} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header className="App-header " sx={{ boxShadow: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="container ">
            {/* Solo aparece menu burguer en celulares */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1, display: { md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

              <CarRentalIcon fontSize="large"></CarRentalIcon>
              <Typography
                variant="p"
                component="div"
                sx={{
                  flexGrow: 1,
                  cursor: "pointer",
                  display: { xs: "none", md: "flex" },
                }}
                onClick={() => navigate("/")}
                >
                | Concesionario
              </Typography>

            {/* Solo aparece botones navegacion en pantallas grandes */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navbarItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderBottom: "3px solid transparent",
                    "&:hover": {
                      borderBottom: "3px solid white",
                    },
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div className="p-2 bg-primary text-white d-flex justify-content-center align-items-center flex-column">
            <CarRentalIcon fontSize="large"></CarRentalIcon>
          </div>
          {NavbarList}
        </Drawer>
      </Box>
    </header>
  );
}

export default Navbar;
