import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = ({ selectedCountry }) => {
    return (
        <Box sx={{ flexGrow: 1, Color: 'green' }}>
            <AppBar position="static" sx={{backgroundColor: 'green'}}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        COVID19 Tracker
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        {selectedCountry || "World"}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                        Looking for Corona Cases? Hop On🤍
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default Navbar;
