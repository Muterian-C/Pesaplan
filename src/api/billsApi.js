import API from './axios';

export const billsApi = {
  // Get all bills
  getAll: async (isActive = true) => {
    const response = await API.get(`/bills?is_active=${isActive}`);
    return response.data;
  },

  // Get upcoming bills
  getUpcoming: async () => {
    const response = await API.get('/bills?upcoming=true');
    return response.data;
  },

  // Create bill
  create: async (billData) => {
    const response = await API.post('/bills', billData);
    return response.data;
  },

  // Update bill
  update: async (id, billData) => {
    const response = await API.put(`/bills/${id}`, billData);
    return response.data;
  },

  // Delete bill
  delete: async (id, hardDelete = false) => {
    const response = await API.delete(`/bills/${id}?hard=${hardDelete}`);
    return response.data;
  },

  // Pay bill (creates expense)
  pay: async (id, paymentData) => {
    const response = await API.post(`/bills/${id}/pay`, paymentData);
    return response.data;
  },

  // Get bill summary
  getSummary: async () => {
    const response = await API.get('/bills/summary');
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (billId) => {
    const response = await API.get(`/bills/payment-history/${billId}`);
    return response.data;
  },
};