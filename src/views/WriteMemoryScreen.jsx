import { useState, useEffect } from "react";
import normalizeText from "../tools/normalizeText"; // Asegúrate de que este helper esté definido
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import { randomEnglish } from "../tools/randomEnglish"; // Asegúrate de que este helper esté definido
import Swal from "sweetalert2";
import PropTypes from "prop-types";

function WriteMemoryScreen({ dataList }) {
  const [text, setText] = useState("");
  const [randomIndex, setRandomIndex] = useState(0);
  const [isEnglish, setIsEnglish] = useState(true);

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

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Grid item xs={12}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Escribe la traducción</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          {isEnglish
            ? dataList[randomIndex]?.english
            : dataList[randomIndex]?.spanish}
        </Typography>
        <TextField
          label="Traducción"
          variant="outlined"
          autoComplete="off"
          fullWidth
          value={text}
          margin="dense"
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleValidate();
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleValidate}
        >
          Validar
        </Button>
      </Grid>
    </Grid>
  );
}

WriteMemoryScreen.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string.isRequired,
      spanish: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WriteMemoryScreen;
