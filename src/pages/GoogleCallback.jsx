import { useEffect } from 'react';

export default function GoogleCallback() {
  useEffect(() => {
    // The token is handled in the main App.jsx
    // This component just redirects to dashboard
    window.location.href = '/dashboard';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Completing Google sign in...</p>
      </div>
    </div>
  );
}