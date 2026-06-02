import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';  // Fixed path

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      console.log('Loading user, token exists:', authService.isAuthenticated());

      if (!authService.isAuthenticated()) {
        console.log('No token, setting loading to false');
        setLoading(false);
        return;
      }

      try {
        console.log('Verifying token with backend...');
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log('User loaded:', userData);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (name, email, password, payDay = 28) => {
    const result = await authService.register(name, email, password, payDay);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const changePassword = async (currentPassword, newPassword) => {
    return await authService.changePassword(currentPassword, newPassword);
  };

  const updateProfile = async (profileData) => {
    const result = await authService.updateProfile(profileData);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    changePassword,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};