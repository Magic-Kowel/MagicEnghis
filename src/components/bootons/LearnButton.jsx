import { Button, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
export const LearnButton = ({ isLearn, setIsLearn }) => {
  return (
    <>
      <Tooltip title="Entrenar">
        <Button
          variant={isLearn ? "contained" : "outlined"}
          startIcon={<FitnessCenterIcon />}
          onClick={() => setIsLearn((prev) => !prev)}
        ></Button>
      </Tooltip>
    </>
  );
};
LearnButton.propTypes = {
  isLearn: PropTypes.bool.isRequired,
  setIsLearn: PropTypes.func.isRequired,
};
