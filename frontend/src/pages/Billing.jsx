import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, ShieldAlert, CheckCircle2, QrCode, X, 
  CreditCard, Sparkles, Printer, Send, Save, Zap,
  User, Phone, MapPin, Building
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Billing = ({ isDarkMode }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Premium Cloud Storage', qty: 1, price: 4500, gst: 18 }
  ]);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', businessName: '' });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', qty: 1, price: 0, gst: 18 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalGst = items.reduce((sum, item) => sum + (item.price * item.qty * item.gst / 100), 0);
  const grandTotal = subTotal + totalGst;

  const handleMiraAiAutoFill = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setCustomer({
        name: 'Aditya Verma',
        phone: '+91 98765 43210',
        address: 'Sector 44, Gurgaon, HR - 122003',
        businessName: 'Verma Electronics & Solutions'
      });
      setItems([
        { id: 1, name: 'Smart LED Monitor 32"', qty: 2, price: 18500, gst: 18 },
        { id: 2, name: 'Wireless Mechanical Keyboard', qty: 5, price: 3200, gst: 12 },
        { id: 3, name: 'Installation Service', qty: 1, price: 1500, gst: 5 }
      ]);
      setIsAiLoading(false);
    }, 1500);
  };

  const handleSaveInvoice = () => {
    setShowSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#7c3aed']
    });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>Smart Billing</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create GST compliant invoices in seconds.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleMiraAiAutoFill} 
            className="btn btn-secondary" 
            style={{ borderColor: 'var(--primary)', color: 'var(--primary-light)' }}
            disabled={isAiLoading}
          >
            <Sparkles size={18} className={isAiLoading ? 'animate-pulse' : ''} />
            {isAiLoading ? 'Mira AI Analyzing...' : 'Auto-fill with Mira AI'}
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        {/* Editor Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={20} color="var(--primary)" /> Party Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="input-group">
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Business Name</label>
                <input 
                  type="text" 
                  value={customer.businessName} 
                  onChange={(e) => setCustomer({...customer, businessName: e.target.value})}
                  className="glass" 
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                  placeholder="e.g. Verma Electronics"
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Customer Name</label>
                <input 
                  type="text" 
                  value={customer.name} 
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                  className="glass" 
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                  placeholder="Contact Person"
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Phone Number</label>
                <input 
                  type="text" 
                  value={customer.phone} 
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  className="glass" 
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                  placeholder="+91"
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Address</label>
                <input 
                  type="text" 
                  value={customer.address} 
                  onChange={(e) => setCustomer({...customer, address: e.target.value})}
                  className="glass" 
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                  placeholder="Full Address"
                />
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Line Items</h3>
              <button onClick={addItem} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Item
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px' }}>Description</th>
                  <th style={{ padding: '12px' }}>Qty</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>GST</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="glass"
                        style={{ border: 'none', background: 'transparent', width: '100%', color: 'var(--text-primary)' }}
                        placeholder="Item name"
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="number" 
                        value={item.qty} 
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value))}
                        className="glass"
                        style={{ border: 'none', background: 'transparent', width: '50px', color: 'var(--text-primary)' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="number" 
                        value={item.price} 
                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value))}
                        className="glass"
                        style={{ border: 'none', background: 'transparent', width: '80px', color: 'var(--text-primary)' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <select 
                        value={item.gst} 
                        onChange={(e) => updateItem(item.id, 'gst', parseInt(e.target.value))}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)' }}
                      >
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>₹{(item.qty * item.price * (1 + item.gst/100)).toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => removeItem(item.id)} style={{ color: 'var(--error)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Side */}
        <div style={{ position: 'sticky', top: '24px', height: 'fit-content' }}>
          <div id="invoice-preview" className="glass-card" style={{ 
            padding: '40px', 
            background: isDarkMode ? '#1e293b' : '#fff', 
            color: isDarkMode ? '#fff' : '#000',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            borderRadius: '0 0 20px 20px',
            borderTop: '8px solid var(--primary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>TAX INVOICE</h2>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Original for Recipient</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', marginBottom: '4px' }}>
                  <Zap size={20} fill="var(--primary)" color="var(--primary)" />
                  <span style={{ fontWeight: 800 }}>My BillBook</span>
                </div>
                <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>INV-{new Date().getFullYear()}-042</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', fontSize: '0.8rem' }}>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '4px', opacity: 0.6 }}>BILL TO</p>
                <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>{customer.businessName || 'Customer Business'}</p>
                <p>{customer.name}</p>
                <p>{customer.phone}</p>
                <p>{customer.address}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, marginBottom: '4px', opacity: 0.6 }}>DATE</p>
                <p>{new Date().toLocaleDateString()}</p>
                <p style={{ fontWeight: 700, marginTop: '10px', marginBottom: '4px', opacity: 0.6 }}>GSTIN</p>
                <p>07AABCU9603R1ZN</p>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px', marginBottom: '8px', fontWeight: 700, fontSize: '0.75rem' }}>
                <span>Item</span>
                <span style={{ textAlign: 'center' }}>Qty</span>
                <span style={{ textAlign: 'right' }}>Amount</span>
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '6px 0', fontSize: '0.8rem' }}>
                  <span>{item.name || 'Untitled Item'}</span>
                  <span style={{ textAlign: 'center' }}>{item.qty}</span>
                  <span style={{ textAlign: 'right' }}>₹{(item.qty * item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid var(--glass-border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ opacity: 0.7 }}>Subtotal</span>
                <span>₹{subTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ opacity: 0.7 }}>Total GST</span>
                <span>₹{totalGst.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px dashed var(--glass-border)', paddingTop: '20px' }}>
              <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Thank you for your business!</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                <button 
                  onClick={() => window.print()}
                  className="btn btn-secondary" 
                  style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                >
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{ 
              position: 'fixed', 
              bottom: '40px', 
              right: '40px', 
              background: 'var(--success)', 
              color: 'white', 
              padding: '16px 24px', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
              zIndex: 1000
            }}
          >
            <CheckCircle2 size={24} />
            <span style={{ fontWeight: 700 }}>Invoice Generated Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Billing;

