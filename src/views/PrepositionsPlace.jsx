import { useState, useEffect } from "react";
import { Grid, Box, Paper, Button, Typography } from "@mui/material";
import Title from "../components/Title";
import { randomIndex } from "../tools/randomIndex";
import { prepositionsPlaceList } from "../db/prepositionsPlaceList";
import Swal from "sweetalert2";
function PrepositionsPlace() {
  const [word, setWord] = useState("");
  const handleRandom = () => {
    const index = randomIndex(prepositionsPlaceList);
    setWord(prepositionsPlaceList[index]);
  };
  useEffect(() => {
    handleRandom();
  }, []);
  const hanleCheck = (option) => {
    const result = word.spanish === option;
    Swal.fire({
      icon: result ? "success" : "error",
      title: result ? "¡Correcto!" : "Incorrecto",
      text: !result ? `Respuesta correcta: ${word.spanish}` : "¡Bien hecho!",
    });
    handleRandom();
  };
  return (
    <>
      <Grid
        container
        spacing={4}
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100svh",
          p: 3,
          bgcolor: "background.default",
        }}
      >
        {/* Título de la sección */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Title title="Selecciona la opción correcta" />
          </Box>
        </Grid>

        {/* Palabra a adivinar (Flashcard visual) */}
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 400,
              textAlign: "center",
              borderRadius: 4,
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {word.english}
            </Typography>
          </Paper>
        </Grid>

        {/* Opciones de respuesta */}
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              gap: 1.5, // Espaciado limpio entre botones sin necesidad de listas
            }}
          >
            {prepositionsPlaceList.map((item, index) => (
              <Button
                key={index}
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => hanleCheck(item.spanish)}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none", // Mantiene el texto en minúsculas naturales
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
    </>
  );
}
export default PrepositionsPlace;
