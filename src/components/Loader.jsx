import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../stylesConfig';
function Loader(){
    return(
        <Box sx={{ display: 'flex',
        flexDirection:"column",
        justifyContent:"center", 
        alignItems:"center",
        height: '100vh'
    }}
        >
            <CircularProgress 
                size={100}
                sx={{color:colors.primaryColor}}
            />
            <Typography variant="h6">
                Loading
            </Typography>
        </Box>
    );
}
export default Loader;