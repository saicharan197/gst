import React from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, FileCheck, Package, AlertCircle, Users, Activity, Zap, Printer } from 'lucide-react';
import InvoiceModal from '../components/InvoiceModal';

const Dashboard = ({ isDarkMode }) => {
  const [searchParams] = useSearchParams();
  const businessType = searchParams.get('type') || 'General';
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = React.useState(false);

  const getBusinessInsights = () => {
    switch (businessType) {
      case 'Electronics':
        return {
          title: 'Stock Alert',
          desc: 'High demand for latest smartphones. Check IMEI stock levels.',
          opportunity: 'Exchange offers could boost sales by 15%.'
        };
      case 'Pharma':
        return {
          title: 'Expiry Warning',
          desc: 'Batch B-204 expiring in 12 days. Prioritize clearance.',
          opportunity: 'New generic alternatives available at 30% lower cost.'
        };
      case 'Hardware':
        return {
          title: 'Logistics Info',
          desc: 'Steel prices rising. Bulk procurement suggested for next month.',
          opportunity: 'Project-based quotes have higher conversion rates this week.'
        };
      case 'Kirana/FMCG':
        return {
          title: 'Inventory Speed',
          desc: 'Fast-moving consumer goods rotating 20% faster than usual.',
          opportunity: 'Bundling snacks with beverages could increase average bill value.'
        };
      default:
        return {
          title: 'Growth Opportunity',
          desc: 'Your business saw a 22% surge in demand this week. Restock recommended.',
          opportunity: 'Expanding your product range could improve cash flow.'
        };
    }
  };

  const insights = getBusinessInsights();

  const chartOptions = {
    chart: { type: 'area', toolbar: { show: false }, background: 'transparent' },
    colors: ['#2563eb', '#7c3aed'],
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], labels: { style: { colors: '#94a3b8' } } },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    grid: { borderColor: 'rgba(255,255,255,0.05)' },
    theme: { mode: isDarkMode ? 'dark' : 'light' }
  };

  const chartSeries = [
    { name: 'Revenue', data: [45, 52, 38, 65, 48, 112] },
    { name: 'Stock Movement', data: [32, 44, 25, 48, 38, 88] }
  ];

  const stats = [
    { label: 'Total Sales', value: '₹12.4L', change: '+18.5%', icon: <DollarSign size={20} />, trend: 'up' },
    { label: 'Invoices Sent', value: '842', change: '+5.2%', icon: <FileCheck size={20} />, trend: 'up' },
    { label: 'Pending Payments', value: '₹2.8L', change: '-2.1%', icon: <Activity size={20} />, trend: 'down' },
    { label: 'Low Stock Items', value: '14', icon: <Package size={20} />, trend: 'neutral' },
  ];

  return (
    <div className="fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>{businessType} Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome to your specialized {businessType.toLowerCase()} command center.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => setIsInvoiceModalOpen(true)}>+ Create New Bill</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            className="glass-card" 
            style={{ padding: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                background: 'var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-light)'
              }}>
                {stat.icon}
              </div>
              {stat.change && (
                <span style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  color: stat.trend === 'up' ? 'var(--success)' : 'var(--error)',
                  padding: '4px 8px',
                  background: stat.trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '6px',
                  height: 'fit-content'
                }}>
                  {stat.change}
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>{stat.label}</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Revenue Performance</h3>
            <select className="glass" style={{ padding: '6px 12px', borderRadius: '8px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Mira AI Insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass" style={{ padding: '16px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Zap size={16} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{insights.title}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {insights.desc}
              </p>
            </div>
            <div className="glass" style={{ padding: '16px', borderRadius: '16px', borderLeft: '4px solid var(--warning)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <AlertCircle size={16} color="var(--warning)" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Business Strategy</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {insights.opportunity}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recent Invoices</h3>
            <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>View All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Invoice ID</th>
                  <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Customer</th>
                  <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Date</th>
                  <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Amount</th>
                  <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Status</th>
                  <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#INV-8842', customer: 'Bharath Enterprises', date: '23 Dec 2025', amount: '₹21,150', status: 'Paid' },
                  { id: '#INV-8841', customer: 'Ramesh Hardware', date: '22 Dec 2025', amount: '₹12,400', status: 'Pending' },
                  { id: '#INV-8840', customer: 'Modern Tech Solutions', date: '21 Dec 2025', amount: '₹45,200', status: 'Paid' },
                  { id: '#INV-8839', customer: 'Green Valley Exports', date: '20 Dec 2025', amount: '₹8,900', status: 'Overdue' },
                ].map((inv, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{inv.id}</td>
                    <td style={{ padding: '16px 8px' }}>{inv.customer}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{inv.date}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 700 }}>{inv.amount}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        background: inv.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : inv.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: inv.status === 'Paid' ? 'var(--success)' : inv.status === 'Pending' ? 'var(--warning)' : 'var(--error)'
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <button 
                        onClick={() => setIsInvoiceModalOpen(true)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}
                      >
                        <Printer size={16} /> Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: <Package size={20} />, label: 'Add Item', color: '#3b82f6' },
              { icon: <Users size={20} />, label: 'New Client', color: '#10b981' },
              { icon: <TrendingUp size={20} />, label: 'Tax Report', color: '#8b5cf6' },
              { icon: <Activity size={20} />, label: 'Settings', color: '#f59e0b' },
            ].map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  gap: '12px',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div style={{ color: action.color }}>{action.icon}</div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
          
          <div style={{ marginTop: '32px', padding: '20px', borderRadius: '16px', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', color: 'white' }}>
            <h4 style={{ fontWeight: 800, marginBottom: '8px' }}>Pro Plan Active</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '16px' }}>You have unlimited invoices and advanced AI insights enabled.</p>
            <button style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Manage Subscription</button>
          </div>
        </div>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => setIsInvoiceModalOpen(false)} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};

export default Dashboard;

