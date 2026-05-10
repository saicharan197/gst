import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, ShieldCheck, Zap, BarChart3, ChevronRight, 
  Smartphone, Monitor, Briefcase, ShoppingBag, Scissors, 
  Truck, Pill, HardHat, Store
} from 'lucide-react';

const Landing = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Digitized Books', value: '100%' },
    { label: 'Fast Stock Rotation', value: '3x' },
    { label: 'On-Time Collections', value: '97%' },
  ];

  const industries = [
    { 
      name: 'Electronics', 
      icon: <Smartphone size={32} />, 
      desc: 'IMEI tracking & warranty management',
      color: '#2563eb'
    },
    { 
      name: 'Pharma', 
      icon: <Pill size={32} />, 
      desc: 'Batch tracking & expiry alerts',
      color: '#10b981'
    },
    { 
      name: 'Hardware', 
      icon: <HardHat size={32} />, 
      desc: 'Bulk weight-based billing & multi-GST',
      color: '#f59e0b'
    },
    { 
      name: 'Kirana/FMCG', 
      icon: <Store size={32} />, 
      desc: 'Fast POS billing with barcode support',
      color: '#7c3aed'
    },
  ];

  return (
    <div className="landing-page" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        padding: '120px 5% 60px',
        background: isDarkMode ? 'radial-gradient(circle at 70% 30%, #1e293b 0%, #020617 100%)' : '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'var(--primary-glow)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: 1, maxWidth: '900px' }}
        >
          <div className="glass" style={{ display: 'inline-flex', padding: '8px 20px', borderRadius: '50px', marginBottom: '24px' }}>
            <Zap size={16} style={{ color: 'var(--primary)', marginRight: '8px' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Professional Billing Software</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '24px',
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <span className="text-gradient">Billing, Inventory</span> <br />& Accounting Software.
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
            Increase business profits by up to <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>36%</span>. 
            Smart features designed for Indian SMEs to scale effortlessly.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={() => navigate('/dashboard')}>
              Book a Free Demo <ChevronRight size={20} />
            </button>
            <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={() => navigate('/dashboard')}>
              Start Free Trial
            </button>
          </div>

          {/* Stats Section */}
          <div style={{ 
            display: 'flex', 
            gap: '40px', 
            justifyContent: 'center', 
            marginTop: '80px',
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4px' }}>{stat.value}</h3>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Multi-Industry Support */}
      <section style={{ 
        padding: '100px 5%',
        background: isDarkMode ? '#020617' : '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
              Built for <span className="text-gradient">Every Industry</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Tailored solutions for your specific business needs.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/dashboard?type=${industry.name}`)}
                className="glass-card"
                style={{ padding: '32px', textAlign: 'left', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              >
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '16px', 
                  background: `${industry.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: industry.color,
                  marginBottom: '24px'
                }}>
                  {industry.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>{industry.name}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{industry.desc}</p>
                
                {/* Subtle highlight effect */}
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  width: '100px', 
                  height: '100px', 
                  background: `radial-gradient(circle at 100% 0%, ${industry.color}15, transparent)`,
                  zIndex: 0 
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <footer style={{ 
        padding: '60px 5%', 
        textAlign: 'center', 
        borderTop: '1px solid var(--glass-border)',
        background: isDarkMode ? '#020617' : '#f8fafc'
      }}>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>© 2026 My BillBook. Your Trusted Billing Solution.</p>
      </footer>
    </div>
  );
};

export default Landing;

