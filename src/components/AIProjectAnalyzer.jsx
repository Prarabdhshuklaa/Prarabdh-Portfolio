import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeProject } from '../utils/gemini';

function formatMd(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00e5ff">$1</strong>').replace(/\n/g, '<br/>');
}

export default function AIProjectAnalyzer({ project, onClose }) {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(true);
  const overlayRef = useRef(null);

  useEffect(() => {
    analyzeProject(project).then(r => { setAnalysis(r); setLoading(false); });
  }, [project]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-analyzer-title"
        style={{ background: 'rgba(5,5,16,0.8)', backdropFilter: 'blur(10px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => e.target === overlayRef.current && onClose()}>
        <motion.div className="glass-card w-full max-w-2xl max-h-[85vh] flex flex-col" style={{ border: `1px solid ${project.color}30` }}
          initial={{ scale: 0.85, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', damping: 20 }}>
          <div className="flex items-center gap-4 p-6 border-b border-white/5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>{project.icon}</div>
            <div className="flex-1">
              <div className="text-xs font-mono text-[#00e5ff] mb-0.5">🤖 AI Analysis</div>
              <h3 id="project-analyzer-title" className="font-bold text-[#f0f4ff]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{project.title}</h3>
              <p className="text-xs text-[#8892b0]">{project.subtitle}</p>
            </div>
            <button onClick={onClose} aria-label="Close dialog" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-[#f0f4ff] hover:bg-white/5 transition-all flex-shrink-0">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff]/20 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-2 border-[#7b2fff]/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
                </div>
                <div className="text-sm text-[#8892b0] text-center font-mono">Analyzing project architecture...<br/><span className="text-xs opacity-60">Powered by Gemini AI</span></div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-[#8892b0] leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: formatMd(analysis) }} />
            )}
          </div>
          <div className="border-t border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#8892b0] font-mono"><span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />AI-powered analysis</div>
            <button onClick={onClose} className="btn-secondary text-xs py-2 px-4">Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
