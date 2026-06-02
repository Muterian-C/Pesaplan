// Expense Categories (from your ExpensesPage)
export const EXPENSE_CATEGORIES = [
  { id: "rent", label: "Rent", icon: "🏠", type: "fixed", color: "#6366f1" },
  { id: "transport", label: "Transport", icon: "🚗", type: "variable", color: "#f59e0b" },
  { id: "food", label: "Food", icon: "🍔", type: "variable", color: "#10b981" },
  { id: "internet", label: "Internet", icon: "🌐", type: "fixed", color: "#3b82f6" },
  { id: "helb", label: "HELB", icon: "📚", type: "fixed", color: "#ef4444" },
  { id: "blacktax", label: "Black Tax", icon: "👨‍👩‍👧", type: "variable", color: "#8b5cf6" },
  { id: "savings", label: "Savings", icon: "💰", type: "fixed", color: "#14b8a6" },
  { id: "utilities", label: "Utilities", icon: "💡", type: "fixed", color: "#f97316" },
  { id: "emergencies", label: "Emergency", icon: "🚨", type: "variable", color: "#ec4899" },
  { id: "entertainment", label: "Entertainment", icon: "🎬", type: "variable", color: "#a855f7" },
  { id: "shopping", label: "Shopping", icon: "🛍️", type: "variable", color: "#06b6d4" },
  { id: "health", label: "Health", icon: "🏥", type: "variable", color: "#14b8a6" },
];

// Income Categories
export const INCOME_CATEGORIES = [
  { id: "salary", label: "Salary", icon: "💼", color: "#10b981" },
  { id: "freelance", label: "Freelance", icon: "💻", color: "#8b5cf6" },
  { id: "business", label: "Business", icon: "🏪", color: "#f59e0b" },
  { id: "investment", label: "Investment", icon: "📈", color: "#3b82f6" },
  { id: "rental", label: "Rental", icon: "🏠", color: "#14b8a6" },
  { id: "other", label: "Other", icon: "💰", color: "#6b7280" },
];

// Bill Categories
export const BILL_CATEGORIES = [
  { id: "rent", label: "Rent/Mortgage", icon: "🏠", color: "#6366f1" },
  { id: "electricity", label: "Electricity", icon: "⚡", color: "#f59e0b" },
  { id: "water", label: "Water", icon: "💧", color: "#3b82f6" },
  { id: "internet", label: "Internet", icon: "🌐", color: "#10b981" },
  { id: "phone", label: "Phone/Data", icon: "📱", color: "#8b5cf6" },
  { id: "subscriptions", label: "Subscriptions", icon: "📺", color: "#ec4899" },
  { id: "insurance", label: "Insurance", icon: "🛡️", color: "#14b8a6" },
  { id: "loan", label: "Loan Repayment", icon: "🏦", color: "#ef4444" },
  { id: "helb", label: "HELB", icon: "📚", color: "#f97316" },
  { id: "sacco", label: "SACCO", icon: "🤝", color: "#a855f7" },
];

// Frequency options
export const FREQUENCIES = [
  { id: "monthly", label: "Monthly", icon: "📅" },
  { id: "weekly", label: "Weekly", icon: "📆" },
  { id: "one-time", label: "One-time", icon: "⭐" },
];

// Alert types
export const ALERT_TYPES = {
  DANGER: "danger",
  WARNING: "warn",
  SUCCESS: "success",
  INFO: "info",
};