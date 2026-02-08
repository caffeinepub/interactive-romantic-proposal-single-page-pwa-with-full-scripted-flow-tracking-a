import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'romantic2026'; // Change this to your secure password
const AUTH_KEY = 'admin_authenticated';
const LAST_ACTIVITY_KEY = 'admin_last_activity';
const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem(AUTH_KEY);
      const lastActivity = sessionStorage.getItem(LAST_ACTIVITY_KEY);
      
      if (auth === 'true' && lastActivity) {
        const timeSinceActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceActivity < TIMEOUT_MS) {
          setIsAuthenticated(true);
          updateActivity();
        } else {
          logout();
        }
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const updateActivity = () => {
    sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      updateActivity();
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
