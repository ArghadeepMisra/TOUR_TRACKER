// src/pages/MainTourListPage.tsx
import React, { useState, useEffect } from 'react';
import { getActiveTours } from '../data/tours';
import { ActiveTour, TourCategory } from '../types'; // Ensure TourCategory is imported here
import TourCard from '../components/TourCard';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './MainTourListPage.module.css';

const CATEGORY_ORDER: TourCategory[] = ['IEM', 'Headphone', 'DAP', 'DAC', 'Amp'];



const MainTourListPage: React.FC = () => {
  const [tours, setTours] = useState<ActiveTour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getActiveTours();
        setTours(data);
      } catch (err) {
        console.error("Failed to fetch active tours:", err);
        setError("Could not load active tours. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []); // Empty dependency array means run once on mount

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Active IEM Tours</h1>
        <p>Select an IEM to view its current tour status and history.</p>
      </header>

      <main>
        {isLoading && <LoadingSpinner />}
        {error && <p className={`${styles.errorMessage} error-message`}>{error}</p>}
        {!isLoading && !error && (
          <div className={styles.tourGrid}>
            {tours.length > 0 ? (
              tours.map(tour => <TourCard key={tour.tourId} tour={tour} />)
            ) : (
              <p className={styles.loadingMessage}>No active tours found at this time.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainTourListPage;