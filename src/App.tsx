import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux'; // Importando o Provider do Redux
import { BrowserRouter as Router } from 'react-router-dom'; // Envolvendo o app com BrowserRouter
import Navbar from './components/Navbar'; // Componente de navegação que você pode criar
import Footer from './components/Footer'; // Componente de rodapé que você pode criar
import Menu from './components/template/menu'; // Importando o menu lateral
import AppRoutes from './routes/routes'; // Importando as rotas definidas
import { store } from '../src/lib/store'; // Importando a instância da store já criada
import { Layout } from 'antd'; // Importando o Layout do Ant Design

const { Content } = Layout; // Extraindo Content do Layout

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(true); // Estado para controlar o menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna entre abrir e fechar o menu
  };

  return (
    <Provider store={store}> {/* Envolvendo o Router com o Provider */} 
      <Router>
        <div className="App">
          <CssBaseline /> {/* Reseta os estilos básicos do navegador */}
          <Layout style={{ minHeight: '100vh' }}>
            <Menu /> {/* Menu lateral */}
            <Layout
              style={{
                marginLeft: menuOpen ? 250 : 80, // Ajuste da margem com base no estado do menu
                transition: 'margin-left 0.2s',
              }}
            >
              <Content style={{ padding: '24px', background: '#f0f2f5' }}> {/* Azul padrão do Ant Design */}
                <AppRoutes /> {/* Renderizando as rotas aqui */}
              </Content>
              <Footer /> {/* Rodapé */}
            </Layout>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
