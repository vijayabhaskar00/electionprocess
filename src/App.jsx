import React from 'react';
import Assistant from './components/Assistant';
import { Vote } from 'lucide-react';

function App() {
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav style={{ 
        padding: '20px 40px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '8px', borderRadius: '12px', display: 'flex'
          }}>
            <Vote color="white" size={24} />
          </div>
          <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}>Elexia</h1>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>Home</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>About</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Resources</span>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="flex-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '60px 24px 20px', gap: '16px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
            Election 2026 Ready
          </div>
          <h1 style={{ fontSize: '3.5rem', maxWidth: '800px', lineHeight: 1.1 }}>
            Navigate the election process with <span className="text-gradient">confidence.</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '8px' }}>
            Your personal, smart assistant for voter registration, key deadlines, and finding your polling location.
          </p>
        </section>

        {/* Assistant Interface */}
        <Assistant />
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', marginTop: '40px' }}>
        <p>© 2026 Elexia Assistant. Built to empower voters.</p>
      </footer>
    </div>
  );
}

export default App;
