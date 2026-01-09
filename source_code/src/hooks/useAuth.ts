import { useState, useEffect } from 'react';

interface AuthStatus {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  username?: string;
}

export function useAuth() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: null,
    isLoading: true,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();

      setAuthStatus({
        isAuthenticated: data.authenticated,
        isLoading: false,
        username: data.username,
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthStatus({
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = () => {
    window.location.href = '/api/auth/github';
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAuthStatus({
        isAuthenticated: false,
        isLoading: false,
      });
      window.location.href = '/blog';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    isAuthenticated: authStatus.isAuthenticated,
    isLoading: authStatus.isLoading,
    username: authStatus.username,
    login,
    logout,
  };
}
