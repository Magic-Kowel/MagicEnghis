import {
  ListItem,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
function ItemMenu({ name, items }) {
  const navigate = useNavigate();
  const handleNavigateMenu = (url) => {
    navigate(`/${url}`);
  };
  return (
    <>
      {items.length > 1 ? (
        <ListItem disablePadding>
          <Accordion style={{ width: "100%" }}>
            <AccordionSummary
              style={{ width: "100%" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
            >
              {name}
            </AccordionSummary>
            <AccordionDetails sx={{ width: "100%" }}>
              {items?.map((item) => (
                <ListItemButton
                  onClick={() => handleNavigateMenu(item)}
                  key={item}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
            </AccordionDetails>
          </Accordion>
        </ListItem>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigateMenu(items)}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </>
  );
}

ItemMenu.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default ItemMenu;
