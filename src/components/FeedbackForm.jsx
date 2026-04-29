import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { submitFeedback } from '../utils/firebase';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setStatus('submitting');
    const success = await submitFeedback(text);
    
    if (success) {
      setStatus('success');
      setText('');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
        <CheckCircle color="#10b981" />
        <span style={{ color: '#10b981', fontWeight: 500 }}>Thank you for your feedback!</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '20px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tell us what you think..."
        style={{
          width: '100%', minHeight: '100px', padding: '12px',
          background: 'var(--bg-surface)', border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
          fontFamily: 'inherit', resize: 'vertical', outline: 'none'
        }}
      />
      {status === 'error' && (
        <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>Failed to submit. Check your Firebase config.</span>
      )}
      <button type="submit" className="btn btn-primary" disabled={status === 'submitting' || !text.trim()}>
        {status === 'submitting' ? 'Submitting...' : <><Send size={16} /> Submit Feedback</>}
      </button>
    </form>
  );
};

export default FeedbackForm;
