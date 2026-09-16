import { vsList } from "../db/vsList";
import { randomIndex } from "../tools/randomIndex";
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  Button,
  TextField,
  CardContent,
  IconButton,
  Paper,
  Fade,
} from "@mui/material";
import Title from "../components/Title";
import DataTableCollapse from "../components/DataTable/DataTableCollapse";
import { LearnButton } from "../components/bootons/LearnButton";
import SplitButton from "../components/bootons/SplitButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

function Vs() {
  const [randomIndexList, setRandomIndexList] = useState(0);
  const [isLearn, setIsLearn] = useState(false);
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  const [level, setLevel] = useState("A2");
  const [selectedIndex, setSelectedIndex] = useState([]);

  useEffect(() => {
    handleRandom();
  }, [level]); // Se actualiza al cambiar el nivel

  useEffect(() => {
    const result =
      vsList.filter((item) => {
        return (
          item?.title?.toLowerCase().includes(search.toLowerCase()) ||
          item?.terms?.some((term) =>
            term.word?.toLowerCase().includes(search.toLowerCase()),
          )
        );
      }) || [];
    setListFilter(result.length === 0 ? vsList : result);
  }, [search]);

  const handleRandom = () => {
    const filterList = vsList.filter((item) => item.difficulty === level);
    if (filterList.length > 0) {
      const index = vsList.indexOf(filterList[randomIndex(filterList)]);
      setRandomIndexList(index);
      setSelectedIndex([]); // Resetea las tarjetas volteadas al cambiar
    }
  };

  const handleSwitchCard = (index) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((item) => item !== index));
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100svh",
        bgcolor: "background.default",
        py: 4,
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: 900,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isLearn ? (
          <Fade in={true} timeout={300}>
            <Grid
              container
              spacing={3}
              sx={{ width: "100%", justifyContent: "center" }}
            >
              {/* Botón de Modo Aprendizaje */}
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
              </Grid>

              {/* Título y Concepto */}
              <Grid size={12} sx={{ textAlign: "center" }}>
                <Title title="¿Cuál es la diferencia?" />
                <Typography
                  textTransform="capitalize"
                  variant="h4"
                  sx={{ fontWeight: "bold", mt: 1, color: "text.primary" }}
                >
                  {vsList[randomIndexList]?.title}
                </Typography>
              </Grid>

              {/* Controles: Selector de Nivel y Botón Siguiente */}
              <Grid
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  my: 1,
                }}
              >
                <SplitButton
                  options={["A2", "A2-B1", "B1", "B1-B2", "B2", "B2-C1"]}
                  getValue={setLevel}
                  handle={handleRandom}
                  index={0}
                />
                <Button
                  variant="contained"
                  onClick={handleRandom}
                  sx={{ px: 4, py: 1, borderRadius: 2 }}
                >
                  Siguiente
                </Button>
              </Grid>

              {/* Tarjetas de Términos */}
              <Grid
                container
                spacing={3}
                sx={{ width: "100%", mt: 1, justifyContent: "center" }}
              >
                {vsList[randomIndexList]?.terms.map((item, index) => {
                  const isFlipped = selectedIndex.includes(index);
                  return (
                    <Grid
                      size={{ xs: 12, md: 6 }}
                      key={`${item.word}-${index}`}
                    >
                      <Card
                        elevation={3}
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: 220,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          textAlign: "center",
                          borderRadius: 4,
                          position: "relative",
                          border: `1px solid`,
                          borderColor: isFlipped ? "secondary.main" : "divider",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <CardContent
                          sx={{
                            p: 4,
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {isFlipped ? (
                            <>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "bold",
                                  color: "secondary.main",
                                  mb: 1,
                                }}
                              >
                                Diferencia:
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {vsList[randomIndexList].difference}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontStyle: "italic",
                                  color: "text.secondary",
                                }}
                              >
                                Uso: {vsList[randomIndexList].correct_usage}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography
                                variant="h3"
                                sx={{
                                  fontWeight: "bold",
                                  color: "primary.main",
                                  mb: 1,
                                }}
                              >
                                {item.word}
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{ color: "text.secondary" }}
                              >
                                {item.meaning}
                              </Typography>
                            </>
                          )}
                        </CardContent>

                        {/* Botón flotante dentro de la tarjeta para voltear */}
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => handleSwitchCard(index)}
                            sx={{ bgcolor: "action.hover" }}
                            title="Ver detalles / Voltear"
                          >
                            <ChangeCircleIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Fade>
        ) : (
          <Fade in={true} timeout={300}>
            <Grid
              container
              spacing={3}
              sx={{ width: "100%", justifyContent: "center" }}
            >
              {/* Botón de Regreso */}
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
              </Grid>

              {/* Barra de Búsqueda */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                  <TextField
                    fullWidth
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    autoComplete="off"
                    type="search"
                    label="Buscar diferencias o palabras..."
                    size="small"
                  />
                </Paper>
              </Grid>

              {/* Tabla Colapsable */}
              <Grid size={12}>
                <DataTableCollapse
                  titleMain="title"
                  collapseItem="terms"
                  dataList={listFilter}
                  listTitles={["Palabra", "Significado", "Ejemplo"]}
                  listKeys={["word", "meaning", "example"]}
                />
              </Grid>
            </Grid>
          </Fade>
        )}
      </Grid>
    </Box>
  );
}

export default Vs;
