import API from './axios';

export const authApi = {
  // Register new user
  register: async (name, email, password, payDay = 28) => {
    const response = await API.post('/auth/register', {
      name,
      email,
      password,
      pay_day: payDay,
    });
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  // Google OAuth redirect
  googleAuth: () => {
    window.location.href = `${API.defaults.baseURL}/auth/google`;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await API.post('/user/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await API.put('/user/profile', profileData);
    return response.data;
  },
};