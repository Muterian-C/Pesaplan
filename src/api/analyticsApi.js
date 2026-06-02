import API from './axios';

export const analyticsApi = {
  // Get monthly summary
  getSummary: async () => {
    const response = await API.get('/analytics/summary');
    return response.data;
  },

  // Export data (PDF)
  exportData: async () => {
    const response = await API.get('/export/data');
    return response.data;
  },
};