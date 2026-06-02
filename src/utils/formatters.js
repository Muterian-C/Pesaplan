// Currency formatting
export const formatCurrency = (amount, currency = 'KES') => {
  if (amount === undefined || amount === null) return `${currency} 0`;
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Shortcut for KES formatting (matches your existing fmt function)
export const fmt = (amount) => {
  return `KES ${Number(amount).toLocaleString()}`;
};

// Date formatting
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-KE');
};

export const formatDateForInput = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

// Get current month/year
export const getCurrentMonth = () => new Date().getMonth() + 1;
export const getCurrentYear = () => new Date().getFullYear();

// Get month name
export const getMonthName = (month) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month - 1];
};

// Calculate days until due
export const getDaysUntilDue = (dueDay) => {
  const today = new Date().getDate();
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  
  if (dueDay >= today) {
    return dueDay - today;
  } else {
    return daysInMonth - today + dueDay;
  }
};