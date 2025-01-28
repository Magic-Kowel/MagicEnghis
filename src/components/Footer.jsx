import { Box, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
function Footer() {
  return (
    <>
      <Box
 
        sx={{
          p: 10,
          backgroundColor: "#000000",
        }}
      >
        <Grid direction="column" container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography
              data-aos="fade-up"
              color="white"
              justifyContent="center"
              sx={{
                fontSize: "1.2rem",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Thank you for visiting my website. I really appreciate that..🎉
              Have an excellent day ....
            </Typography>
          </Grid>
          <Grid
            data-aos="fade-up"
            item
            xs={12}
            md={12}
            sx={{ textAlign: "center" }}
          >
            <Link href="https://github.com/Magic-Kowel" underline="none">
              <GitHubIcon
                fontSize="large"
                sx={{
                  color: "white",
                  fontSize: "3rem",
                }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/josúe-rodrigo-fierro-morfin-a11b001ba/"
              underline="none"
            >
              <LinkedInIcon
                fontSize="large"
                sx={{
                  color: "white",
                  fontSize: "3rem",
                }}
              />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Footer;
