import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Covid 19 Tracker
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                        Looking for Corona Cases? Hop on
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default Navbar;
