import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Pagination,
  Box,
  Typography,
  Divider,
  Button,
  CardActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import { formatoMonedaColombiana } from "./Utils";
function ListFilter({
  titulo,
  data = [],
  campos = [],
  itemsPorPagina = 6,
  verDetalle,
  indicacion = "",
}) {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const buscarEnCampos = data.filter((item) =>
    campos.some((campo) =>
      String(item[campo.key] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const paginasTotales = Math.ceil(buscarEnCampos.length / itemsPorPagina);
  const paginados = buscarEnCampos.slice(
    (page - 1) * itemsPorPagina,
    page * itemsPorPagina
  );

  const buscarEnLista = () => {
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <Box>
      {titulo && (
        <Typography variant="h5" gutterBottom>
          {titulo}
        </Typography>
      )}
      <Typography variant="body2" color="textSecondary">
        {indicacion}
      </Typography>

      {/* Barra de busqueda */}
      <Box display="flex" gap={2} mb={2} mt={3}>
        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              buscarEnLista();
            }
          }}
        />
        <Button variant="contained" onClick={buscarEnLista}>
          <SearchIcon />
        </Button>
      </Box>

      {/* header */}
      {campos.length > 0 && (
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            justifyContent: "space-between",
            px: 2,
            py: 1,
            fontWeight: "bold",
          }}
        >
          {campos.map((campo) => (
            <Box key={campo.key} sx={{ minWidth: "100px" }}>
              {campo.label}
            </Box>
          ))}
          <Box sx={{ minWidth: "100px" }}>Acciones</Box>
        </Box>
      )}
      <Divider />

      {/* Datos */}
      <List>
        {paginados.map((item) =>
            <ListItem key={item.id} divider>
              <Box
                sx={{
                  display: { xs: "grid", sm: "flex" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  px: 2,
                }}
              >
                {campos.map((campo) => (
                  <Box key={campo.key} sx={{ minWidth: "100px" }}>
                    {campo.key === "precio"
                      ? formatoMonedaColombiana(item[campo.key])
                      : item[campo.key]}
                  </Box>
                ))}

                <Box sx={{ minWidth: "100px" }}>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => verDetalle(item)}
                      startIcon={
                        !titulo.includes("Seleccionar") ? (
                          <RemoveRedEyeIcon />
                        ) : (
                          <PanToolAltIcon />
                        )
                      }
                    >
                      {!titulo.includes("Seleccionar") ? "Ver" : "Seleccionar"}
                    </Button>
                  </CardActions>
                </Box>
              </Box>
            </ListItem>
        )}

        {paginados.length === 0 && (
          <ListItem>
            <ListItemText primary="No se encontraron resultados." />
          </ListItem>
        )}
      </List>

      {/* Paginación */}
      {paginasTotales > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={paginasTotales}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default ListFilter;
