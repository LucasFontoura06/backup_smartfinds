import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar'; // Componente de navegação que você pode criar
import Footer from './components/Footer'; // Componente de rodapé que você pode criar
import Menu from './components/template/menu'; // Importando o menu lateral
import { BrowserRouter as Router } from 'react-router-dom'; // Envolvendo o app com BrowserRouter
import AppRoutes from './routes/routes'; // Importando as rotas definidas

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna entre abrir e fechar o menu
  };

  return (
    <Router> {/* Adicionando o BrowserRouter aqui */}
      <div className="App">
        <CssBaseline /> {/* Reseta os estilos básicos do navegador */}
        <Navbar toggleMenu={toggleMenu} /> {/* Barra de navegação */}
        <Menu open={menuOpen} setOpen={setMenuOpen} /> {/* Menu lateral */}
        <AppRoutes /> {/* Renderizando as rotas aqui */}
        <Footer /> {/* Rodapé */}
      </div>
    </Router>
  );
};

export default App;
