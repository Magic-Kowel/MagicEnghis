import { Box, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        px: 4,
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Mensaje de agradecimiento visible */}
        <Typography
          color="white"
          sx={{
            fontSize: "1.2rem",
            lineHeight: 1.6,
            color:"#fff"
          }}
        >
          Thank you for visiting my website. I really appreciate that..🎉
          <br />
          Have an excellent day ....
        </Typography>

        {/* Enlaces a redes sociales accesibles */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 1,
          }}
        >
          <Link
            href="https://github.com/Magic-Kowel"
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de GitHub de Josúe Rodrigo"
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <GitHubIcon
              sx={{
                color: "white",
                fontSize: "3rem",
              }}
            />
          </Link>

          <Link
            href="https://www.linkedin.com/in/josúe-rodrigo-fierro-morfin-a11b001ba/"
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de LinkedIn de Josúe Rodrigo"
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <LinkedInIcon
              sx={{
                color: "white",
                fontSize: "3rem",
              }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
