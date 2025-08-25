import React from 'react';
import { Layout, Typography } from 'antd';
import '../styles/Footer.css';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter className="app-footer">
      <Text className="footer-text">
        © {new Date().getFullYear()} Historical Places Explorer. All rights reserved.
      </Text>
    </AntFooter>
  );
};

export default Footer;