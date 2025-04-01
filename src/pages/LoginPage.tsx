import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // If already logged in, redirect to tours page
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/tours');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/tours');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logoText}>Audio Geeks</h1>
          <p className={styles.logoTagline}>IEM Tour Tracker</p>
        </div>
        
        <h2 className={styles.loginTitle}>Sign In</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.forgotPassword}>
            <a href="#">Forgot Password?</a>
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        
        <div className={styles.signupLink}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>

        <div className={styles.demoCredentials}>
          <h3>Demo Credentials:</h3>
          <p>Email: demo@example.com</p>
          <p>Password: password123</p>
          <p className={styles.demoNote}>* For demo purposes, any email/password will work</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 