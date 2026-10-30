import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as defaultData } from '../data/portfolioData.js';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'milan_portfolio_cms_data_v1';
const AUTH_KEY = 'milan_portfolio_admin_auth';

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage:', e);
    }
    return defaultData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  // Save to localStorage whenever data changes
  const updateData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  };

  const resetToDefault = () => {
    setData(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset data:', e);
    }
  };

  const loginAdmin = (password) => {
    // Default admin passcode: milan2026 or admin123
    if (password === 'milan2026' || password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetToDefault,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
