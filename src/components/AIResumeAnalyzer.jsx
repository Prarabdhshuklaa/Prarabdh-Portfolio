import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { analyzeResume } from '../utils/gemini';

function CircularScore({ score }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#00e5ff' : score >= 60 ? '#7b2fff' : '#ef4444';
  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }} style={{ filter: `drop-shadow(0 0 6px ${color}80)` }} />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold" style={{ color, fontFamily: 'Space Grotesk, sans-serif' }}>{score}</div>
        <div className="text-xs text-[#8892b0]">ATS Score</div>
      </div>
    </div>
  );
}

export default function AIResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleAnalyze = async (useDefault) => {
    const text = (useDefault || !resumeText.trim()) ? 'Prarabdh Shukla - Full Stack Developer. Skills: React, Node.js, MongoDB, SAP ABAP. TCS SAP ABAP Developer since Feb 2026. Projects: Lifestyle (MERN), Rakt Bank (Java). Certifications: MERN Stack, DSA, Blockchain.' : resumeText;
    setLoading(true);
    const result = await analyzeResume(text);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <section id="resume-analyzer" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at center, rgba(123,47,255,0.04) 0%, transparent 60%)' }} />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex flex-col items-center text-center mb-12">
          <div className="section-number">06.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily:'Space Grotesk,sans-serif' }}>AI Resume <span className="text-gradient">Analyzer</span></h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">Get AI-powered insights, ATS score, and career recommendations</p>
          <div className="w-12 h-0.5 mt-4" style={{ background:'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {!analysis ? (
            <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2 }} className="glass-card p-8">
              <label htmlFor="resume-text-input" className="block text-sm font-medium text-[#8892b0] mb-3">Paste Resume Text (or use default Prarabdh profile)</label>
              <textarea id="resume-text-input" className="form-input h-40 font-mono text-xs" placeholder="Paste resume text here..." value={resumeText} onChange={e => setResumeText(e.target.value)} />
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button onClick={() => handleAnalyze(false)} disabled={loading} className="btn-primary flex-1 justify-center py-3">
                  {loading ? <><div className="w-4 h-4 border-2 border-[#00e5ff]/30 border-t-[#00e5ff] rounded-full animate-spin" />Analyzing...</> : '🤖 Analyze with AI'}
                </button>
                <button onClick={() => handleAnalyze(true)} disabled={loading} className="btn-secondary flex-1 justify-center py-3">⚡ Quick Analyze (Prarabdh Profile)</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
                {[{icon:'📊',label:'ATS Score'},{icon:'💪',label:'Strengths'},{icon:'🎯',label:'Improvements'},{icon:'🚀',label:'Career Paths'}].map(f => (
                  <div key={f.label} className="text-center"><div className="text-2xl mb-1">{f.icon}</div><div className="text-xs text-[#8892b0]">{f.label}</div></div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
              <div className="glass-card p-8">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <CircularScore score={analysis.atsScore} />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-[#f0f4ff] mb-2" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Resume Analysis Complete</h3>
                    <p className="text-sm text-[#8892b0] leading-relaxed">{analysis.summary}</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[{key:'strengths',icon:'💪',color:'#00e5ff',label:'Strengths',bullet:'✓'},{key:'improvements',icon:'🎯',color:'#7b2fff',label:'Improvements',bullet:'→'},{key:'careerPaths',icon:'🚀',color:'#9c27b0',label:'Career Paths',bullet:'★'}].map(col => (
                  <div key={col.key} className="glass-card p-6">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color:col.color }}><span>{col.icon}</span>{col.label}</h4>
                    <ul className="space-y-3">
                      {(analysis[col.key]||[]).map((s,i) => (
                        <motion.li key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.1 }} className="text-xs text-[#8892b0] flex items-start gap-2">
                          <span className="flex-shrink-0" style={{ color:col.color }}>{col.bullet}</span>{s}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="text-center"><button onClick={() => setAnalysis(null)} className="btn-secondary text-sm">↺ Analyze Another Resume</button></div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
