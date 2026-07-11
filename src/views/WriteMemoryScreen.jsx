import { useState, useEffect } from "react";
import normalizeText from "../tools/normalizeText"; // Asegúrate de que este helper esté definido
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { randomEnglish } from "../tools/randomEnglish"; // Asegúrate de que este helper esté definido
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
  const [listFilter, setListFilter] = useState("");
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
  }, [search]);
  return (
    <>
      <Grid
        container
        padding={2}
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        {!isLearn ? (
          <>
            <Grid item xs={12}>
              <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
              <Box sx={{ textAlign: "center" }}>
                <Title title="Escribe la traducción" />
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
            <VirtualKeyboard setText={setText} />
          </>
        ) : (
          <>
            <Grid item ml={4} xs={12} mt={2}>
              <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
            </Grid>
            <Grid item marginX={2} xs={12}>
              <TextField
                fullWidth
                label="Buscar"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item marginX={2} xs={12}>
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
          </>
        )}
      </Grid>
    </>
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
