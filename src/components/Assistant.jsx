import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Volume2, VolumeX } from 'lucide-react';
import { chatLogic } from '../utils/logicEngine';
import { INITIAL_STATE, SENDER, COMPONENTS, ARIA } from '../constants';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import OptionButton from './OptionButton';
import Timeline from './Timeline';
import PollingLocator from './PollingLocator';
import VotingMethods from './VotingMethods';
import FeedbackForm from './FeedbackForm';

const Assistant = () => {
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const chatContainerRef = useRef(null);

  const speakText = useCallback((text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const addBotMessage = useCallback((stateKey) => {
    setIsTyping(true);
    setTimeout(() => {
      const stateData = chatLogic[stateKey];
      if (!stateData) return;

      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          sender: SENDER.BOT,
          text: stateData.message,
          component: stateData.component,
          options: stateData.options,
        },
      ]);
      setIsTyping(false);
      speakText(stateData.message);
    }, 800);
  }, [speakText]);

  useEffect(() => {
    addBotMessage(INITIAL_STATE);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (history.length > 1 || (isTyping && history.length > 0)) {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history, isTyping]);

  const handleOptionClick = useCallback((option) => {
    setHistory((prev) => {
      const updated = [...prev];
      if (updated.length > 0) updated[updated.length - 1] = { ...updated[updated.length - 1], options: null };
      return [
        ...updated,
        { id: `${Date.now()}-user`, sender: SENDER.USER, text: option.label },
      ];
    });
    addBotMessage(option.nextState);
  }, [addBotMessage]);

  const toggleTts = () => {
    setTtsEnabled((prev) => {
      if (prev && window.speechSynthesis) window.speechSynthesis.cancel();
      return !prev;
    });
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <section
        className="glass-panel"
        style={{ maxWidth: '800px', margin: '0 auto', height: '620px', display: 'flex', flexDirection: 'column' }}
        aria-label={ARIA.CHAT_LABEL}
      >
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '50%' }} aria-hidden="true">
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
            aria-label={ttsEnabled ? ARIA.TTS_DISABLE : ARIA.TTS_ENABLE}
            aria-pressed={ttsEnabled}
          >
            {ttsEnabled
              ? <Volume2 size={18} className="text-gradient" aria-hidden="true" />
              : <VolumeX size={18} color="var(--text-muted)" aria-hidden="true" />
            }
          </button>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          role="log"
          aria-live="polite"
          aria-label={ARIA.CHAT_LABEL}
          style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <AnimatePresence>
            {history.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === SENDER.USER ? 'flex-end' : 'flex-start',
                  gap: '8px',
                }}
              >
                <MessageBubble sender={msg.sender} text={msg.text} />

                {/* Dynamic Component Rendering */}
                {msg.component === COMPONENTS.TIMELINE && <div style={{ marginTop: '10px' }}><Timeline /></div>}
                {msg.component === COMPONENTS.POLLING_LOCATOR && <div style={{ marginTop: '10px' }}><PollingLocator /></div>}
                {msg.component === COMPONENTS.VOTING_METHODS && <div style={{ marginTop: '10px' }}><VotingMethods /></div>}
                {msg.component === COMPONENTS.FEEDBACK_FORM && <div style={{ marginTop: '10px' }}><FeedbackForm /></div>}

                {/* Option Buttons */}
                {msg.options && msg.sender === SENDER.BOT && (
                  <div
                    role="group"
                    aria-label="Response options"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}
                  >
                    {msg.options.map((opt, idx) => (
                      <OptionButton
                        key={opt.nextState}
                        label={opt.label}
                        index={idx}
                        onClick={() => handleOptionClick(opt)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}
        </div>
      </section>
    </div>
  );
};

export default Assistant;
