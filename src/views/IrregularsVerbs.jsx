import { useState, useEffect } from "react";
import { verbsIrregularsList } from "../db/verbsIrregularsList";
import { LearnButton } from "../components/bootons/LearnButton";
import {
  Box,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  Chip,
  Grid,
  Paper,
  Fade,
} from "@mui/material";
import { randomIndex } from "../tools/randomIndex";
import DataTable from "../components/DataTable/DataTable";
import StackTable from "../components/DataTable/StackTable";
import Swal from "sweetalert2";
import Title from "../components/Title";
import VirtualKeyboard from "../components/VirtualKeyboard";

const getRandomProperty = (obj) => {
  const keys = Object.keys(obj).filter(
    (key) => key !== "translation" && key !== "difficulty",
  );
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return randomKey;
};

const MODE = Object.freeze({
  LEARN: 0,
  RANDOM: 1,
  LEVEL: 2,
});

const IrregularsVerbs = () => {
  const [indexList, setIndexList] = useState(0);
  const [randomProperty, setRandomProperty] = useState("infinitive");
  const [isLearn, setIsLearn] = useState(false);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  const [mode, setMode] = useState(MODE.LEVEL);
  const [level, setLevel] = useState(0);
  const [levelLearn, setLevelLearn] = useState("All");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    handleRandom();
  }, []);

  useEffect(() => {
    const result =
      verbsIrregularsList.filter((item) => {
        const matchesSearch =
          item.infinitive.toLowerCase().includes(search.toLowerCase()) ||
          item.participle.toLowerCase().includes(search.toLowerCase()) ||
          item.past.toLowerCase().includes(search.toLowerCase()) ||
          item.translation.toLowerCase().includes(search.toLowerCase());

        const matchesLevel =
          levelLearn === "All" ||
          item.difficulty.toLowerCase() === levelLearn.toLowerCase();

        return matchesSearch && matchesLevel;
      }) || [];
    setListFilter(result.length === 0 ? verbsIrregularsList : result);
  }, [search, levelLearn]);

  function handleModeGame(result) {
    let nextLevel = level;
    if (mode === MODE.LEVEL) {
      if (result) {
        nextLevel = level + 1;
        setLevel(nextLevel);
      } else {
        nextLevel = 0;
        setLevel(nextLevel);
      }
    }
    handleRandom(nextLevel);
  }

  const handleRandom = (nextLevel = level) => {
    const index = randomIndex(verbsIrregularsList);
    setIndexList(mode === MODE.LEVEL ? nextLevel : index);
    const property = getRandomProperty(verbsIrregularsList[index]);
    setRandomProperty(property);
  };

  const handleValidate = () => {
    const result =
      verbsIrregularsList[indexList][randomProperty].toLowerCase() ==
      text.toLowerCase();
    Swal.fire({
      icon: result ? "success" : "error",
      title: result ? "¡Correcto!" : "Incorrecto",
      text: !result
        ? `Respuesta correcta: ${verbsIrregularsList[indexList][randomProperty]}`
        : "¡Bien hecho!",
      confirmButtonColor: theme.palette.primary.main,
    });
    handleModeGame(result);
    setText("");
  };

  return (
    <Box
      sx={{
        minHeight: "100svh", // <--- Corregida la comilla invertida aquí
        bgcolor: "background.default",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        direction="column"
        sx={{
          maxWidth: 900,
          width: "100%",
          alignItems: "center",
        }}
      >
        {!isLearn ? (
          <Fade in={true} timeout={300}>
            <Grid
              container
              spacing={3}
              direction="column"
              sx={{ width: "100%", alignItems: "center" }}
            >
              {/* Título y Modos de Juego unificados en la parte superior */}
              <Grid
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Title title="Escribe la traducción" />
                <ButtonGroup
                  variant="outlined"
                  aria-label="Options mode game"
                  size={isMobile ? "small" : "medium"}
                >
                  <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
                  <Button
                    onClick={() => setMode(MODE.RANDOM)}
                    variant={MODE.RANDOM === mode ? "contained" : "outlined"}
                  >
                    Random
                  </Button>
                  <Button
                    onClick={() => setMode(MODE.LEVEL)}
                    variant={MODE.LEVEL === mode ? "contained" : "outlined"}
                  >
                    Niveles
                  </Button>
                </ButtonGroup>
              </Grid>

              {/* Tarjeta Central del Reto (Game Card) */}
              <Grid
                size={{ xs: 12, md: 10, lg: 8 }}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 3, md: 4 },
                    width: "100%",
                    borderRadius: 4,
                    textAlign: "center",
                    bgcolor: "background.paper",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    {verbsIrregularsList[indexList].infinitive}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ my: 1, color: "text.secondary" }}
                  >
                    {verbsIrregularsList[indexList].translation}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography component="span" variant="body1">
                      Escribe el verbo en:
                    </Typography>
                    <Chip
                      sx={{ fontWeight: "bold", px: 1 }}
                      label={randomProperty.toUpperCase()}
                      color="primary"
                    />
                    {MODE.LEVEL === mode && (
                      <Chip
                        label={`Nivel ${level + 1}`}
                        variant="outlined" // <--- Cambiado a variante estándar válida en MUI
                        color="secondary"
                        size="small"
                      />
                    )}
                  </Box>

                  {/* Input y Botón de Validación dentro de la misma tarjeta */}
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Tu respuesta..."
                      fullWidth
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      autoComplete="off"
                      autoFocus
                      onKeyUp={(e) => {
                        if (e.key === "Enter") handleValidate();
                      }}
                      sx={{ maxWidth: 400 }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        width: "100%",
                        maxWidth: 400,
                        justifyContent: "center",
                      }}
                    >
                      {MODE.RANDOM === mode && (
                        <Button
                          variant="outlined"
                          onClick={() => handleRandom()}
                          sx={{ flex: 1 }}
                        >
                          Siguiente
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleValidate}
                        sx={{ flex: 1, py: 1 }}
                      >
                        Validar
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Teclado Virtual */}
              <Grid
                size={12}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 600 }}>
                  <VirtualKeyboard setText={setText} />
                </Box>
              </Grid>
            </Grid>
          </Fade>
        ) : (
          <Fade in={true} timeout={300}>
            <Grid
              container
              spacing={3}
              direction="column"
              sx={{ width: "100%", alignItems: "center" }}
            >
              {/* Botón de Regreso / Salir de Learn */}
              <Grid
                size={12}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
              </Grid>

              {/* Contenedor de Buscador y Filtros estilo Panel */}
              <Grid size={{ xs: 12, md: 10, lg: 8 }} sx={{ width: "100%" }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Buscar verbo o traducción..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    autoComplete="off"
                    size="small"
                  />
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Options difficulty"
                    sx={{
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {["Easy", "Medium", "Hard", "All"].map((item, index) => (
                      <Button
                        key={index}
                        onClick={() => setLevelLearn(item)}
                        variant={
                          levelLearn?.toLowerCase() === item?.toLowerCase()
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                      >
                        {item}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Paper>
              </Grid>

              {/* Tabla de Resultados */}
              <Grid
                size={{ xs: 12, md: 12, lg: 12 }}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  {!isMobile ? (
                    <DataTable
                      listTitles={[
                        "Traducción",
                        "Infinitive",
                        "Past",
                        "Participle",
                      ]}
                      listKeys={[
                        "translation",
                        "infinitive",
                        "past",
                        "participle",
                      ]}
                      dataList={listFilter}
                    />
                  ) : (
                    <StackTable
                      listTitles={[
                        "Traducción",
                        "Infinitive",
                        "Past",
                        "Participle",
                      ]}
                      listKeys={[
                        "translation",
                        "infinitive",
                        "past",
                        "participle",
                      ]}
                      dataList={listFilter}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Grid>
    </Box>
  );
};

export default IrregularsVerbs;
