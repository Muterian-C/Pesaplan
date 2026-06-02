import API from './axios';

export const savingsApi = {
  // Get all savings goals
  getAll: async () => {
    const response = await API.get('/savings');
    return response.data;
  },

  // Add new savings goal
  add: async (goalData) => {
    const response = await API.post('/savings', goalData);
    return response.data;
  },

  // Update savings goal
  update: async (id, goalData) => {
    const response = await API.put(`/savings/${id}`, goalData);
    return response.data;
  },

  // Delete savings goal
  delete: async (id) => {
    const response = await API.delete(`/savings/${id}`);
    return response.data;
  },

  // Update saved amount only
  updateSaved: async (id, savedAmount) => {
    const response = await API.put(`/savings/${id}`, { saved: savedAmount });
    return response.data;
  },
};