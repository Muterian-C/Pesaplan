import { useState, useEffect } from "react";
import { useAuth } from './context/AuthContext';
import { useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page imports
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import Dashboard from './pages/dashboard/Dashboard';
import ExpensesPage from './pages/expenses/ExpensesPage';
import IncomePage from './pages/income/IncomePage';
import SavingsPage from './pages/savings/SavingsPage';
import InsightsPage from './pages/insights/InsightsPage';
import SettingsPage from './pages/settings/SettingsPage';
import AffordabilityTool from './pages/affordability/AffordabilityTool';
import BudgetPage from './pages/budget/BudgetPage';
import BillsPage from './pages/bills/BillsPage';
import GoogleCallback from './pages/GoogleCallback';

// Valid pages a logged-in user can be on
const VALID_APP_PAGES = [
  "dashboard", "expenses", "income",
  "savings", "bills", "insights", "afford", "settings",
  "budget",
];

function App() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const { 
    page, setPage, 
    incomes, setIncomes,
    expenses, setExpenses,
    savingsGoals, setSavingsGoals,
  } = useApp();

  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);

  // ─────────────────────────────────────
  // HANDLE GOOGLE OAUTH CALLBACK URL
  // ─────────────────────────────────────
  useEffect(() => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    // Handle Google callback - check for token in URL
    if (token && (path === '/auth/google/success' || path.includes('google/success'))) {
      console.log('Google callback detected, saving token...');
      localStorage.setItem('token', token);
      // Clean the URL and redirect to dashboard
      window.history.replaceState({}, document.title, '/dashboard');
      window.location.reload();
      return;
    }
    
    // Also handle the case with double slash
    if (token && window.location.href.includes('//auth/google/success')) {
      console.log('Double slash Google callback detected, saving token...');
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    }
  }, []);

  // ─────────────────────────────────────
  // SAVE LAST PAGE TO LOCALSTORAGE
  // ─────────────────────────────────────
  useEffect(() => {
    if (VALID_APP_PAGES.includes(page)) {
      localStorage.setItem("lastPage", page);
    }
  }, [page]);

  // ─────────────────────────────────────
  // HANDLE AUTHENTICATION STATE
  // ─────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;
    setInitialAuthCheckDone(true);

    if (isAuthenticated) {
      const savedPage = localStorage.getItem("lastPage");
      const restoredPage = savedPage && VALID_APP_PAGES.includes(savedPage)
        ? savedPage
        : "dashboard";
      setPage(restoredPage);
    } else {
      setPage((prev) => (prev === "auth" ? "auth" : "landing"));
      localStorage.removeItem("lastPage");
    }
  }, [isAuthenticated, authLoading, setPage]);

  // ─────────────────────────────────────
  // HANDLE LOGOUT
  // ─────────────────────────────────────
  const handleLogout = async () => {
    await logout();
    setIncomes([]);
    setExpenses([]);
    setSavingsGoals([]);
    setPage("landing");
    localStorage.removeItem("lastPage");
  };

  // ─────────────────────────────────────
  // LOADING SCREEN
  // ─────────────────────────────────────
  if (authLoading || !initialAuthCheckDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading PesaPlan...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────
  // PAGE RENDERING
  // ─────────────────────────────────────
  const renderPage = () => {
    // Check for Google callback first
    const path = window.location.pathname;
    const hasToken = new URLSearchParams(window.location.search).get('token');
    
    if (hasToken && (path === '/auth/google/success' || path.includes('google/success') || window.location.href.includes('//auth/google/success'))) {
      return <GoogleCallback />;
    }

    if (!isAuthenticated) {
      if (page === "auth") {
        return <AuthPage onLogin={() => setPage("dashboard")} />;
      }
      return <LandingPage onGetStarted={() => setPage("auth")} />;
    }

    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "expenses":
        return <ExpensesPage />;
      case "income":
        return <IncomePage />;
      case "savings":
        return <SavingsPage />;
      case "insights":
        return <InsightsPage />;
      case "bills":
        return <BillsPage />;
      case "afford":
        return <AffordabilityTool />;
      case "budget":
        return <BudgetPage />;
      case "settings":
        return <SettingsPage onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-all duration-300">
      {isAuthenticated && <Navbar />}

      <main className={isAuthenticated ? "pt-16 pb-20" : ""}>
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {!isAuthenticated && <Footer />}

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}

export default App;