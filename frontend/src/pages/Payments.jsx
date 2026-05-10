import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Search, Filter, MessageCircle, Link, 
  UploadCloud, CheckCircle, Loader2, TrendingUp,
  AlertCircle, ChevronRight, User, DollarSign, Calendar
} from 'lucide-react';

const Payments = ({ isDarkMode }) => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchComplete, setMatchComplete] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({ customer: '', amount: '', mode: 'Cash' });
  const [paymentsHistory, setPaymentsHistory] = useState([
    { customer: 'Ramesh Hardware', amount: 5000, mode: 'UPI', date: '10 May 2026' },
    { customer: 'Modern Tech', amount: 12000, mode: 'Cash', date: '09 May 2026' },
  ]);

  const [receivables, setReceivables] = useState([
    { name: 'Aditya Verma', company: 'Verma Electronics', amount: 45000, days: 12, status: 'Overdue' },
    { name: 'Sneha Rao', company: 'Rao Hardware', amount: 8200, days: 5, status: 'Pending' },
    { name: 'Karthik S', company: 'Global Services', amount: 125000, days: 28, status: 'Critical' },
    { name: 'Pooja Mehta', company: 'Mehta Pharma', amount: 15400, days: 2, status: 'Pending' },
  ]);

  const handleBankMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setMatchComplete(true);
      
      // Update data: Move Sneha and Karthik to history
      const matchedItems = receivables.filter(r => r.name === 'Sneha Rao' || r.name === 'Karthik S');
      const remainingItems = receivables.filter(r => r.name !== 'Sneha Rao' && r.name !== 'Karthik S');
      
      const newHistory = matchedItems.map(item => ({
        customer: item.name,
        amount: item.amount,
        mode: 'Bank Match',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }));
      
      setReceivables(remainingItems);
      setPaymentsHistory([...newHistory, ...paymentsHistory]);

      setTimeout(() => setMatchComplete(false), 3000);
    }, 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSavePayment = () => {
    if (!newPayment.customer || !newPayment.amount) return;
    
    const payment = {
      ...newPayment,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    setPaymentsHistory([payment, ...paymentsHistory]);
    setNewPayment({ customer: '', amount: '', mode: 'Cash' });
    setIsAddPaymentOpen(false);
  };

  return (
    <div className="fade-in">
      <header className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>Payment Recovery</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track accounts receivable and automate collections.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>Print Ledger</button>
          <button className="btn btn-primary" onClick={() => setIsAddPaymentOpen(true)}>+ Add Payment</button>
        </div>
      </header>

      {/* Print-only Report Section */}
      <div className="print-only" style={{ display: 'none', color: 'black', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '8px' }}>Receiving Agent Report</h1>
          <p>Generated on: {new Date().toLocaleDateString()} | Agent ID: AGENT-9942</p>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Customer / Company</th>
              <th style={{ textAlign: 'right', padding: '12px' }}>Pending Amount</th>
              <th style={{ textAlign: 'center', padding: '12px' }}>Aging</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {receivables.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>
                  <strong>{item.name}</strong><br/>
                  <small>{item.company}</small>
                </td>
                <td style={{ textAlign: 'right', padding: '12px' }}>₹{item.amount.toLocaleString()}</td>
                <td style={{ textAlign: 'center', padding: '12px' }}>{item.days} Days</td>
                <td style={{ padding: '12px', width: '150px', borderBottom: '1px solid #ccc' }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{ borderBottom: '1px solid #000', height: '40px' }}></div>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Agent Signature</p>
          </div>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{ borderBottom: '1px solid #000', height: '40px' }}></div>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Verified By</p>
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      <AnimatePresence>
        {isAddPaymentOpen && (
          <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.8)', 
            backdropFilter: 'blur(8px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            padding: '20px'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card" 
              style={{ width: '100%', maxWidth: '450px', padding: '32px', position: 'relative' }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>Add Payment</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="input-group">
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Customer Name</label>
                  <input 
                    type="text" 
                    className="glass" 
                    placeholder="Enter customer name"
                    value={newPayment.customer}
                    onChange={(e) => setNewPayment({ ...newPayment, customer: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'white' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Amount Received (₹)</label>
                  <input 
                    type="number" 
                    className="glass" 
                    placeholder="0.00"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'white' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Payment Mode</label>
                  <select 
                    className="glass"
                    value={newPayment.mode}
                    onChange={(e) => setNewPayment({ ...newPayment, mode: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'white' }}
                  >
                    <option>Cash</option>
                    <option>UPI / QR</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsAddPaymentOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleSavePayment}>Save Payment</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Receivables Aging Report */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Receivable Aging Report</h3>
              <div style={{ position: 'relative', width: '250px' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  placeholder="Search customer..." 
                  className="glass"
                  style={{ width: '100%', padding: '8px 8px 8px 36px', borderRadius: '8px', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Pending Amount</th>
                  <th style={{ padding: '12px' }}>Aging (Days)</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {receivables.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '16px 12px' }}>
                      <p style={{ fontWeight: 700 }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.company}</p>
                    </td>
                    <td style={{ padding: '16px 12px', fontWeight: 800 }}>₹{item.amount.toLocaleString()}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} color="var(--text-secondary)" />
                        <span>{item.days} days</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontWeight: 700,
                        background: item.status === 'Critical' ? 'rgba(244, 63, 94, 0.1)' : item.status === 'Overdue' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: item.status === 'Critical' ? 'var(--error)' : item.status === 'Overdue' ? 'var(--warning)' : 'var(--success)'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button title="WhatsApp Reminder" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: 'none', color: 'var(--success)', cursor: 'pointer' }}>
                          <MessageCircle size={16} />
                        </button>
                        <button title="Share Ledger Link" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.1)', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                          <Link size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Collections Section */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px' }}>Recent Collections</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Mode</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentsHistory.map((pay, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 600 }}>{pay.customer}</td>
                    <td style={{ padding: '16px 12px', fontWeight: 800, color: 'var(--success)' }}>₹{Number(pay.amount).toLocaleString()}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{pay.date}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'var(--glass-border)', borderRadius: '6px' }}>{pay.mode}</span>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
                        <CheckCircle size={14} /> Received
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* AI Bank Match */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              margin: '0 auto 16px'
            }}>
              <CreditCard size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>Mira AI Auto-Match</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              Upload your bank statement. Mira AI will automatically match payments with open invoices.
            </p>

            <div 
              onClick={handleBankMatch}
              style={{ 
                border: '2px dashed var(--glass-border)', 
                borderRadius: '16px', 
                padding: '32px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isMatching ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Loader2 size={32} className="animate-spin" color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Matching Transactions...</span>
                </div>
              ) : matchComplete ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={32} color="var(--success)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>12 Payments Matched</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <UploadCloud size={32} color="var(--text-secondary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Upload Bank Statement</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ fontWeight: 800, marginBottom: '16px' }}>Recovery Stats</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Collected this month</span>
                <span style={{ fontWeight: 700, color: 'var(--success)' }}>₹8.4L</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pending & Overdue</span>
                <span style={{ fontWeight: 700, color: 'var(--error)' }}>₹3.2L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
