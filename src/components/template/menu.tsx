import React from 'react';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined, DashboardOutlined, PlusOutlined, AppstoreOutlined, LogoutOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const { Sider } = Layout;

interface MenuProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu: React.FC<MenuProps> = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      navigate('/'); // Alterado de '/login' para '/'
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const items = [
    {
      key: '2',
      icon: <ShoppingCartOutlined />,
      label: 'Produtos',
      onClick: () => handleNavigation('/products'),
    },
    {
      key: '3',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => handleNavigation('/dashboard'),
    },
    {
      key: '4',
      icon: <PlusOutlined />,
      label: 'Cadastrar Produto',
      onClick: () => handleNavigation('/cadastrarProduto'),
    },
    {
      key: '5',
      icon: <AppstoreOutlined />,
      label: 'Afiliados',
      onClick: () => handleNavigation('/Affiliate'),
    },
    {
      key: '6',
      icon: <UserOutlined />,
      label: 'Usuários',
      onClick: () => handleNavigation('/users'),
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={!menuOpen}
      onCollapse={(collapsed) => setMenuOpen(!collapsed)}
      trigger={null}
      theme="light"
      width={250}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div>
        <div className="logo" style={{ 
          height: '64px', 
          margin: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingRight: '8px'
        }}>
          {menuOpen && <h2 style={{ color: '#37352f', margin: 0, fontSize: '16px' }}>Painel de Controle</h2>}
          {React.createElement(menuOpen ? MenuFoldOutlined : MenuUnfoldOutlined, {
            onClick: () => setMenuOpen(!menuOpen),
            style: { 
              fontSize: '18px', 
              cursor: 'pointer',
              color: '#6366f2',
              padding: '8px',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }
          })}
        </div>
        <Menu 
          theme="light" 
          mode="inline" 
          defaultSelectedKeys={['2']} 
          items={items}
          style={{ 
            backgroundColor: '#FFFFFF',
          }}
          className="custom-menu"
        />
      </div>
      <div style={{ padding: '10px 0' }}>
        <Menu
          theme="light"
          mode="inline"
          style={{ 
            backgroundColor: '#FFFFFF',
          }}
          className="custom-menu"
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Sair',
              onClick: handleLogout,
            },
          ]}
        />
      </div>
    </Sider>
  );
};

export default SideMenu;
