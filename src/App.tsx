import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home';
import PlacesList from './pages/PlacesList';
import PlaceDetail from './pages/PlaceDetail';
import { setPlaces } from './store/slices/placesSlice';
import { fetchPlaces } from './utils/api';
import './App.css';

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const places = await fetchPlaces();
        dispatch(setPlaces(places));
      } catch (error) {
        console.error('Failed to load places:', error);
      }
    };

    loadPlaces();
  }, [dispatch]);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
            style={{
              boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
              position: 'fixed',
              left: 0,
              height: 'calc(100vh - 64px)',
              zIndex: 999,
              marginTop: 64,
            }}
          >
            <NavigationMenu />
          </Sider>
          <Layout style={{ marginLeft: 200, marginTop: 64 }}>
            <Content className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/places" element={<PlacesList />} />
                <Route path="/places/:id" element={<PlaceDetail />} />
              </Routes>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default React.memo(App);