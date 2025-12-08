import { vsList } from "../db/vsList";
import { randomIndex } from "../tools/randomIndex";
import { useEffect, useState } from "react";
import { Grid, Box, Typography, Card, Button } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Title from "../components/Title";
import { colors } from "../stylesConfig";
import DataTableCollapse from "../components/DataTable/DataTableCollapse";
function Vs() {
  const [randomIndexList, setRandomIndexList] = useState(0);
  const [isLearn, setIsLearn] = useState(false);
  useEffect(() => {
    handleRandom();
  }, []);
  const handleRandom = () => {
    const index = randomIndex(vsList);
    setRandomIndexList(index);
    console.log(vsList[randomIndexList]);
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
                <Title title="Cual es la diferencia?" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography textTransform="capitalize" variant="h4">
                  {vsList[randomIndexList].title}
                </Typography>
              </Box>
            </Grid>
            <Grid
              container
              spacing={2}
              marginX={2}
              marginTop="2rem"
              flexDirection="row"
            >
              {vsList[randomIndexList].terms.map((item, index) => (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <Card
                      key={`${item.word}-${index}`}
                      sx={{
                        border: 1,
                        borderColor: colors.primaryColor,
                        width: "100%",
                        height: 1,
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        gutterBottom
                        margin={5}
                        textAlign="center"
                        sx={{ fontSize: "2rem" }}
                      >
                        {item.meaning}
                      </Typography>
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <DataTableCollapse
              titleMain="title"
              collapseItem="terms"
              dataList={vsList}
              listTitles={["Palabra", "Significado", "Ejemplo"]}
              listKeys={["word", "meaning", "example"]}
            />
          </>
        )}
      </Grid>
    </>
  );
}
export default Vs;
