import React from 'react';
import { Layout, Typography } from 'antd';
import '../styles/Header.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <Title level={2} className="header-title">
          Historical Places Explorer
        </Title>
      </div>
    </AntHeader>
  );
};

export default Header;