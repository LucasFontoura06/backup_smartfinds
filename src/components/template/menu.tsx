import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const menuVariants = {
  open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { opacity: 0, x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 40 } },
};

const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path); // Navega para a rota correspondente
    setOpen(false); // Fecha o menu ao navegar
  };

  return (
    <Drawer open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDrawer-paper': { width: 240, backgroundColor: '#4a4a4a' } }}>
      <motion.div initial={open ? 'closed' : 'open'} animate={open ? 'open' : 'closed'} variants={menuVariants} style={{ height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Divider />
          <List>
            {[{ icon: <HomeIcon />, text: 'Home', path: '/' },
              { icon: <ShoppingCartIcon />, text: 'Produtos', path: '/products' }, // Corrigir para '/products'
              { icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' },
              { icon: <AddIcon />, text: 'Cadastrar Produto', path: '/cadastrarProduto' }
            ].map((item, i) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(item.path)}>
                  <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: '#fff' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </motion.div>
    </Drawer>
  );
};

export default Menu;
