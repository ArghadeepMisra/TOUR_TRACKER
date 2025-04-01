// src/pages/MainTourListPage.tsx
import React, { useState, useEffect } from 'react';
import { getActiveTours } from '../data/tours';
import { ActiveTour, TourCategory } from '../types'; // Ensure TourCategory is imported here
import TourCard from '../components/TourCard';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './MainTourListPage.module.css';

// All available tour categories
const allCategories: TourCategory[] = ['IEM', 'Headphone', 'Amp', 'DAC', 'DAP'];

const MainTourListPage: React.FC = () => {
  const [tours, setTours] = useState<ActiveTour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'All'>('All');

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

  // Filter tours based on selected category
  const filteredTours = selectedCategory === 'All' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Active Audio Equipment Tours</h1>
        <p>Select an item to view its current tour status and history.</p>
      </header>

      <div className={styles.categoryFilter}>
        <button 
          className={`${styles.categoryButton} ${selectedCategory === 'All' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {allCategories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <main>
        {isLoading && <LoadingSpinner />}
        {error && <p className={`${styles.errorMessage} error-message`}>{error}</p>}
        {!isLoading && !error && (
          <div className={styles.tourGrid}>
            {filteredTours.length > 0 ? (
              filteredTours.map(tour => <TourCard key={tour.tourId} tour={tour} />)
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