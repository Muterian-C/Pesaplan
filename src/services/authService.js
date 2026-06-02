import { authApi } from '../api/authApi';

class AuthService {
  // Store token
  setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('token');
  }

  // Login user
  async login(email, password) {
    try {
      const response = await authApi.login(email, password);
      const { access_token, user } = response;
      this.setToken(access_token);
      return { success: true, user, token: access_token };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      return { 
        success: false, 
        message: error.response?.data?.error || 'Login failed' 
      };
    }
  }

  // Register user
  async register(name, email, password, payDay = 28) {
    try {
      const response = await authApi.register(name, email, password, payDay);
      const { access_token, user } = response;
      this.setToken(access_token);
      return { success: true, user, token: access_token };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      return { 
        success: false, 
        message: error.response?.data?.error || 'Registration failed' 
      };
    }
  }

  // Get current user
  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const user = await authApi.getMe();
      return user;
    } catch (error) {
      console.error('Get user error:', error.response?.status);
      if (error.response?.status === 401 || error.response?.status === 422) {
        this.removeToken();
      }
      return null;
    }
  }

  // Logout
  logout() {
    this.removeToken();
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await authApi.changePassword(currentPassword, newPassword);
      return { success: true, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Failed to change password' 
      };
    }
  }

  // Update profile
  async updateProfile(profileData) {
    try {
      const response = await authApi.updateProfile(profileData);
      return { success: true, user: response.user };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Failed to update profile' 
      };
    }
  }

  // Google OAuth
  googleAuth() {
    authApi.googleAuth();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
}

export const authService = new AuthService();