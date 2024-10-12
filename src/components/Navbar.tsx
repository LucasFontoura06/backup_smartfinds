import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Click Shopper
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
