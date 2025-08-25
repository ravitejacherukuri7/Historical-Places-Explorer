import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLoading, setError } from '../store/slices/placesSlice';
import { fetchPlaces, getRandomPlace } from '../utils/api';
import { HistoricalPlace } from '../types';
import { Row, Col, Spin, Button, Modal, Card, Empty, Alert, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import PlaceCard from '../components/PlaceCard';
import { useNavigate } from 'react-router-dom';
import '../styles/PlacesList.css';

const PlacesList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state: RootState) => state.places);
  const [randomPlaceModalVisible, setRandomPlaceModalVisible] = useState(false);
  const [randomPlace, setRandomPlace] = useState<HistoricalPlace | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      if (list.length === 0) {
        dispatch(setLoading(true));
        try {
          const places = await fetchPlaces();
          dispatch({ type: 'places/setPlaces', payload: places });
        } catch (err) {
          dispatch(setError('Failed to load historical places'));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    loadPlaces();
  }, [dispatch, list.length]);

  const handleShowRandomPlace = () => {
    if (list.length > 0) {
      const random = getRandomPlace(list);
      setRandomPlace(random);
      setRandomPlaceModalVisible(true);
    }
  };

  const handleNavigateToDetail = (id: number) => {
    navigate(`/places/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading historical places...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        closable
        className="error-alert"
      />
    );
  }

  return (
    <div className="places-list-container">
      <div className="places-header">
        <h1>Historical Places</h1>
        <Button
          type="primary"
          icon={<QuestionCircleOutlined />}
          onClick={handleShowRandomPlace}
        >
          Suggest a Random Place
        </Button>
      </div>

      {list.length === 0 ? (
        <Empty description="No historical places found" />
      ) : (
        <Row gutter={[16, 16]} className="places-grid">
          {list.map((place) => (
            <Col key={place.id} xs={24} sm={12} lg={8} xl={6}>
              <PlaceCard
                place={place}
                onClick={() => handleNavigateToDetail(place.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Random Historical Place Suggestion"
        open={randomPlaceModalVisible}
        onCancel={() => setRandomPlaceModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setRandomPlaceModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="visit"
            type="primary"
            onClick={() => {
              if (randomPlace) {
                handleNavigateToDetail(randomPlace.id);
                setRandomPlaceModalVisible(false);
              }
            }}
          >
            View Details
          </Button>
        ]}
      >
        {randomPlace && (
          <Card
            cover={
              <img
                alt={randomPlace.name}
                src={randomPlace.imageUrl}
                height={200}
                style={{ objectFit: 'cover' }}
              />
            }
          >
            <Card.Meta
              title={randomPlace.name}
              description={
                <>
                  <Tag color="blue">{randomPlace.location}</Tag>
                  <p>{randomPlace.description.slice(0, 150)}...</p>
                </>
              }
            />
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default PlacesList;