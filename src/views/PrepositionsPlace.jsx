import { useState, useEffect, useCallback } from "react";
import { Grid, Box, Paper, Button, Typography, Fade } from "@mui/material";
import Title from "../components/Title";
import { randomIndex } from "../tools/randomIndex";
import { prepositionsPlaceList } from "../db/prepositionsPlaceList";
import Swal from "sweetalert2";

function PrepositionsPlace() {
  const [word, setWord] = useState(null);
  const [options, setOptions] = useState([]);

  // Función para obtener la palabra actual y 3 opciones aleatorias (1 correcta y 3 incorrectas)
  const handleRandom = useCallback(() => {
    if (prepositionsPlaceList.length === 0) return;

    const correctIndex = randomIndex(prepositionsPlaceList);
    const currentWord = prepositionsPlaceList[correctIndex];
    setWord(currentWord);

    // Filtrar opciones incorrectas
    const incorrectOptions = prepositionsPlaceList.filter(
      (_, i) => i !== correctIndex,
    );

    // Barajar y tomar 3 incorrectas
    const shuffledIncorrect = [...incorrectOptions].sort(
      () => 0.5 - Math.random(),
    );
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);

    // Combinar con la correcta y barajar de nuevo
    const currentOptions = [...selectedIncorrect, currentWord].sort(
      () => 0.5 - Math.random(),
    );

    setOptions(currentOptions);
  }, []);

  useEffect(() => {
    handleRandom();
  }, [handleRandom]);

  const handleCheck = (optionSpanish) => {
    const result = word.spanish === optionSpanish;
    Swal.fire({
      icon: result ? "success" : "error",
      title: result ? "¡Correcto!" : "Incorrecto",
      text: !result ? `Respuesta correcta: ${word.spanish}` : "¡Bien hecho!",
      timer: 1500,
      showConfirmButton: false,
    });
    handleRandom();
  };

  if (!word) return null;

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
        justifyContent: "center",
      }}
    >
      <Fade in={true} timeout={300}>
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: 600,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Título de la sección */}
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Title title="Selecciona la opción correcta" />
          </Grid>

          {/* Palabra a adivinar (Flashcard visual) */}
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                width: "100%",
                maxWidth: 450,
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
                ¿Qué significa en español?
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {word.english}
              </Typography>
            </Paper>
          </Grid>

          {/* Opciones de respuesta dinámicas (4 opciones en lugar de todas) */}
          <Grid
            size={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 450,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {options.map((item, index) => (
                <Button
                  key={index}
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => handleCheck(item.spanish)}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderColor: "divider",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      borderColor: "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                >
                  {item.spanish}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
}

export default PrepositionsPlace;
