import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Card, Typography } from 'antd';
import { UnorderedListOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <Title level={1}>Explore Historical Places Around the World</Title>
        <Paragraph>
          Discover amazing historical sites, mark them as visited, and get random suggestions for your next adventure.
        </Paragraph>
        <div className="hero-actions">
          <Button 
            type="primary" 
            size="large" 
            icon={<UnorderedListOutlined />}
            onClick={() => navigate('/places')}
          >
            Browse Historical Places
          </Button>
        </div>
      </div>

      <Row gutter={[24, 24]} className="features-section">
        <Col xs={24} md={8}>
          <Card title="Discover" bordered={false}>
            Explore historical places from around the world with detailed information and images.
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Track" bordered={false}>
            Mark places as visited to keep track of your historical exploration journey.
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Get Inspired" bordered={false}>
            Use our random suggestion feature to discover new historical places to visit.
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;