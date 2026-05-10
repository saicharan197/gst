import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Payments from './pages/Payments';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Layout wrapper for dashboard pages
  const DashboardLayout = ({ children }) => (
    <div className="dashboard-container">
      <Sidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard isDarkMode={isDarkMode} />
            </DashboardLayout>
          } />
          
          <Route path="/billing" element={
            <DashboardLayout>
              <Billing isDarkMode={isDarkMode} />
            </DashboardLayout>
          } />
          
          <Route path="/inventory" element={
            <DashboardLayout>
              <Inventory isDarkMode={isDarkMode} />
            </DashboardLayout>
          } />

          <Route path="/payments" element={
            <DashboardLayout>
              <Payments isDarkMode={isDarkMode} />
            </DashboardLayout>
          } />

          {/* Placeholder for other routes */}
          <Route path="*" element={<Landing toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

