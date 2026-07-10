import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
export default function VirtualKeyboard({ setText }) {
  // Distribución de filas del teclado alfabético
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const handleKeyPress = (letter) => {
    setText((prev) => prev + letter);
  };

  const handleBackspace = () => {
    setText((prev) => prev.slice(0, -1));
  };

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        p: 1,
        boxSizing: "border-box",
        display: {
          lg: "none",
          md: "block",
          sm: "block",
        },
      }}
    >
      {/* Contenedor Principal del Teclado */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px", // Espacio vertical entre filas
          bgcolor: "#eceff1",
          p: 1,
          borderRadius: 3,
        }}
      >
        {rows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "4px", // Espacio horizontal entre teclas
              width: "100%",
            }}
          >
            {row.map((letter) => (
              <Button
                key={letter}
                variant="contained"
                onClick={() => handleKeyPress(letter)}
                disableRipple // Mejora el rendimiento táctil en móvil
                sx={{
                  // Clave para móvil: Se adapta al ancho disponible restando los espacios
                  flex: "1 1 0px",
                  minWidth: 0,
                  maxWidth: "4em",
                  height: { xs: 45, sm: 50 }, // Altura cómoda para el dedo
                  p: 0,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" }, // Letras legibles
                  fontWeight: "bold",
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  textTransform: "none",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 3px rgba(0,0,0,0.1)",
                  "&:active": {
                    backgroundColor: "#e0e0e0",
                  },
                  "&:hover": {
                    backgroundColor: "#f5f5f5", // Evita el estado hover molesto en móviles
                  },
                }}
              >
                {letter}
              </Button>
            ))}
          </Box>
        ))}

        {/* Fila extra para el botón de borrar (opcional, pero útil) */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleBackspace}
            sx={{ width: "40%", textTransform: "none", fontWeight: "bold" }}
          >
            clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
VirtualKeyboard.propTypes = {
  setText: PropTypes.func.isRequired,
};
