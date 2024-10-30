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
    background: 'linear-gradient(135deg, #7b1fa2 0%, #4a0072 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    background: 'rgba(123, 31, 162, 0.9) !important',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1) !important',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: '0 16px',
  },
  contentWrapper: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '3.5rem !important',
    fontWeight: '700 !important',
    background: 'linear-gradient(45deg, #fff 30%, #e1bee7 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '24px !important',
    '@media (max-width: 600px)': {
      fontSize: '2.5rem !important',
    },
  },
  subtitle: {
    fontSize: '1.25rem !important',
    color: 'rgba(255, 255, 255, 0.9) !important',
    marginBottom: '40px !important',
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
    },
  },
  ctaButton: {
    borderRadius: '30px !important',
    padding: '16px 48px !important',
    fontSize: '1.2rem !important',
    background: '#fff !important',
    color: '#7b1fa2 !important',
    fontWeight: '600 !important',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2) !important',
      background: '#f5f5f5 !important',
    },
    '@media (max-width: 600px)': {
      width: '100%',
      maxWidth: '300px',
    },
  },
  logo: {
    fontWeight: '700 !important',
    fontSize: '1.5rem !important',
    color: '#fff',
    textDecoration: 'none',
  },
  navButton: {
    margin: '0 8px !important',
    color: '#fff !important',
    borderRadius: '8px !important',
    padding: '6px 16px !important',
    '@media (max-width: 600px)': {
      width: '100%',
      margin: '8px 0 !important',
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
            Descubra as Melhores Ofertas
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
            Conectamos você aos melhores preços em marketplaces como Amazon, 
            Shopee, Mercado Livre e AliExpress em um só lugar.
          </Typography>
          <Button
            variant="contained"
            className={classes.ctaButton}
            onClick={() => navigate('/produtos')}
            startIcon={<ShoppingCartIcon />}
          >
            Explorar Ofertas
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainScreen;
