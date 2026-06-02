import { createContext, useContext, useState, useEffect } from 'react';
import { incomeApi } from '../api/incomeApi';
import { expenseApi } from '../api/expenseApi';
import { savingsApi } from '../api/savingsApi';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // App state
  const [page, setPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Data state
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Dark mode persistence
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch all data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      const [incomeData, expenseData, savingsData] = await Promise.all([
        incomeApi.getAll(),
        expenseApi.getAll(),
        savingsApi.getAll(),
      ]);

      setIncomes(incomeData || []);
      setExpenses(expenseData || []);
      setSavingsGoals(savingsData || []);

      console.log('Data loaded:', {
        incomes: incomeData?.length,
        expenses: expenseData?.length,
        savings: savingsData?.length,
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  // Calculations
  const totalIncome = incomes.reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  const value = {
    // Navigation
    page,
    setPage,
    
    // Theme
    darkMode,
    setDarkMode,
    
    // Data
    incomes,
    setIncomes,
    expenses,
    setExpenses,
    savingsGoals,
    setSavingsGoals,
    dataLoading,
    refetchData: fetchAllData,
    
    // Calculations
    totalIncome,
    totalExpenses,
    balance,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};