import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

const events = [
  { date: 'Oct 7', title: 'Voter Registration Deadline', status: 'past' },
  { date: 'Oct 20', title: 'Early Voting Begins', status: 'current' },
  { date: 'Nov 1', title: 'Mail-in Ballot Request Deadline', status: 'upcoming' },
  { date: 'Nov 5', title: 'Election Day', status: 'upcoming' }
];

const Timeline = () => {
  return (
    <div className="glass-card" style={{ padding: '24px', width: '100%', maxWidth: '400px' }}>
      <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calendar size={20} className="text-gradient" /> Key Dates
      </h3>
      
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px',
          background: 'var(--border-light)'
        }}></div>

        {events.map((evt, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ position: 'relative', marginBottom: idx === events.length - 1 ? '0' : '20px' }}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute', left: '-20px', top: '4px', width: '16px', height: '16px',
              borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid',
              borderColor: evt.status === 'past' ? 'var(--text-muted)' : 
                          evt.status === 'current' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: evt.status === 'current' ? '0 0 10px var(--primary-glow)' : 'none',
              zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {evt.status === 'past' && <CheckCircle2 size={12} color="var(--text-muted)" />}
            </div>

            <div style={{
              color: evt.status === 'past' ? 'var(--text-muted)' : 'var(--text-primary)',
              opacity: evt.status === 'upcoming' ? 0.8 : 1
            }}>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{evt.date}</div>
              <div style={{ fontSize: '0.95rem' }}>{evt.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
