// src/pages/TourDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTourDetails } from '../data/tours';
import { TourDetailsData, TourStop, ProfileLinkState } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button'; // Import Button component
import styles from './TourDetailsPage.module.css';

// Helper function to get CSS class based on status/condition
const getStatusClass = (status: string | null | undefined): string => {
    switch (status?.toLowerCase()) {
        case 'completed': return 'status-completed';
        case 'pending': return 'status-pending';
        case 'in progress': return 'status-in-progress';
        case 'good': return 'condition-good';
        case 'cosmetic damage': return 'condition-cosmetic';
        case 'bad': return 'condition-bad';
        case 'not reported yet': return 'condition-not-reported';
        default: return 'condition-not-reported';
    }
};


const TourDetailsPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tourDetails, setTourDetails] = useState<TourDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tourId) {
      setError("Tour ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      setTourDetails(null); // Clear previous details
      try {
        const data = await getTourDetails(tourId);
        if (data) {
          setTourDetails(data);
        } else {
          setError("Tour not found.");
        }
      } catch (err) {
        console.error(`Failed to fetch tour details for ${tourId}:`, err);
        setError("Could not load tour details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [tourId]); // Re-run effect if tourId changes

  // Calculate Current Status based on the last stop
  const lastStop: TourStop | undefined = tourDetails?.tourData?.[tourDetails.tourData.length - 1];
  let lastKnownCondition = 'New / Tour Start';
  let lastKnownConditionClass = 'condition-good';

  if (tourDetails && tourDetails.tourData.length > 0) {
      for (let i = tourDetails.tourData.length - 1; i >= 0; i--) {
          const reported = tourDetails.tourData[i].conditionReported?.toLowerCase();
          if (reported && reported !== 'not reported yet' && reported !== 'n/a') {
              lastKnownCondition = tourDetails.tourData[i].conditionReported!; // Non-null asserted
              lastKnownConditionClass = getStatusClass(reported);
              break;
          }
      }
  } else if (tourDetails && tourDetails.tourData.length === 0) {
      lastKnownCondition = "Awaiting First User";
      lastKnownConditionClass = 'condition-not-reported';
  }


  // Render Logic
  if (isLoading) return <LoadingSpinner />;
  if (error) return (
        <div>
            <h1 className={styles.pageHeader}>Error</h1>
            <p className="error-message">{error}</p>
             <div className={styles.pageFooterNav}>
                <Button as="link" to="/" variant="secondary">
                  ← Back to All Active Tours
                </Button>
            </div>
        </div>
    );
  if (!tourDetails) return null; // Should be handled by error state, but good practice

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>{`Tour Status: ${tourDetails.iemName}`}</h1>
      </header>

      {/* Current Status Section */}
      <section className="card">
        <h2>Current Status</h2>
        {lastStop ? (
          <div className={styles.statusGrid}>
            <p className={styles.statusItem}>
              <strong>Currently With:</strong>
              {lastStop.userId ? (
                 <Link to={`/profile/${encodeURIComponent(lastStop.userId)}`} state={{ fromTourId: tourId } as ProfileLinkState}>
                   {lastStop.user || 'Unknown User'}
                 </Link>
              ) : (
                 <span>{lastStop.user || 'N/A'}</span>
              )}
            </p>
            <p className={styles.statusItem}>
              <strong>Location:</strong>
              <span>{lastStop.location || 'N/A'}</span>
            </p>
            <p className={styles.statusItem}>
              <strong>Last Reported Condition:</strong>
              <span className={lastKnownConditionClass}>
                {lastKnownCondition}
              </span>
            </p>
            <p className={styles.statusItem}>
              <strong>Review Status:</strong>
              <span className={getStatusClass(lastStop.reviewStatus)}>
                  {lastStop.reviewStatus || 'N/A'}
              </span>
            </p>
          </div>
        ) : (
          <div className={styles.statusGrid}>
              <p className={styles.statusItem}><strong>Currently With:</strong> <span>Tour Not Started</span></p>
              <p className={styles.statusItem}><strong>Location:</strong> <span>N/A</span></p>
              <p className={styles.statusItem}><strong>Last Reported Condition:</strong> <span className={lastKnownConditionClass}>{lastKnownCondition}</span></p>
               <p className={styles.statusItem}><strong>Review Status:</strong> <span className="status-pending">N/A</span></p>
          </div>
        )}
      </section>

      {/* Tour History Section */}
      <section className="card">
        <h2>Tour History</h2>
        <div className={styles.tableResponsive}>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Location</th>
                <th>Arrival Date</th>
                <th>Dispatch Date</th>
                <th>Condition Reported</th>
                <th>Review Status</th>
              </tr>
            </thead>
            <tbody>
              {tourDetails.tourData.length > 0 ? (
                tourDetails.tourData.map((stop, index) => (
                  <tr key={`${stop.userId}-${stop.arrivalDate}-${index}`}> {/* Improved key */}
                    <td>
                      {stop.userId ? (
                        <Link to={`/profile/${encodeURIComponent(stop.userId)}`} state={{ fromTourId: tourId } as ProfileLinkState}>
                          {stop.user || 'Unknown User'}
                        </Link>
                      ) : (
                        <span>{stop.user || 'Unknown User'}</span>
                      )}
                    </td>
                    <td>{stop.location || 'N/A'}</td>
                    <td>{stop.arrivalDate || 'N/A'}</td>
                    <td className={!stop.dispatchDate ? styles.currentHolder : ''}>
                      {stop.dispatchDate || 'Current Holder'}
                    </td>
                    <td className={getStatusClass(stop.conditionReported)}>
                      {stop.conditionReported || 'N/A'}
                    </td>
                    <td className={getStatusClass(stop.reviewStatus)}>
                      {stop.reviewStatus || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                    No tour history logged yet for this IEM.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

       {/* Footer Navigation */}
       <div className={styles.pageFooterNav}>
            <Button as="link" to="/" variant="secondary">
              ← Back to All Active Tours
            </Button>
       </div>
    </div>
  );
};

export default TourDetailsPage;