// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Button from './components/Button';

// Lazy load page components
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const MainTourListPage = React.lazy(() => import('./pages/MainTourListPage'));
const TourDetailsPage = React.lazy(() => import('./pages/TourDetailsPage'));
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route 
                path="/tours" 
                element={
                  <>
                    <Header />
                    <div className="container">
                      <MainTourListPage />
                    </div>
                  </>
                } 
              />
              <Route 
                path="/tour/:tourId" 
                element={
                  <>
                    <Header />
                    <div className="container">
                      <TourDetailsPage />
                    </div>
                  </>
                } 
              />
              <Route 
                path="/profile/:userId" 
                element={
                  <>
                    <Header />
                    <div className="container">
                      <UserProfilePage />
                    </div>
                  </>
                } 
              />
            </Route>
            
            {/* Basic 404 Not Found route */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>404 - Page Not Found</h1>
                <p style={{ margin: '20px 0' }}>The page you are looking for does not exist.</p>
                <Button as="link" to="/tours" variant="secondary">Go to Tours</Button>
              </div>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;