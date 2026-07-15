import { useState, useEffect } from "react";
import { verbsIrregularsList } from "../db/verbsIrregularsList";
import { LearnButton } from "../components/bootons/LearnButton";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  Chip,
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
  LEARN: 0, // Fixed potential typo from 'rearn'
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
        // 1. Condición de búsqueda (coincide con cualquiera de las columnas)
        const matchesSearch =
          item.infinitive.toLowerCase().includes(search.toLowerCase()) ||
          item.participle.toLowerCase().includes(search.toLowerCase()) ||
          item.past.toLowerCase().includes(search.toLowerCase()) ||
          item.translation.toLowerCase().includes(search.toLowerCase());

        // 2. Condición de nivel (si es "All" pasa siempre, si no, debe coincidir exactamente)
        const matchesLevel =
          levelLearn === "All" ||
          item.difficulty.toLowerCase() === levelLearn.toLowerCase();

        // El elemento se queda si cumple la búsqueda Y cumple el nivel
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
    });
    handleModeGame(result);
    setText("");
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100svh",
        }}
      >
        {!isLearn ? (
          <>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Title title="Escribe la traducción" />
              </Box>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="Options mode game">
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
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3">
                  {verbsIrregularsList[indexList].infinitive}
                </Typography>
                <Typography variant="h6">
                  {verbsIrregularsList[indexList].translation}
                </Typography>
                <Typography>
                  Escribiré el verbo en{" "}
                  <Chip
                    sx={{ fontWeight: "bold" }}
                    label={randomProperty}
                  ></Chip>
                </Typography>
                {MODE.LEVEL === mode && (
                  <Chip
                    label={`Level ${level + 1}`}
                    variant="filled"
                    color="primary"
                    size="small"
                  />
                )}
              </Box>
            </Grid>
            {MODE.RANDOM === mode && (
              <Grid
                container
                justifyContent="flex-end"
                marginX="30%"
                item
                xs={12}
                md={12}
                lg={12}
              >
                <Grid item xs={12} sm={2} md={1} lg={1}>
                  <Box sx={{ textAlign: "center", marginX: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleRandom()}
                    >
                      Next
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box sx={{ textAlign: "center", marginX: 2 }}>
                <TextField
                  label="Traducción"
                  fullWidth
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  autoComplete="off"
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
              </Box>
              <VirtualKeyboard setText={setText} />
            </Grid>
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop="1.5rem"
              >
                <ButtonGroup variant="outlined" aria-label="Options difficulty">
                  {["Easy", "Medium", "Hard", "All"].map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => setLevelLearn(item)}
                      variant={
                        levelLearn?.toLowerCase() === item?.toLowerCase()
                          ? "contained"
                          : "outlined"
                      }
                    >
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            </Grid>
            <Grid item marginX={2} xs={12}>
              {!isMobile ? (
                <DataTable
                  listTitles={[
                    "Traducción",
                    "Infinitive",
                    "Past",
                    "Participle",
                  ]}
                  listKeys={["translation", "infinitive", "past", "participle"]}
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
                  listKeys={["translation", "infinitive", "past", "participle"]}
                  dataList={listFilter}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default IrregularsVerbs;
