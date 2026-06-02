// Financial calculations (moved from App.jsx)
export const calculateHealthScore = (balance, savingsRate, survivalDays, totalIncome, totalExpenses) => {
  return Math.min(
    100,
    Math.max(
      0,
      (balance > 0 ? 30 : 0) +
        (savingsRate >= 20 ? 25 : savingsRate >= 10 ? 15 : 5) +
        (survivalDays >= 15 ? 25 : survivalDays >= 7 ? 15 : 5) +
        (totalIncome > 0 && totalExpenses / totalIncome < 0.8
          ? 20
          : totalIncome > 0 && totalExpenses / totalIncome < 0.95
          ? 10
          : 0)
    )
  );
};

export const calculateSavingsRate = (savingsAmount, totalIncome) => {
  return totalIncome > 0 ? (savingsAmount / totalIncome) * 100 : 0;
};

export const calculateDaysToPayday = (payDay) => {
  const today = new Date().getDate();
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  
  return payDay >= today ? payDay - today : daysInMonth - today + payDay;
};

export const calculateSurvivalDays = (balance, totalExpenses, daysInMonth) => {
  const dailyBurnRate = daysInMonth > 0 ? totalExpenses / daysInMonth : 0;
  return dailyBurnRate > 0 ? Math.floor(balance / dailyBurnRate) : 999;
};

export const calculateDailyBurnRate = (totalExpenses) => {
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  return daysInMonth > 0 ? totalExpenses / daysInMonth : 0;
};