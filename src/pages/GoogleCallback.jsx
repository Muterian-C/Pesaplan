import { useEffect } from 'react';

export default function GoogleCallback() {
  useEffect(() => {
    // Get token from URL (handles both normal and double slash cases)
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    
    // If token not found in params, try to extract from full URL
    if (!token) {
      const tokenMatch = window.location.href.match(/[?&]token=([^&]+)/);
      token = tokenMatch ? tokenMatch[1] : null;
    }
    
    if (token) {
      console.log('Token found, saving to localStorage');
      localStorage.setItem('token', token);
      
      // Small delay to ensure token is saved before redirect
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    } else {
      console.error('No token found in callback URL');
      setTimeout(() => {
        window.location.href = '/auth?error=google_failed';
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Completing Google sign in...</p>
      </div>
    </div>
  );
}