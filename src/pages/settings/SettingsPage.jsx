import { useState, useEffect } from "react";
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import API from '../../api/axios';

export default function SettingsPage({ onLogout }) {
  const { darkMode, setDarkMode, updateUser } = useApp();
  const { user, setUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [changingPassword, setChangingPassword] = useState(false);

  // Export state
  const [exporting, setExporting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "Nairobi, Kenya",
    occupation: user?.occupation || "",
    pay_day: user?.pay_day || 28,
    currency: user?.currency || "KES"
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    monthly_report: true,
    low_balance: true,
    overspending: true,
    savings_reminder: true
  });

  // Load notification preferences on mount
  useEffect(() => {
    fetchNotificationPreferences();
  }, []);

  const fetchNotificationPreferences = async () => {
    try {
      const response = await API.get("/user/notification-preferences");
      if (response.data) {
        setNotifications(response.data);
      }
    } catch (err) {
      console.error("Failed to load notification preferences:", err);
    }
  };

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await API.put("/user/profile", formData);
      if (response.data.user) {
        setUser(response.data.user);
        if (updateUser) updateUser(response.data.user);
        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
      setSaved(true);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await API.put("/user/profile", {
        currency: formData.currency,
        pay_day: parseInt(formData.pay_day)
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        if (updateUser) updateUser(response.data.user);
      }
      
      setSuccess("Preferences updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update preferences");
    } finally {
      setSaving(false);
      setSaved(true);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      await API.put("/user/notification-preferences", notifications);
      setSuccess("Notification preferences updated!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update notification preferences");
    } finally {
      setSaving(false);
      setSaved(true);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      setError("New passwords do not match");
      return;
    }
    
    if (passwordData.new_password.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    
    setChangingPassword(true);
    setError(null);
    
    try {
      await API.post("/user/change-password", {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      });
      
      setSuccess("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await API.get("/export/data");
      
      if (response.data.success && response.data.pdf) {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${response.data.pdf}`;
        link.download = response.data.filename || `pesaplan_report_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        setSuccess("Financial report exported successfully!");
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (err) {
      console.error("Export failed:", err);
      setError("Failed to export report. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const currencies = [
    { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
    { code: "UGX", symbol: "USh", name: "Ugandan Shilling" },
    { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
    { code: "RWF", symbol: "FRw", name: "Rwandan Franc" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
        
        {/* Header - Same as original */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full mb-4">
            <span>⚙️</span> Account Settings
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and financial settings
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-600 dark:text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
          {[
            { id: "profile", label: "Profile", icon: "👤" },
            { id: "preferences", label: "Preferences", icon: "🎨" },
            { id: "notifications", label: "Notifications", icon: "🔔" },
            { id: "security", label: "Security", icon: "🔒" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Settings - Same as original */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>👤</span> Personal Information
            </h2>
            
            <div className="space-y-4">
              {/* Name, Email, Phone, Location, Occupation, Pay Day fields - same as original */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="+254 XXX XXX XXX"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="City, Country"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Occupation
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="e.g., Software Developer"
                    value={formData.occupation || ""}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Pay Day
                </label>
                <select
                  value={formData.pay_day}
                  onChange={(e) => setFormData({ ...formData, pay_day: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Day {i + 1} of the month
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Your salary/payment day of the month
                </p>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {saving ? (
                    <>
                      <span className="animate-spin">⏳</span> Saving...
                    </>
                  ) : saved ? (
                    <>
                      <span>✓</span> Saved Successfully!
                    </>
                  ) : (
                    <>
                      <span>💾</span> Save Changes
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Preferences, Notifications, Security tabs remain the same as original */}
        {/* ... (Preferences, Notifications, Security sections unchanged) ... */}

        {/* Logout Section - Same */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <span>🚪</span> Logout
            </span>
          </button>
          <p className="text-xs text-center text-gray-500 mt-3">
            You'll need to sign in again after logging out
          </p>
        </div>

        {/* Version Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">PesaPlan v2.0.0 • Made with 💚 for Africa</p>
        </div>
      </div>

      {/* Modals - Same as original */}
      {/* ... (Logout and Password modals unchanged) ... */}
    </div>
  );
}