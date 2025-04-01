// src/pages/UserProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import { getUserProfile } from '../data/users';
import { UserProfileData, ProfileLinkState } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import styles from './UserProfilePage.module.css';

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation(); // Get location object
  const { fromTourId } = (location.state as ProfileLinkState) || {}; // Safely access state

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      setProfile(null);
      try {
        const data = await getUserProfile(userId);
        if (data) {
          setProfile(data);
        } else {
          setError("User profile not found.");
        }
      } catch (err) {
        console.error(`Failed to fetch profile for ${userId}:`, err);
        setError("Could not load user profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]); // Re-run if userId changes

  const backLinkHref = fromTourId ? `/tour/${encodeURIComponent(fromTourId)}` : '/';
  const backLinkText = fromTourId ? 'Back to Tour Status' : 'Back to Tour List';

  // Render Logic
  if (isLoading) return <LoadingSpinner />;
  if (error) return (
      <div>
          <h1>Error</h1>
          <p className="error-message">{error}</p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button as="link" to="/" variant="secondary">
                  ← Back to Tour List
              </Button>
          </div>
      </div>
  );
  if (!profile) return null; // Should be handled by error state

  const hasPicClass = profile.profilePicUrl ? styles.hasPic : '';
  const defaultPic = 'https://placehold.co/150x150/1e1e1e/e0e0e0?text=?';

  return (
    <div>
       <header className={`${styles.profileHeader} ${hasPicClass}`}>
            <div className={styles.backLinkContainer}>
                <Button as="link" to={backLinkHref} variant="secondary">
                  ← {backLinkText}
                </Button>
            </div>

            {profile.profilePicUrl && (
                 <img
                    id="profile-pic" // Keep ID if needed, but class is used for styling
                    className={styles.profilePic}
                    src={profile.profilePicUrl}
                    alt={`${profile.name}'s profile picture`}
                    onError={(e) => (e.currentTarget.src = defaultPic)}
                  />
            )}
           <h1 className={styles.profileName}>{profile.name}</h1>
       </header>

        {/* Profile Details */}
        <section className="card">
            <h2>Details</h2>
            <p className={styles.detailsItem}>
              <strong>Location:</strong>
              <span>{profile.location || 'N/A'}</span>
            </p>
             <div className={`${styles.detailsItem} ${styles.headfiButtonContainer}`}>
                <strong>Head-Fi Profile:</strong>
                 {profile.headfiLink ? (
                     <Button as="a" href={profile.headfiLink} variant="primary">
                       View Head-Fi Profile
                     </Button>
                 ) : (
                     <span>N/A</span>
                 )}
            </div>
        </section>

         {/* Past Tours */}
        <section className="card">
            <h2>Attended Tours</h2>
            <div className={styles.toursList}>
                {profile.pastTours && profile.pastTours.length > 0 ? (
                    profile.pastTours.map((tour, index) => (
                        <div key={`${tour.name}-${index}`} className={styles.tourHistoryItem}>
                            <span className={styles.tourName}>{tour.name}</span>
                            <span className={styles.tourDates}>
                                ({tour.arrival || 'N/A'} - {tour.departure || 'Present'})
                            </span>
                        </div>
                    ))
                ) : (
                   <p style={{ fontStyle: 'italic', color: 'var(--secondary-text)' }}>
                       No past tours recorded.
                   </p>
                )}
            </div>
        </section>
    </div>
  );
};

export default UserProfilePage;