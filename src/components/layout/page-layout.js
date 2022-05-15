import React from 'react'
import PropTypes from 'prop-types';
import { AppBar, Box,Toolbar,IconButton,Typography } from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';

const PageLayout = ({ children }) => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Eastvantage React Test
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{padding:"10px 30px",background:"#e7e7e7",height:"calc(100vh - 85px)",overflow:"auto"}}>
               {children}
            </div>
        </div>
    )
}
PageLayout.propTypes = {
    children: PropTypes.element.isRequired
}
export default PageLayout;