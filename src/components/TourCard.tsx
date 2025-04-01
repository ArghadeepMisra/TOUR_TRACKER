// src/components/TourCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ActiveTour } from '../types';
import { countryFlags } from '../data/tours'; // Import flag map
import styles from './TourCard.module.css';

interface TourCardProps {
  tour: ActiveTour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const defaultImage = 'https://placehold.co/400x250/1e1e1e/e0e0e0?text=No+Image';

  return (
    <Link to={`/tour/${encodeURIComponent(tour.tourId)}`} className={styles.tourCard}>
      <img
        src={tour.imageUrl || defaultImage}
        alt={`${tour.iemName} IEM`}
        className={styles.tourImage}
        // Add onError handler to show default image if provided URL fails
        onError={(e) => (e.currentTarget.src = defaultImage)}
      />
      <div className={styles.tourInfo}>
        <h3 className={styles.tourName}>{tour.iemName}</h3>
        <p className={styles.tourLocation}>
          Currently in: <strong>{tour.currentLocation || 'Unknown'}</strong>
        </p>
        <div className={styles.tourFlags}>
          {tour.countries && tour.countries.length > 0 ? (
            tour.countries.map(code => (
              <span
                key={code}
                className={styles.flagIcon}
                title={code.toUpperCase()} // Tooltip with country code
              >
                {countryFlags[code.toUpperCase()] || code} {/* Show code if flag not found */}
              </span>
            ))
          ) : (
            <span style={{ fontSize: '0.9em', color: 'var(--secondary-text)' }}>
              No country info
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TourCard;