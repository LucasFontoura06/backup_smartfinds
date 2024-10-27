import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Menu from './components/template/menu';
import AppRoutes from './routes/routes';
import { store } from './lib/store';
import { Layout } from 'antd';
import { AuthProvider } from './contexts/AuthContext';

const { Content } = Layout;

const MainApp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const location = useLocation();
  
  // Lista de rotas públicas onde o menu não deve aparecer
  const publicRoutes = ['/', '/produtos', '/developer', '/Login', '/quem-somos'];
  const shouldShowMenu = !publicRoutes.includes(location.pathname);

  return (
    <div className="App">
      <CssBaseline />
      <Layout style={{ minHeight: '100vh' }}>
        {shouldShowMenu && <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
        
        <Layout
          style={{
            marginLeft: shouldShowMenu ? (menuOpen ? 250 : 80) : 0,
            transition: 'margin-left 0.2s',
          }}
        >
          <Content style={{ background: '#f0f2f5' }}>
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;
