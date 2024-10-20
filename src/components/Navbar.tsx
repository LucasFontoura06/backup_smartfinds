import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface NavbarProps {
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu }) => {
  return (
    <Header
      style={{
        background: '#fff',
        padding: 0,
        // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Sombra para dar destaque
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MenuUnfoldOutlined
          onClick={toggleMenu}
          style={{ fontSize: '20px', cursor: 'pointer' }}
        />
      </div>
    </Header>
  );
};

export default Navbar;
