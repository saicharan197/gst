import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, AlertTriangle, TrendingUp, Search, Filter, 
  UploadCloud, FileText, CheckCircle, Loader2, Zap, 
  MoreVertical, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const Inventory = ({ isDarkMode }) => {
  const [searchParams] = useSearchParams();
  const businessType = searchParams.get('type') || 'General';
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const getBusinessInventory = () => {
    const allStock = [
      { name: 'Samsung Galaxy S24 Ultra', sku: 'PHN-001', stock: 12, price: 124000, category: 'Electronics', velocity: 'High' },
      { name: 'iPhone 15 Pro Max', sku: 'PHN-002', stock: 8, price: 139000, category: 'Electronics', velocity: 'High' },
      { name: 'Sony WH-1000XM5', sku: 'ACC-001', stock: 15, price: 29900, category: 'Electronics', velocity: 'Stable' },
      
      { name: 'Paracetamol 500mg', sku: 'MED-442', stock: 5, price: 120, category: 'Pharma', velocity: 'Critical' },
      { name: 'Amoxicillin 250mg', sku: 'MED-443', stock: 2, price: 450, category: 'Pharma', velocity: 'Critical' },
      { name: 'Cetirizine 10mg', sku: 'MED-444', stock: 45, price: 80, category: 'Pharma', velocity: 'Stable' },
      
      { name: 'Amul Gold Milk (1L)', sku: 'FMCG-902', stock: 85, price: 66, category: 'Kirana/FMCG', velocity: 'Stable' },
      { name: 'Tata Salt (1kg)', sku: 'FMCG-903', stock: 120, price: 28, category: 'Kirana/FMCG', velocity: 'High' },
      { name: 'Maggi Noodles (12pk)', sku: 'FMCG-904', stock: 40, price: 168, category: 'Kirana/FMCG', velocity: 'Stable' },
      
      { name: 'Steel Screws (100pc)', sku: 'HRD-112', stock: 3, price: 450, category: 'Hardware', velocity: 'Critical' },
      { name: 'Hammer 16oz', sku: 'HRD-113', stock: 12, price: 890, category: 'Hardware', velocity: 'Stable' },
      { name: 'Asian Paints White (4L)', sku: 'HRD-114', stock: 7, price: 2400, category: 'Hardware', velocity: 'High' },
    ];

    if (businessType === 'General') return allStock.slice(0, 5);
    return allStock.filter(item => item.category === businessType);
  };

  const stockData = getBusinessInventory();
  const lowStockItems = stockData.filter(i => i.velocity === 'Critical');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => setScanComplete(false), 3000);
    }, 2500);
  };

  return (
    <div className="fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>{businessType} Inventory</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Advanced stock tracking for your {businessType.toLowerCase()} business.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">Export Inventory</button>
          <button className="btn btn-primary">+ Add New Item</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Low Stock Alerts */}
          {lowStockItems.length > 0 && (
            <div className="glass-card" style={{ padding: '24px', borderLeft: '6px solid var(--error)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
                  <AlertTriangle color="var(--error)" size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--error)' }}>Critical Stock Alert</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <strong>{lowStockItems.map(i => i.name).join(', ')}</strong> are below safety threshold. Reorder now to avoid stockouts.
                  </p>
                </div>
                <button className="btn btn-primary" style={{ background: 'var(--error)', boxShadow: 'none' }}>Reorder Now</button>
              </div>
            </div>
          )}

          {/* Stock Table */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  placeholder="Search SKU, name..." 
                  className="glass"
                  style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" style={{ padding: '8px 16px' }}><Filter size={16} /> Filters</button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px' }}>Item Details</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Stock Level</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Trend</th>
                  <th style={{ padding: '12px' }}></th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '16px 12px' }}>
                      <p style={{ fontWeight: 700 }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SKU: {item.sku}</p>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'var(--glass-border)', borderRadius: '6px' }}>{item.category}</span>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '80px', height: '6px', background: 'var(--glass-border)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ 
                            width: `${Math.min((item.stock / 100) * 100, 100)}%`, 
                            height: '100%', 
                            background: item.velocity === 'Critical' ? 'var(--error)' : item.velocity === 'High' ? 'var(--warning)' : 'var(--success)'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.stock}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', fontWeight: 700 }}>₹{item.price.toLocaleString()}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: item.velocity === 'High' ? 'var(--success)' : 'var(--text-secondary)' }}>
                        {item.velocity === 'High' ? <ArrowUpRight size={14} /> : <TrendingUp size={14} />}
                        {item.velocity}
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              margin: '0 auto 16px'
            }}>
              <Zap size={24} fill="white" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>Mira AI Scan</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              Upload purchase invoices to automatically update stock levels and pricing.
            </p>

            <div 
              onClick={handleScan}
              style={{ 
                border: '2px dashed var(--glass-border)', 
                borderRadius: '16px', 
                padding: '32px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
            >
              {isScanning ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Loader2 size={32} className="animate-spin" color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Mira AI Reading...</span>
                </div>
              ) : scanComplete ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={32} color="var(--success)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>Scan Successful!</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Added 12 items to inventory.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <UploadCloud size={32} color="var(--text-secondary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Scan Purchase Invoice</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PDF, PNG or JPEG</span>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="var(--primary)" /> Insights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.8rem', padding: '12px', background: 'var(--glass-border)', borderRadius: '10px' }}>
                <p style={{ fontWeight: 700, marginBottom: '4px' }}>Optimal Reorder Point</p>
                <p style={{ color: 'var(--text-secondary)' }}>Samsung S24 stock is depleting 20% faster than usual.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

