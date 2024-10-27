import React from 'react';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined, DashboardOutlined, PlusOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const MenuComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log('Logout efetuado');
    navigate('/');
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
  ];

  return (
    <Sider
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
      }}
    >
      <div>
        <div className="logo" style={{ height: '64px', margin: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ color: '#37352f', textAlign: 'center', paddingTop: '10px' }}>
            Painel de Controle
          </h2>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['2']} items={items} />
      </div>
      <div style={{ padding: '10px 0' }}>
        <Menu
          theme="light"
          mode="inline"
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

export default MenuComponent;
