import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';

const VoiceAssistant = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastSpeech, setLastSpeech] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setLastSpeech(transcript);
      processCommand(transcript);
    };

    recognition.start();
  };

  const processCommand = (text) => {
    const cmd = text.toLowerCase();
    if (cmd.includes('add')) {
        onCommand({ type: 'ADD_ITEM', value: text });
    } else if (cmd.includes('generate') || cmd.includes('print')) {
        onCommand({ type: 'GENERATE_BILL' });
    } else if (cmd.includes('clear')) {
        onCommand({ type: 'CLEAR_BILL' });
    }
  };

  if (!isSupported) return null;

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100 }}>
      <AnimatePresence>
        {lastSpeech && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel"
            style={{ position: 'absolute', bottom: '80px', right: 0, padding: '12px 20px', whiteSpace: 'nowrap', border: '1px solid var(--primary)' }}
          >
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>"{lastSpeech}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startListening}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: isListening ? 'var(--error)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          position: 'relative'
        }}
      >
        {isListening ? (
          <>
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--error)' }}
            />
            <MicOff color="white" />
          </>
        ) : (
          <Mic color="white" />
        )}
      </motion.button>
      
      <div style={{ marginTop: '8px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {isListening ? 'Listening...' : 'Voice Assistant'}
        </p>
      </div>
    </div>
  );
};

export default VoiceAssistant;
