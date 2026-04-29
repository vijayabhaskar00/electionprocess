import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { chatLogic, INITIAL_STATE } from '../utils/logicEngine';
import Timeline from './Timeline';
import PollingLocator from './PollingLocator';
import VotingMethods from './VotingMethods';

const Assistant = () => {
  const [history, setHistory] = useState([]);
  const [currentState, setCurrentState] = useState(INITIAL_STATE);
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const chatContainerRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    addBotMessage(INITIAL_STATE);
  }, []);

  useEffect(() => {
    if (history.length > 1 || (isTyping && history.length > 0)) {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [history, isTyping]);

  const speakText = (text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const addBotMessage = (stateKey) => {
    setIsTyping(true);
    setTimeout(() => {
      const stateData = chatLogic[stateKey];
      setHistory(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        text: stateData.message,
        component: stateData.component,
        options: stateData.options
      }]);
      setIsTyping(false);
      speakText(stateData.message);
    }, 800); // Simulate typing delay
  };

  const handleOptionClick = (option) => {
    // Add user message
    setHistory(prev => {
      const newHistory = [...prev];
      if (newHistory.length > 0) {
        newHistory[newHistory.length - 1].options = null;
      }
      return [...newHistory, {
        id: Date.now() + 1,
        sender: 'user',
        text: option.label
      }];
    });

    setCurrentState(option.nextState);
    addBotMessage(option.nextState);
  };

  const toggleTts = () => {
    setTtsEnabled(!ttsEnabled);
    if (ttsEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', height: '600px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '50%' }}>
              <Bot size={24} color="var(--primary)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>Elexia Assistant</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Your smart voting guide</p>
            </div>
          </div>
          
          <button 
            onClick={toggleTts}
            className="btn btn-outline" 
            style={{ padding: '8px', borderRadius: '50%' }}
            title={ttsEnabled ? "Mute Voice" : "Enable Voice"}
          >
            {ttsEnabled ? <Volume2 size={18} className="text-gradient" /> : <VolumeX size={18} color="var(--text-muted)" />}
          </button>
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AnimatePresence>
            {history.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    flexShrink: 0
                  }}>
                    {msg.sender === 'user' ? <User size={18} color="var(--primary)" /> : <Bot size={18} color="var(--text-primary)" />}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%' }}>
                    <div className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`} style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.text}
                    </div>

                    {/* Render Component if specified */}
                    {msg.component === 'Timeline' && (
                      <div style={{ marginTop: '10px' }}><Timeline /></div>
                    )}
                    {msg.component === 'PollingLocator' && (
                      <div style={{ marginTop: '10px' }}><PollingLocator /></div>
                    )}
                    {msg.component === 'VotingMethods' && (
                      <div style={{ marginTop: '10px' }}><VotingMethods /></div>
                    )}

                    {/* Render Options */}
                    {msg.options && msg.sender === 'bot' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                        {msg.options.map((opt, idx) => (
                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            key={idx}
                            className="btn btn-outline"
                            style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                            onClick={() => handleOptionClick(opt)}
                          >
                            {opt.label} <ChevronRight size={14} />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)' }}>
                  <Bot size={18} color="var(--text-primary)" />
                </div>
                <div className="message-bubble message-bot" style={{ display: 'flex', gap: '4px' }}>
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}>•</motion.span>
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}>•</motion.span>
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}>•</motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
