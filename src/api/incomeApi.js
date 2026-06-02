import API from './axios';

export const incomeApi = {
  // Get all incomes
  getAll: async () => {
    const response = await API.get('/incomes');
    return response.data;
  },

  // Add new income
  add: async (incomeData) => {
    const response = await API.post('/incomes', incomeData);
    return response.data;
  },

  // Update income
  update: async (id, incomeData) => {
    const response = await API.put(`/incomes/${id}`, incomeData);
    return response.data;
  },

  // Delete income
  delete: async (id) => {
    const response = await API.delete(`/incomes/${id}`);
    return response.data;
  },
};