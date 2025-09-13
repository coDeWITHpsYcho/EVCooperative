import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';

// Transport Pages
import TransportHome from './pages/Transport/TransportHome';
import BookRide from './pages/Transport/BookRide';
import MyRides from './pages/Transport/MyRides';
import DriverDashboard from './pages/Transport/DriverDashboard';
import VehicleManagement from './pages/Transport/VehicleManagement';

// Marketplace Pages
import MarketplaceHome from './pages/Marketplace/MarketplaceHome';
import ProductListing from './pages/Marketplace/ProductListing';
import ProductDetail from './pages/Marketplace/ProductDetail';
import MyProducts from './pages/Marketplace/MyProducts';
import SellProduct from './pages/Marketplace/SellProduct';

// Cooperative Pages
import CooperativeHome from './pages/Cooperative/CooperativeHome';
import CooperativeProducts from './pages/Cooperative/CooperativeProducts';
import ArtisanDashboard from './pages/Cooperative/ArtisanDashboard';
import CooperativeRegistration from './pages/Cooperative/CooperativeRegistration';

import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Transport Routes */}
          <Route path="/transport" element={<TransportHome />} />
          <Route path="/transport/book" element={
            <ProtectedRoute>
              <BookRide />
            </ProtectedRoute>
          } />
          <Route path="/transport/rides" element={
            <ProtectedRoute>
              <MyRides />
            </ProtectedRoute>
          } />
          <Route path="/transport/driver" element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          } />
          <Route path="/transport/vehicles" element={
            <ProtectedRoute>
              <VehicleManagement />
            </ProtectedRoute>
          } />
          
          {/* Marketplace Routes */}
          <Route path="/marketplace" element={<MarketplaceHome />} />
          <Route path="/marketplace/products" element={<ProductListing />} />
          <Route path="/marketplace/products/:id" element={<ProductDetail />} />
          <Route path="/marketplace/my-products" element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          } />
          <Route path="/marketplace/sell" element={
            <ProtectedRoute>
              <SellProduct />
            </ProtectedRoute>
          } />
          
          {/* Cooperative Routes */}
          <Route path="/cooperative" element={<CooperativeHome />} />
          <Route path="/cooperative/products" element={<CooperativeProducts />} />
          <Route path="/cooperative/register" element={
            <ProtectedRoute>
              <CooperativeRegistration />
            </ProtectedRoute>
          } />
          <Route path="/cooperative/artisan" element={
            <ProtectedRoute>
              <ArtisanDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;