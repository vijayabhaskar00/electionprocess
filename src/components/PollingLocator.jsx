import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation } from 'lucide-react';

const PollingLocator = () => {
  const [zipcode, setZipcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (zipcode.length < 5) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        name: "Central Community Center",
        address: "123 Main Street, Suite B",
        distance: "1.2 miles away",
        status: "Open on Election Day 7AM - 8PM"
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="glass-card" style={{ padding: '24px', width: '100%', maxWidth: '400px' }}>
      <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MapPin size={20} className="text-gradient" /> Find Polling Place
      </h3>

      {!result ? (
        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Enter your Zip Code"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              style={{
                width: '100%', padding: '12px 12px 12px 40px',
                background: 'var(--bg-surface)', border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Locating...' : 'Search'}
          </button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-focus)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>{result.name}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{result.address}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                <Navigation size={14} /> {result.distance}
              </span>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>
                {result.status}
              </span>
            </div>
          </div>
          <button onClick={() => setResult(null)} className="btn btn-outline" style={{ width: '100%', marginTop: '12px', padding: '8px' }}>
            Search Another Zip Code
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PollingLocator;
