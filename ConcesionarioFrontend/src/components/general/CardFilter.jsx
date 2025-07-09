import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Pagination,
  Divider,
  CardActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

function CardFilter({
  titulo,
  data = [],
  campos = [],
  itemsPorPagina = 6,
  verDetalle,
  indicacion=''
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
      {/* Header */}
      {titulo && (
        <Typography variant="h5" gutterBottom>
          {titulo}
        </Typography>
      )}
      <Typography variant="body2" color="textSecondary">
        {indicacion}
      </Typography>

      <Box display="flex" gap={2} mb={3} mt={2}>
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
      {/* Datos */}
      <Grid container spacing={2}>
        {paginados.length > 0 ? (
          paginados.map((item) =>
            
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    minHeight: 170,
                    minWidth: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {item.imagenUrl && (
                    <Box
                      component="img"
                      src={item.imagenUrl}
                      alt="imagen del item"
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <CardContent>
                    {campos.map((campo) => (
                      <Typography key={campo.key} variant="body2">
                        <strong>{campo.label}:</strong>{" "}
                        {campo.key === "precio"
                          ? new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                              minimumFractionDigits: 0,
                            }).format(item[campo.key] || 0)
                          : item[campo.key]}
                      </Typography>
                    ))}
                  </CardContent>
                  <Divider />
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
                </Card>
              </Grid>
          )
        ) : (
          <Grid item xs={12}>
            <Typography>No se encontraron resultados</Typography>
          </Grid>
        )}
      </Grid>
      {/* paginación */}
      {paginasTotales > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
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

export default CardFilter;
