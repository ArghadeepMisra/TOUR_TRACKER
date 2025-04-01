import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/tours">Audio Geeks</Link>
        <span className={styles.logoTagline}>IEM Tour Tracker</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/tours">Tours</Link>
          </li>
          <li>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 