import React from 'react';
import { Button, Container, Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    background: '#000000',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    background: 'transparent !important',
    backdropFilter: 'blur(10px)',
    boxShadow: 'none !important',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: '0 16px',
    position: 'relative',
  },
  contentWrapper: {
    maxWidth: '1200px',
    width: '100%',
    textAlign: 'center',
    padding: '0 20px',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0',
    width: '100%',
    fontSize: '6rem',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '0.3em',
    marginBottom: '24px',
    textTransform: 'none',
    '@media (max-width: 600px)': {
      fontSize: '3rem',
      letterSpacing: '0.2em',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  titleWord: {
    display: 'inline-block',
  },
  subtitle: {
    fontSize: '1rem !important',
    color: '#999999 !important',
    marginBottom: '40px !important',
    letterSpacing: '0.2em !important',
    textTransform: 'uppercase',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem !important',
    },
  },
  ctaButton: {
    borderRadius: '30px !important',
    padding: '16px 48px !important',
    fontSize: '1rem !important',
    background: 'transparent !important',
    color: '#ffffff !important',
    border: '1px solid #ffffff !important',
    fontWeight: '400 !important',
    letterSpacing: '0.2em !important',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      background: 'rgba(255,255,255,0.1) !important',
    },
  },
  logo: {
    fontWeight: '400 !important',
    fontSize: '1.2rem !important',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '0.2em',
  },
  navButton: {
    color: '#fff !important',
    letterSpacing: '0.1em !important',
    padding: '6px 16px !important',
    '&:hover': {
      background: 'rgba(255,255,255,0.1) !important',
    },
  },
  desktopNav: {
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  menuButton: {
    '@media (min-width: 600px)': {
      display: 'none !important',
    },
  },
}));

const MainScreen: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Login', path: '/Login' },
    { text: 'Sobre Nós', path: '/developer' },
    { text: 'Contato', path: '/contato' },
  ];

  const drawer = (
    <Box sx={{ p: 2, background: '#7b1fa2', height: '100%' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text}>
            <Button
              className={classes.navButton}
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
              fullWidth
            >
              {item.text}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.logo}>
            Smart Finds
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          
          <Box className={classes.desktopNav}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                className={classes.navButton}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      <Box className={classes.mainContent}>
        <Box className={classes.contentWrapper}>
          <Typography variant="h1" className={classes.title}>
            <span className={classes.titleWord}>Smart</span>
            <span className={classes.titleWord}>Finds</span>
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
          Conectamos você aos melhores preços em marketplaces em um só lugar.
          </Typography>
          <Button
            variant="outlined"
            className={classes.ctaButton}
            onClick={() => navigate('/produtos')}
          >
            JOIN US
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainScreen;
