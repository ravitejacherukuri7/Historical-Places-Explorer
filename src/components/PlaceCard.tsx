import React from 'react';
import { Card, Button, Tag, Image } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { HistoricalPlace } from '../types';
import { useDispatch } from 'react-redux';
import { toggleVisited } from '../store/slices/placesSlice';

const { Meta } = Card;

interface PlaceCardProps {
  place: HistoricalPlace;
  onClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  const dispatch = useDispatch();

  const handleToggleVisited = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleVisited(place.id));
  };

  return (
    <Card
      hoverable
      className="place-card"
      cover={
        <Image
          alt={place.name}
          src={place.imageUrl}
          height={200}
          preview={false}
          fallback="https://via.placeholder.com/300x200?text=Image+Not+Available"
        />
      }
      actions={[
        <Button
          type="text"
          icon={place.isVisited ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={handleToggleVisited}
        >
          {place.isVisited ? 'Visited' : 'Not Visited'}
        </Button>
      ]}
      onClick={onClick}
    >
      <Meta
        title={place.name}
        description={
          <>
            <Tag color="blue">{place.location}</Tag>
            <div className="place-description">
              {place.description.slice(0, 100)}...
            </div>
          </>
        }
      />
    </Card>
  );
};

export default PlaceCard;