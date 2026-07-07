import { vsList } from "../db/vsList";
import { randomIndex } from "../tools/randomIndex";
import { useEffect, useState } from "react";
import { Grid, Box, Typography, Card, Button, TextField } from "@mui/material";
import Title from "../components/Title";
import { colors } from "../stylesConfig";
import DataTableCollapse from "../components/DataTable/DataTableCollapse";
import { LearnButton } from "../components/bootons/LearnButton";
function Vs() {
  const [randomIndexList, setRandomIndexList] = useState(0);
  const [isLearn, setIsLearn] = useState(false);
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  useEffect(() => {
    handleRandom();
  }, []);
  useEffect(() => {
    const result =
      vsList.filter((item) => {
        return (
          item?.title?.toLowerCase().includes(search.toLowerCase()) ||
          item?.terms.word?.toLowerCase().includes(search.toLowerCase())
        );
      }) || [];
    setListFilter(result.length === 0 ? vsList : result);
  }, [search]);
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
            <Grid item ml={4} xs={12}>
              <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
            </Grid>
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
            <Grid
              container
              spacing={2}
              marginX={2}
              marginTop="2rem"
              marginBottom="1rem"
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
            <Grid item ml={4} mt={1} xs={12}>
              <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
            </Grid>
            <Grid item marginX={2} xs={12}>
              <TextField
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete="off"
                type="search"
              />
            </Grid>
            <DataTableCollapse
              titleMain="title"
              collapseItem="terms"
              dataList={listFilter}
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
