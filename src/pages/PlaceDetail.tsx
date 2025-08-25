import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleVisited } from '../store/slices/placesSlice';
import { Button, Card, Image, Tag, Typography, Space } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.places);
  
  const place = list.find(p => p.id === parseInt(id || ''));
  
  if (!place) {
    return (
      <div className="detail-container">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/places')}
          style={{ marginBottom: 16 }}
        >
          Back to List
        </Button>
        <div className="not-found">
          <Title level={2}>Place not found</Title>
          <Paragraph>The historical place you're looking for doesn't exist.</Paragraph>
        </div>
      </div>
    );
  }

  const handleToggleVisited = () => {
    dispatch(toggleVisited(place.id));
  };

  return (
    <div className="detail-container">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/places')}
        style={{ marginBottom: 16 }}
      >
        Back to List
      </Button>
      
      <Card>
        <Image
          src={place.imageUrl}
          alt={place.name}
          height={400}
          style={{ objectFit: 'cover', width: '100%' }}
          fallback="https://via.placeholder.com/800x400?text=Image+Not+Available"
        />
        
        <div style={{ marginTop: 24 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>{place.name}</Title>
              <Space size="middle">
                <Tag color="blue">{place.location}</Tag>
                <Tag color={place.isVisited ? 'green' : 'orange'}>
                  {place.isVisited ? 'Visited' : 'Not Visited'}
                </Tag>
                {place.yearBuilt && <Tag color="purple">Built: {place.yearBuilt}</Tag>}
              </Space>
            </div>
            
            <Paragraph>{place.description}</Paragraph>
            
            <Button
              type="primary"
              icon={place.isVisited ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={handleToggleVisited}
            >
              Mark as {place.isVisited ? 'Not Visited' : 'Visited'}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default PlaceDetail;