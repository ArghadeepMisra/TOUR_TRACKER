// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load page components
const MainTourListPage = React.lazy(() => import('./pages/MainTourListPage'));
const TourDetailsPage = React.lazy(() => import('./pages/TourDetailsPage'));
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'));

function App() {
  return (
    <BrowserRouter>
      <div className="container"> {/* Apply container padding/max-width */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MainTourListPage />} />
            <Route path="/tour/:tourId" element={<TourDetailsPage />} />
            <Route path="/profile/:userId" element={<UserProfilePage />} />
            {/* Basic 404 Not Found route */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>404 - Page Not Found</h1>
                <p style={{ margin: '20px 0' }}>The page you are looking for does not exist.</p>
                <Button as="link" to="/" variant="secondary">Go to Home</Button> {/* Use Button */}
              </div>
            } />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

// Need to import Button if used in 404 route
import Button from './components/Button';

export default App;