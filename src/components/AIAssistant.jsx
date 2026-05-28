import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askAboutPortfolio } from '../utils/gemini';
import { suggestedQuestions } from '../utils/data';

function fmtMd(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00e5ff">$1</strong>').replace(/\n/g, '<br/>');
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: Date.now(), role:'model', content:'Hi! I\'m **Prarabdh AI** 👋\n\nAsk me anything about Prarabdh — his skills, projects, SAP MM training, certifications, or how to contact him!' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, loading]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const sendMessage = async text => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg = { id: Date.now(), role:'user', content:trimmed };
    setMessages(prev => [...prev, userMsg]); setInput(''); setLoading(true);
    const history = messages.map(m => ({ role:m.role, content:m.content }));
    try {
      const response = await askAboutPortfolio(trimmed, history);
      setMessages(prev => [...prev, { id: Date.now() + 1, role:'model', content:response }]);
    } catch { setMessages(prev => [...prev, { id: Date.now() + 2, role:'model', content:"Sorry, I couldn't process that. Please try again!" }]); }
    finally { setLoading(false); }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Speech recognition not supported.'); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); recognitionRef.current = r;
    r.lang = 'en-US'; r.interimResults = false;
    r.onresult = e => { setInput(e.results[0][0].transcript); setListening(false); };
    r.onerror = () => setListening(false); r.onend = () => setListening(false);
    r.start(); setListening(true);
  };

  return (
    <div className="chat-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div className="chat-panel mb-4" initial={{ opacity:0,y:20,scale:0.95 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:20,scale:0.95 }} transition={{ type:'spring',damping:20 }}>
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background:'linear-gradient(135deg,#00e5ff,#7b2fff)' }}>🤖</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#f0f4ff]" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Prarabdh AI</div>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" /><span className="text-xs text-[#8892b0]">Always online</span></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#8892b0] hover:text-[#f0f4ff] transition-colors text-lg">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight:'280px' }}>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className={`flex ${msg.role==='user'?'justify-end':'justify-start'}`}>
                  {msg.role==='model' && <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1" style={{ background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.2)' }}>🤖</div>}
                  <div className="max-w-[80%] px-3 py-2 text-xs leading-relaxed"
                    style={msg.role==='user' ? { background:'linear-gradient(135deg,rgba(0,229,255,0.15),rgba(123,47,255,0.15))',border:'1px solid rgba(0,229,255,0.2)',color:'#f0f4ff',borderRadius:'16px 4px 16px 16px' } : { background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',color:'#8892b0',borderRadius:'4px 16px 16px 16px' }}
                    dangerouslySetInnerHTML={{ __html: fmtMd(msg.content) }} />
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.2)' }}>🤖</div>
                  <div className="px-3 py-2 flex items-center gap-1" style={{ background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'4px 16px 16px 16px' }}>
                    {[0,0.2,0.4].map(d => <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" animate={{ scale:[1,1.5,1],opacity:[0.4,1,0.4] }} transition={{ duration:0.8,repeat:Infinity,delay:d }} />)}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-[#8892b0] mb-2 font-mono">Suggested:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.slice(0,3).map(q => (
                    <button key={q} onClick={() => sendMessage(q)} className="text-xs px-2 py-1 rounded-lg transition-all" style={{ background:'rgba(0,229,255,0.06)',border:'1px solid rgba(0,229,255,0.15)',color:'#8892b0' }}>{q}</button>
                  ))}
                </div>
              </div>
            )}
            <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="border-t border-white/5 p-3 flex items-center gap-2">
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about Prarabdh..." disabled={loading} className="flex-1 bg-transparent text-xs text-[#f0f4ff] placeholder-[#8892b0]/50 outline-none" />
              <button type="button" onClick={toggleVoice} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${listening?'bg-red-500/20 text-red-400':'text-[#8892b0] hover:text-[#00e5ff]'}`} title="Voice input">🎤</button>
              <button type="submit" disabled={!input.trim()||loading} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30" style={{ background:'rgba(0,229,255,0.15)',color:'#00e5ff' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="ai-orb" whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }} aria-label="Open AI Assistant">
        <motion.span className="text-2xl relative z-10">{isOpen ? '✕' : '🤖'}</motion.span>
      </motion.button>
    </div>
  );
}
