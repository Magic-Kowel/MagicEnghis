import { Container, Grid, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function NotFound() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          margin: 0,
          padding: 0,
          background:
            "linear-gradient(90deg, rgba(255,0,155,1) 0%, rgba(136,84,222,1) 45%, rgba(0,212,255,1) 100%);",
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={12}>
              <Box
                mt={20}
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ErrorOutlineIcon
                  sx={{
                    fontSize: "10rem",
                  }}
                />
                <Typography component="h1" fontSize="10rem">
                  404
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default NotFound;
