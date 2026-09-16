import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PropTypes from "prop-types";
const MultiBottomNavigation =({listText,handle,selected}) =>{
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={selected}
        onChange={(event, newValue) => {
          handle(newValue);
        }}
      >
        {listText.map((item) => {
          <BottomNavigationAction label={item} />;
        })}
      </BottomNavigation>
    </Box>
  );
}
export default BottomNavigation;
MultiBottomNavigation.propTypes = {
  listText: PropTypes.array.isRequired,
  handle:PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired
};
