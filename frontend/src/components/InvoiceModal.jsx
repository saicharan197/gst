import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Download, Printer, Send, CheckCircle2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const InvoiceModal = ({ isOpen, onClose, isDarkMode }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Preview
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: '#INV-' + Math.floor(1000000 + Math.random() * 9000000),
    date: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    businessName: 'Ramesh Hardware',
    businessAddress: '113, S.R. COMPOUND Indore, Madhya Pradesh',
    businessPincode: '452010',
    businessMobile: '9900001234',
    businessGSTIN: '99ABABA999ABABAA',
    customerName: 'Bharath Enterprises',
    customerAddress: 'Madhya Pradesh, Indore, Madhya Pradesh',
    customerPincode: '452016',
    customerMobile: '9900009987',
    customerPAN: 'AABBCC1090123344',
    items: [
      { id: 1, name: 'Adjustable Spanner', hsn: '512344', qty: 45, rate: 398.31, weight: '17 kg', gstRate: 18 }
    ]
  });

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: Date.now(), name: '', hsn: '', qty: 1, rate: 0, weight: '', gstRate: 18 }]
    });
  };

  const removeItem = (id) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id, field, value) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  };

  const calculateGSTDetails = () => {
    let totalCGST = 0;
    let totalSGST = 0;
    const hsnSummary = {};

    invoiceData.items.forEach(item => {
      const taxableValue = item.qty * item.rate;
      const cgst = taxableValue * (item.gstRate / 2 / 100);
      const sgst = taxableValue * (item.gstRate / 2 / 100);
      
      totalCGST += cgst;
      totalSGST += sgst;

      if (!hsnSummary[item.hsn]) {
        hsnSummary[item.hsn] = { hsn: item.hsn, taxableValue: 0, cgst: 0, sgst: 0, rate: item.gstRate };
      }
      hsnSummary[item.hsn].taxableValue += taxableValue;
      hsnSummary[item.hsn].cgst += cgst;
      hsnSummary[item.hsn].sgst += sgst;
    });

    return { totalCGST, totalSGST, hsnSummary: Object.values(hsnSummary) };
  };

  const subtotal = calculateSubtotal();
  const { totalCGST, totalSGST, hsnSummary } = calculateGSTDetails();
  const totalAmount = subtotal + totalCGST + totalSGST;

  // Simple Number to Words helper (Indian format)
  const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 !== 0 ? inWords(n % 100) : '');
      if (n < 100000) return inWords(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 !== 0 ? inWords(n % 1000) : '');
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + 'Lakh ' + (n % 100000 !== 0 ? inWords(n % 100000) : '');
      return inWords(Math.floor(n / 10000000)) + 'Crore ' + (n % 10000000 !== 0 ? inWords(n % 10000000) : '');
    };

    const whole = Math.floor(num);
    const fraction = Math.round((num - whole) * 100);
    let str = inWords(whole) + 'Rupees ';
    if (fraction > 0) {
      str += 'and ' + inWords(fraction) + 'Paise ';
    }
    return str + 'Only';
  };


  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{
          width: '100%',
          maxWidth: step === 1 ? '800px' : '900px',
          maxHeight: '90vh',
          background: isDarkMode ? '#0f172a' : '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{step === 1 ? 'Create New Invoice' : 'Invoice Preview'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Business Info */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-light)' }}>Business Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Business Name</label>
                    <input type="text" value={invoiceData.businessName} onChange={(e) => setInvoiceData({...invoiceData, businessName: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Address</label>
                    <input type="text" value={invoiceData.businessAddress} onChange={(e) => setInvoiceData({...invoiceData, businessAddress: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Pincode</label>
                    <input type="text" value={invoiceData.businessPincode} onChange={(e) => setInvoiceData({...invoiceData, businessPincode: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>GSTIN</label>
                    <input type="text" value={invoiceData.businessGSTIN} onChange={(e) => setInvoiceData({...invoiceData, businessGSTIN: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-light)' }}>Customer Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Customer Name</label>
                    <input type="text" value={invoiceData.customerName} onChange={(e) => setInvoiceData({...invoiceData, customerName: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Customer Mobile</label>
                    <input type="text" value={invoiceData.customerMobile} onChange={(e) => setInvoiceData({...invoiceData, customerMobile: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Customer Address</label>
                    <input type="text" value={invoiceData.customerAddress} onChange={(e) => setInvoiceData({...invoiceData, customerAddress: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Customer Pincode</label>
                    <input type="text" value={invoiceData.customerPincode} onChange={(e) => setInvoiceData({...invoiceData, customerPincode: e.target.value})} className="glass" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-light)' }}>Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 40px', gap: '12px', alignItems: 'end' }}>
                      <input placeholder="Item Name" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} className="glass" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                      <input placeholder="HSN" value={item.hsn} onChange={(e) => updateItem(item.id, 'hsn', e.target.value)} className="glass" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                      <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value))} className="glass" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                      <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value))} className="glass" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                      <input placeholder="Weight" value={item.weight} onChange={(e) => updateItem(item.id, 'weight', e.target.value)} className="glass" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                      <input type="number" placeholder="GST %" value={item.gstRate} onChange={(e) => updateItem(item.id, 'gstRate', parseFloat(e.target.value))} className="glass" style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'inherit' }} />
                      <button onClick={() => removeItem(item.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={addItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: '2px dashed var(--glass-border)', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '8px' }}><Plus size={18} /> Add Another Item</button>
                </div>
              </div>
            </div>
          ) : (
            /* INVOICE PREVIEW */
            <div id="invoice-preview" style={{ background: '#fff', color: '#000', padding: '40px', borderRadius: '4px', fontFamily: "'Inter', sans-serif", position: 'relative', boxShadow: '0 0 40px rgba(0,0,0,0.1)' }}>
              {/* Decorative Corners */}
              <div style={{ position: 'absolute', top: 10, left: 10, width: 40, height: 40, borderTop: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
              <div style={{ position: 'absolute', top: 10, right: 10, width: 40, height: 40, borderTop: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, width: 40, height: 40, borderBottom: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
              <div style={{ position: 'absolute', bottom: 10, right: 10, width: 40, height: 40, borderBottom: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '80px', height: '80px', background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1.5rem' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(invoiceData.businessName)}&background=000&color=fff`} style={{ width: '100%', borderRadius: '50%' }} alt="logo" />
                  </div>
                  <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{invoiceData.businessName}</h1>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#444' }}>📍 {invoiceData.businessAddress}, {invoiceData.businessPincode}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#444' }}>GSTIN <strong>{invoiceData.businessGSTIN}</strong></p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#444' }}>📞 {invoiceData.businessMobile}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#666' }}>TAX INVOICE</h2>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div><p style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>Invoice No.</p><p style={{ margin: '4px 0', fontWeight: 700 }}>{invoiceData.invoiceNo}</p></div>
                <div><p style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>Invoice Date</p><p style={{ margin: '4px 0', fontWeight: 700 }}>{invoiceData.date}</p></div>
                <div><p style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>Invoice Due Date</p><p style={{ margin: '4px 0', fontWeight: 700 }}>{invoiceData.dueDate}</p></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
                <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                  <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#888', fontWeight: 700 }}>BILL TO</p>
                  <h4 style={{ margin: '0 0 4px', fontWeight: 800 }}>{invoiceData.customerName}</h4>
                  <p style={{ margin: '0 0 4px', fontSize: '0.85rem' }}>{invoiceData.customerAddress}, {invoiceData.customerPincode}</p>
                  <p style={{ margin: '0', fontSize: '0.85rem' }}>Mobile: <strong>{invoiceData.customerMobile}</strong> | PAN: <strong>{invoiceData.customerPAN}</strong></p>
                </div>
                <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                  <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#888', fontWeight: 700 }}>SHIP TO</p>
                  <h4 style={{ margin: '0 0 4px', fontWeight: 800 }}>{invoiceData.customerName}</h4>
                  <p style={{ margin: '0 0 4px', fontSize: '0.85rem' }}>{invoiceData.customerAddress}, {invoiceData.customerPincode}</p>
                  <p style={{ margin: '0', fontSize: '0.85rem' }}>Mobile: <strong>{invoiceData.customerMobile}</strong></p>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>No</th>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem', textAlign: 'left' }}>Items</th>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>HSN No.</th>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>Qty.</th>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>Rate</th>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>Weight</th>
                    <th style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index} style={{ textAlign: 'center' }}>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{index + 1}</td>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700 }}>{item.name}</td>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{item.hsn}</td>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{item.qty} PCS</td>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{item.rate.toFixed(2)}</td>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{item.weight}</td>
                      <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>{(item.qty * item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                  <tr style={{ textAlign: 'center', background: '#f8fafc' }}>
                    <td colSpan={2} style={{ padding: '12px', border: '1px solid #cbd5e1' }}></td>
                    <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}></td>
                    <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>{invoiceData.items.reduce((s, i) => s + i.qty, 0)} PCS</td>
                    <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}></td>
                    <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}></td>
                    <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: 800 }}>{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'start' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                      <th rowSpan={2} style={{ padding: '8px', border: '1px solid #cbd5e1', fontSize: '0.7rem' }}>HSN/SAC</th>
                      <th rowSpan={2} style={{ padding: '8px', border: '1px solid #cbd5e1', fontSize: '0.7rem' }}>Taxable Value</th>
                      <th colSpan={2} style={{ padding: '8px', border: '1px solid #cbd5e1', fontSize: '0.7rem' }}>CGST</th>
                      <th colSpan={2} style={{ padding: '8px', border: '1px solid #cbd5e1', fontSize: '0.7rem' }}>SGST</th>
                      <th rowSpan={2} style={{ padding: '8px', border: '1px solid #cbd5e1', fontSize: '0.7rem' }}>Total Tax Amount</th>
                    </tr>
                    <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                      <th style={{ padding: '4px', border: '1px solid #cbd5e1', fontSize: '0.65rem' }}>Rate</th>
                      <th style={{ padding: '4px', border: '1px solid #cbd5e1', fontSize: '0.65rem' }}>Amount</th>
                      <th style={{ padding: '4px', border: '1px solid #cbd5e1', fontSize: '0.65rem' }}>Rate</th>
                      <th style={{ padding: '4px', border: '1px solid #cbd5e1', fontSize: '0.65rem' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hsnSummary.map((h, i) => (
                      <tr key={i}>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{h.hsn}</td>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{h.taxableValue.toFixed(2)}</td>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{(h.rate / 2).toFixed(1)}%</td>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{h.cgst.toFixed(2)}</td>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{(h.rate / 2).toFixed(1)}%</td>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{h.sgst.toFixed(2)}</td>
                        <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{(h.cgst + h.sgst).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 800, background: '#f8fafc' }}>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>Total</td>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{subtotal.toFixed(2)}</td>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}></td>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{totalCGST.toFixed(2)}</td>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}></td>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{totalSGST.toFixed(2)}</td>
                      <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '0.8rem' }}>{(totalCGST + totalSGST).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}>Total Amount</p>
                  <h2 style={{ margin: '4px 0', fontSize: '1.75rem', fontWeight: 900, color: '#000' }}>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
                </div>
              </div>
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ maxWidth: '400px' }}>
                  <p style={{ margin: '0', fontSize: '0.7rem', color: '#888' }}>Total Amount (in words)</p>
                  <p style={{ margin: '4px 0', fontSize: '0.85rem', fontWeight: 700 }}>{numberToWords(totalAmount)}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '150px', borderBottom: '1px solid #000', marginBottom: '8px', height: '40px' }}></div>
                  <p style={{ margin: '0', fontSize: '0.7rem', color: '#888' }}>Authorized Signatory</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          {step === 1 ? (
            <>
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setStep(2)}>Preview Invoice</button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>Back to Edit</button>
              <button className="btn btn-primary" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Printer size={18} /> Print Invoice</button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceModal;
