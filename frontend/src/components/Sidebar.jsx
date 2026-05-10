import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Package, CreditCard, 
  Users, Settings, LogOut, Sun, Moon, Zap
} from 'lucide-react';

const Sidebar = ({ toggleTheme, isDarkMode }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Billing', icon: <FileText size={20} />, path: '/billing' },
    { name: 'Inventory', icon: <Package size={20} />, path: '/inventory' },
    { name: 'Payments', icon: <CreditCard size={20} />, path: '/payments' },
    { name: 'Customers', icon: <Users size={20} />, path: '/customers' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="glass" style={{ 
      width: 'var(--sidebar-width)', 
      height: '100vh', 
      position: 'fixed', 
      left: 0, 
      top: 0, 
      display: 'flex', 
      flexDirection: 'column',
      padding: '24px',
      zIndex: 100,
      borderRight: '1px solid var(--glass-border)',
      borderRadius: '0 24px 24px 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 12px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '12px', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Zap size={24} fill="white" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>My BillBook</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '12px',
              marginBottom: '8px',
              textDecoration: 'none',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--glass-border)' : 'transparent',
              transition: 'all 0.3s ease',
              border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent'
            })}
          >
            {item.icon}
            <span style={{ fontWeight: 600 }}>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
        <button 
          onClick={toggleTheme}
          style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '14px 16px', 
            borderRadius: '12px', 
            background: 'var(--glass)', 
            border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span style={{ fontWeight: 600 }}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '14px 16px', 
          borderRadius: '12px', 
          background: 'transparent', 
          border: 'none',
          color: '#f43f5e',
          cursor: 'pointer'
        }}>
          <LogOut size={20} />
          <span style={{ fontWeight: 600 }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
