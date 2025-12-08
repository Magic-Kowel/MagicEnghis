import { Typography } from "@mui/material";
import PropTypes from "prop-types";
function Title({title}){
    return(<>
    <Typography style={{fontSize: "clamp(1.5rem, 5vw + 1rem, 2.5rem)"}} component="h1">{title}</Typography>
    </>);
}
export default Title;

Title.propTypes = {
    title: PropTypes.string 
}