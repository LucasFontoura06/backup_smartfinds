import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/template/menu';
import AppRoutes from './routes/routes';
import { store } from '../src/lib/store';
import { Layout } from 'antd';

const { Content } = Layout;

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const location = useLocation(); // Hook para acessar a localização atual

  // Verifica se a localização atual é a homepage, a página de produtos, login ou a página do desenvolvedor
  const shouldHideMenu = location.pathname === '/' || 
                        location.pathname === '/produtos' || 
                        location.pathname === '/developer' ||
                        location.pathname === '/Login';  // Adiciona a página de login

  return (
    <div className="App">
      <CssBaseline />
      <Layout style={{ minHeight: '100vh' }}>
        {/* Renderiza o Menu apenas se não for uma das páginas que devem escondê-lo */}
        {!shouldHideMenu && (
          <Menu />
        )}
        <Layout
          style={{
            marginLeft: !shouldHideMenu ? (menuOpen ? 250 : 80) : 0, // Define a margem apenas se não for uma das páginas que devem escondê-lo
            transition: 'margin-left 0.2s',
          }}
        >
          <Content style={{ background: '#f0f2f5' }}>
            <AppRoutes />
          </Content>
          {!shouldHideMenu && <Footer />}  {/* Só mostra o Footer se não for uma das páginas que devem escondê-lo */}
        </Layout>
      </Layout>
    </div>
  );
};

// Envolvendo o App com Router e Provider
const AppWrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default AppWrapper;
