import {
  Button
} from "@mui/material";
import PropTypes from "prop-types";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
export const LearnButton = ({ isLearn, setIsLearn }) => {
  return (
    <>
      <Button
        variant={isLearn ? "contained" : "outlined"}
        startIcon={<FitnessCenterIcon />}
        onClick={() => setIsLearn((prev) => !prev)}
      ></Button>
    </>
  );
};
LearnButton.propTypes = {
  isLearn: PropTypes.bool.isRequired,
  setIsLearn: PropTypes.func.isRequired
};