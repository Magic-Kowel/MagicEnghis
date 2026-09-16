import { useState, useEffect } from "react";
import normalizeText from "../tools/normalizeText";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
  Fade,
} from "@mui/material";
import { randomEnglish } from "../tools/randomEnglish";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Title from "../components/Title";
import VirtualKeyboard from "../components/VirtualKeyboard";
import { LearnButton } from "../components/bootons/LearnButton";
import DataTable from "../components/DataTable/DataTable";
import StackTable from "../components/DataTable/StackTable";

function WriteMemoryScreen({ dataList }) {
  const [text, setText] = useState("");
  const [randomIndex, setRandomIndex] = useState(0);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isLearn, setIsLearn] = useState(false);
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState(dataList);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleValidateENG = () =>
    normalizeText(text.trim().toUpperCase()) ===
    normalizeText(dataList[randomIndex]?.spanish.toUpperCase());

  const handleValidateESP = () =>
    normalizeText(text.trim().toUpperCase()) ===
    normalizeText(dataList[randomIndex]?.english.toUpperCase());

  const handleValidate = () => {
    const isCorrect = isEnglish ? handleValidateENG() : handleValidateESP();
    const correctAnswer = isEnglish
      ? dataList[randomIndex]?.spanish
      : dataList[randomIndex]?.english;

    Swal.fire({
      icon: isCorrect ? "success" : "error",
      title: isCorrect ? "¡Correcto!" : "Incorrecto",
      text: !isCorrect
        ? `Respuesta correcta: ${correctAnswer}`
        : "¡Bien hecho!",
    });

    handleRandom();
  };

  const handleRandom = () => {
    if (dataList.length > 0) {
      const index = Math.floor(Math.random() * dataList.length);
      setRandomIndex(index);
      setIsEnglish(randomEnglish());
      setText("");
    }
  };

  useEffect(() => {
    handleRandom();
  }, [dataList]);

  useEffect(() => {
    const result =
      dataList.filter((item) => {
        return (
          item.english.toLowerCase().includes(search.toLowerCase()) ||
          item.spanish.toLowerCase().includes(search.toLowerCase())
        );
      }) || [];
    setListFilter(result.length === 0 ? dataList : result);
  }, [search, dataList]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          maxWidth: 700,
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

              {/* Título de la sección */}
              <Grid size={12} sx={{ textAlign: "center" }}>
                <Title title="Escribe la traducción" />
              </Grid>

              {/* Tarjeta central de desafío */}
              <Grid
                size={{ xs: 12, md: 8 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    width: "100%",
                    textAlign: "center",
                    borderRadius: 4,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "text.secondary",
                      mb: 1,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Traduce al {isEnglish ? "Español" : "Inglés"}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}
                  >
                    {isEnglish
                      ? dataList[randomIndex]?.english
                      : dataList[randomIndex]?.spanish}
                  </Typography>

                  <TextField
                    label="Escribe tu respuesta..."
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleValidate();
                      }
                    }}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                    onClick={handleValidate}
                  >
                    Validar
                  </Button>
                </Paper>
              </Grid>

              {/* Teclado Virtual */}
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <VirtualKeyboard setText={setText} />
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
              {/* Botón para regresar */}
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
              </Grid>

              {/* Buscador */}
              <Grid size={{ xs: 12, md: 10 }}>
                <TextField
                  fullWidth
                  label="Buscar palabra..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  autoComplete="off"
                  size="small"
                />
              </Grid>

              {/* Tabla de Estudio */}
              <Grid size={12}>
                {!isMobile ? (
                  <DataTable
                    listTitles={["English", "Spanish"]}
                    listKeys={["english", "spanish"]}
                    dataList={listFilter}
                  />
                ) : (
                  <StackTable
                    listTitles={["English", "Spanish"]}
                    listKeys={["english", "spanish"]}
                    dataList={listFilter}
                  />
                )}
              </Grid>
            </Grid>
          </Fade>
        )}
      </Grid>
    </Box>
  );
}

WriteMemoryScreen.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string.isRequired,
      spanish: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default WriteMemoryScreen;
