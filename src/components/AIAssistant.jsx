import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askAboutPortfolio } from '../utils/gemini';
import { suggestedQuestions } from '../utils/data';

// ── Markdown formatter ────────────────────────────────────────
function fmtMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00e5ff">$1</strong>')
    .replace(/\n/g, '<br/>');
}

// ── Client-side topic guard (fallback before API call) ────────
const BLOCKED_KEYWORDS = [
  'prime minister', 'president', 'capital of', 'weather', 'cricket', 'ipl',
  'football', 'movie', 'netflix', 'joke', 'funny', 'python tutorial',
  'write code', 'solve this', 'what is ai', 'machine learning basics',
  'explain react', 'explain javascript', 'explain node', 'leetcode problem',
  'dsa problem', 'algorithm problem', 'who is elon', 'who is modi',
  'who is trump', 'stock price', 'bitcoin', 'crypto', 'recipe', 'news',
  'history of', 'define ', 'what is the', 'who invented', 'when was',
  'population of', 'distance from', 'translate', 'language',
];

const ALLOWED_KEYWORDS = [
  'prarabdh', 'skill', 'tech', 'project', 'lifestyle', 'rakt', 'sap', 'mm',
  'tcs', 'tata', 'experience', 'work', 'job', 'certif', 'education',
  'mern', 'react', 'node', 'mongo', 'express', 'java', 'c++', 'sql',
  'javascript', 'contact', 'email', 'github', 'linkedin', 'career',
  'resume', 'portfolio', 'training', 'erp', 'procurement', 'intern',
  'blockchain', 'full stack', 'backend', 'frontend', 'developer',
  'about him', 'about prarabdh', 'tell me', 'who is he', 'his',
];

const BLOCK_REPLY =
  "I'm designed exclusively to answer questions about Prarabdh Shukla's professional profile, skills, projects, experience, and career journey. Please ask something related to Prarabdh.";

function isOffTopic(q) {
  const ql = q.toLowerCase();
  const hasAllowed = ALLOWED_KEYWORDS.some(k => ql.includes(k));
  if (hasAllowed) return false;
  const hasBlocked = BLOCKED_KEYWORDS.some(k => ql.includes(k));
  if (hasBlocked) return true;
  // Heuristic: very short generic questions with no Prarabdh context
  return false;
}

// ── Typing dots ───────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 0.2, 0.4].map(d => (
        <motion.div
          key={d}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#00e5ff' }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: d }}
        />
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'model',
      content: "👋 Hi! I'm **Ask Prarabdh AI** — your guide to Prarabdh's professional journey.\n\nAsk me about his skills, projects, certifications, SAP MM training, or how to contact him!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { id: Date.now(), role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Client-side block check
    if (isOffTopic(trimmed)) {
      await new Promise(r => setTimeout(r, 400));
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'blocked', content: BLOCK_REPLY }]);
      setLoading(false);
      return;
    }

    const history = messages.map(m => ({ role: m.role === 'blocked' ? 'model' : m.role, content: m.content }));
    try {
      const response = await askAboutPortfolio(trimmed, history);
      // Server-side block: if the response IS the block message, show it as blocked style
      const isBlocked = response.trim().startsWith("I'm designed exclusively");
      setMessages(prev => [...prev, { id: Date.now() + 1, role: isBlocked ? 'blocked' : 'model', content: response }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 2, role: 'model', content: "Sorry, I couldn't process that. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.'); return;
    }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    recognitionRef.current = r;
    r.lang = 'en-US'; r.interimResults = false;
    r.onresult = e => { setInput(e.results[0][0].transcript); setListening(false); };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    r.start(); setListening(true);
  };

  const clearChat = () => {
    setMessages([{ id: 0, role: 'model', content: "👋 Hi! I'm **Ask Prarabdh AI** — your guide to Prarabdh's professional journey.\n\nAsk me about his skills, projects, certifications, SAP MM training, or how to contact him!" }]);
  };

  return (
    <div className="chat-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-panel mb-4"
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.93 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            style={{ width: '340px' }}
          >
            {/* ── Header ── */}
            <div
              className="px-4 py-3 flex items-center gap-3 shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,47,255,0.08))',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 relative"
                style={{ background: 'linear-gradient(135deg, #00e5ff22, #7b2fff22)', border: '1px solid rgba(0,229,255,0.3)' }}
              >
                🤖
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: '#22c55e', borderColor: 'var(--bg-primary, #050510)' }}
                />
              </div>
              {/* Title */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#f0f4ff] truncate" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>
                  Ask Prarabdh AI
                </div>
                <div className="text-xs text-[#8892b0] truncate">Your guide to Prarabdh's journey</div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-[#f0f4ff] transition-colors text-xs"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  🗑
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-[#f0f4ff] transition-colors text-base"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
              style={{ maxHeight: '300px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,229,255,0.15) transparent' }}
            >
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* AI avatar for model/blocked */}
                  {msg.role !== 'user' && (
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 mb-0.5"
                      style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)' }}
                    >
                      🤖
                    </div>
                  )}

                  <div
                    className="max-w-[82%] px-3 py-2 text-xs leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, rgba(0,229,255,0.14), rgba(123,47,255,0.14))',
                            border: '1px solid rgba(0,229,255,0.22)',
                            color: '#f0f4ff',
                            borderRadius: '14px 4px 14px 14px',
                          }
                        : msg.role === 'blocked'
                        ? {
                            background: 'rgba(239,68,68,0.07)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#fca5a5',
                            borderRadius: '4px 14px 14px 14px',
                          }
                        : {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            color: '#8892b0',
                            borderRadius: '4px 14px 14px 14px',
                          }
                    }
                    dangerouslySetInnerHTML={{ __html: fmtMd(msg.content) }}
                  />
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex items-end gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
                    style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)' }}
                  >
                    🤖
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '4px 14px 14px 14px',
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested questions (show when only 1 message) ── */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-xs text-[#8892b0] mt-3 mb-2 font-mono uppercase tracking-wider">Suggested</p>
                <div className="flex flex-col gap-1.5">
                  {suggestedQuestions.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs px-3 py-1.5 rounded-xl transition-all duration-150 hover:border-[rgba(0,229,255,0.3)] hover:text-[#f0f4ff]"
                      style={{
                        background: 'rgba(0,229,255,0.04)',
                        border: '1px solid rgba(0,229,255,0.1)',
                        color: '#8892b0',
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input bar ── */}
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 p-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                disabled={loading}
                className="flex-1 bg-transparent text-xs text-[#f0f4ff] placeholder-[#8892b0]/50 outline-none"
              />
              {/* Voice */}
              <button
                type="button"
                onClick={toggleVoice}
                title="Voice input"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all text-sm ${
                  listening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-[#8892b0] hover:text-[#00e5ff]'
                }`}
              >
                🎤
              </button>
              {/* Send */}
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(123,47,255,0.2))', color: '#00e5ff' }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>

            {/* ── Footer note ── */}
            <div
              className="px-4 pb-2 text-center"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p className="text-[10px] text-[#8892b0]/50 mt-1.5 font-mono">
                Only answers questions about Prarabdh's profile
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating orb button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-orb"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open Ask Prarabdh AI"
      >
        <motion.span className="text-2xl relative z-10">
          {isOpen ? '✕' : '🤖'}
        </motion.span>
      </motion.button>
    </div>
  );
}
