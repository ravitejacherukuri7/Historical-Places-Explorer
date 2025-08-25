import React, { useState } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { 
  HomeOutlined, 
  UnorderedListOutlined, 
  MenuOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavigationMenu.css';

const NavigationMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/places',
      icon: <UnorderedListOutlined />,
      label: 'Historical Places',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setDrawerVisible(false);
  };

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={handleMenuClick}
      className="navigation-menu"
    />
  );

  return (
    <>
      {/* Desktop Menu */}
      <div className="desktop-menu">
        {menu}
      </div>

      {/* Mobile Menu Button */}
      <Button 
        className="mobile-menu-button" 
        icon={<MenuOutlined />} 
        onClick={() => setDrawerVisible(true)}
      />

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
        width={250}
      >
        {menu}
      </Drawer>
    </>
  );
};

export default NavigationMenu;