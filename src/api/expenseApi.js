import API from './axios';

export const expenseApi = {
  // Get all expenses
  getAll: async () => {
    const response = await API.get('/expenses');
    return response.data;
  },

  // Add new expense
  add: async (expenseData) => {
    const response = await API.post('/expenses', expenseData);
    return response.data;
  },

  // Update expense
  update: async (id, expenseData) => {
    const response = await API.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  delete: async (id) => {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
  },
};