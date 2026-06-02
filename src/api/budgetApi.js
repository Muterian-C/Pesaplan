import API from './axios';

export const budgetApi = {
  // Get budgets for a month
  getBudgets: async (month, year) => {
    const response = await API.get(`/budgets?month=${month}&year=${year}`);
    return response.data;
  },

  // Create budget
  create: async (budgetData) => {
    const response = await API.post('/budgets', budgetData);
    return response.data;
  },

  // Update budget
  update: async (id, budgetData) => {
    const response = await API.put(`/budgets/${id}`, budgetData);
    return response.data;
  },

  // Delete budget
  delete: async (id) => {
    const response = await API.delete(`/budgets/${id}`);
    return response.data;
  },

  // Get budget summary with actual spending
  getSummary: async (month, year) => {
    const response = await API.get(`/budgets/summary?month=${month}&year=${year}`);
    return response.data;
  },

  // Get budget alerts
  getAlerts: async () => {
    const response = await API.get('/budgets/alerts');
    return response.data;
  },

  // Get available categories
  getCategories: async () => {
    const response = await API.get('/budgets/categories');
    return response.data;
  },
};