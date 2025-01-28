import { useState, useEffect } from "react";
import { verbsIrregularsList } from "../db/verbsIrregularsList";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { randomIndex } from "../tools/randomIndex";
import DataTable from "../components/DataTable/DataTable";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Swal from "sweetalert2";
const getRandomProperty = (obj) => {
  const keys = Object.keys(obj).filter((key) => key !== "translation");
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return randomKey;
};
const IrregularsVerbs = () => {
  const [randomIndexList, setRandomIndexList] = useState(0);
  const [randomProperty, setRandomProperty] = useState("infinitive");
  const [isLearn, setIsLearn] = useState(false);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  useEffect(() => {
    handleRandom();
  }, []);

  useEffect(() => {
    const result =
      verbsIrregularsList.filter((item) => {
        return (
          item.infinitive.toLowerCase().includes(search.toLowerCase()) ||
          item.participle.toLowerCase().includes(search.toLowerCase()) ||
          item.past.toLowerCase().includes(search.toLowerCase()) ||
          item.translation.toLowerCase().includes(search.toLowerCase())
        );
      }) || [];
    setListFilter(result.length === 0 ? verbsIrregularsList : result);
  }, [search]);
  const handleRandom = () => {
    const index = randomIndex(verbsIrregularsList);
    setRandomIndexList(index);
    const property = getRandomProperty(verbsIrregularsList[index]);
    setRandomProperty(property);
  };
  const handleValidate = () => {
    const result = verbsIrregularsList[randomIndexList][randomProperty] == text;
    Swal.fire({
      icon: result ? "success" : "error",
      title: result ? "¡Correcto!" : "Incorrecto",
      text: !result
        ? `Respuesta correcta: ${verbsIrregularsList[randomIndexList][randomProperty]}`
        : "¡Bien hecho!",
    });
    handleRandom();
    setText("");
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Grid item ml={4} xs={12}>
          <Button
            variant={isLearn ? "contained" : "outlined"}
            startIcon={<FitnessCenterIcon />}
            onClick={() => setIsLearn((prev) => !prev)}
          ></Button>
        </Grid>
        {!isLearn ? (
          <>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2">Escribe la traducción</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3">
                  {verbsIrregularsList[randomIndexList].infinitive}
                </Typography>
                <Typography variant="h4">
                  {verbsIrregularsList[randomIndexList].translation}
                </Typography>
                <Typography>{randomProperty}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center", marginX: 2 }}>
                <TextField
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
            </Grid>
          </>
        ) : (
          <>
            <Grid item marginX={2} xs={12}>
              <TextField
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item marginX={2} xs={12}>
              <DataTable
                listTitles={["Infinitive", "Past", "Participle"]}
                listKeys={["infinitive", "past", "participle"]}
                dataList={listFilter}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default IrregularsVerbs;
