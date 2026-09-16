import { Container, Typography, Box, Button, Fade } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(255,0,155,0.85) 0%, rgba(136,84,222,0.85) 50%, rgba(0,212,255,0.85) 100%)",
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      <Fade in={true} timeout={600}>
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 6,
              p: { xs: 4, md: 8 },
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              color: "white",
            }}
          >
            {/* Ícono de Error */}
            <ErrorIcon
              sx={{
                fontSize: { xs: "5rem", md: "7rem" },
                color: "rgba(255, 255, 255, 0.9)",
                mb: 2,
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.08)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />

            {/* Código 404 */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "5rem", md: "8rem" },
                fontWeight: 900,
                letterSpacing: 2,
                lineHeight: 1,
                mb: 2,
                textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              404
            </Typography>

            {/* Mensaje descriptivo */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              ¡Vaya! Página no encontrada
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mb: 4,
                maxWidth: 450,
                mx: "auto",
              }}
            >
              Parece que te has perdido en el camino. La página que buscas no existe o ha sido movida.
            </Typography>

            {/* Botón de retorno al inicio */}
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{
                bgcolor: "white",
                color: "#8854de",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 4,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
              }}
            >
              Volver al Inicio
            </Button>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
}

export default NotFound;