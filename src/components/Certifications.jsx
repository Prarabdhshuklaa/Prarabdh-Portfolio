import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { certifications } from '../utils/data';

function CertModal({ cert, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:'rgba(5,5,16,0.85)',backdropFilter:'blur(12px)' }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        onClick={e => e.target === e.currentTarget && onClose()}>
        <motion.div className="glass-card p-8 w-full max-w-md text-center" style={{ border:`1px solid ${cert.color}30` }}
          initial={{ scale:0.8,opacity:0 }} animate={{ scale:1,opacity:1 }} exit={{ scale:0.8,opacity:0 }}>
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl" style={{ background:`${cert.color}15`,border:`1px solid ${cert.color}30` }}>{cert.icon}</div>
          <div className="text-4xl mb-2">{cert.badge}</div>
          <div className="font-mono text-xs mb-3 uppercase tracking-wider" style={{ color:cert.color }}>Certificate of Completion</div>
          <h3 className="text-xl font-bold text-[#f0f4ff] mb-1" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{cert.title}</h3>
          <p className="text-sm text-[#8892b0] mb-1">{cert.issuer}</p>
          <p className="text-xs font-mono text-[#8892b0] mb-4">{cert.date}</p>
          <p className="text-sm text-[#8892b0] leading-relaxed mb-6">{cert.description}</p>
          <div className="flex gap-3 justify-center">
            <button className="btn-primary text-sm py-2 px-4" style={{ borderColor:cert.color,color:cert.color }}>✓ Verified</button>
            <button onClick={onClose} className="btn-secondary text-sm py-2 px-4">Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at top left, rgba(0,229,255,0.03) 0%, transparent 50%)' }} />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex flex-col items-center text-center mb-12">
          <div className="section-number">05.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Certifi<span className="text-gradient">cations</span></h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">Validated expertise through recognized credentials</p>
          <div className="w-12 h-0.5 mt-4" style={{ background:'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity:0,y:30,scale:0.95 }} animate={inView?{opacity:1,y:0,scale:1}:{}} transition={{ delay:i*0.1 }}
              whileHover={{ y:-6 }} className="cert-card group cursor-pointer" onClick={() => setSelected(cert)} data-cursor-hover>
              {/* Colored top accent bar - absolute positioned for zero overflow */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background:`linear-gradient(90deg, ${cert.color}, ${cert.color}40)` }} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background:`${cert.color}15`,border:`1px solid ${cert.color}25` }}>{cert.icon}</div>
                <span className="text-2xl">{cert.badge}</span>
              </div>
              <h3 className="font-bold text-[#f0f4ff] text-sm mb-1 leading-tight" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{cert.title}</h3>
              <p className="text-xs text-[#8892b0] mb-1">{cert.issuer}</p>
              <p className="text-xs font-mono mb-3" style={{ color:cert.color }}>{cert.date}</p>
              <p className="text-xs text-[#8892b0] leading-relaxed mb-4" style={{ display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{cert.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded" style={{ background:`${cert.color}10`,color:cert.color }}>✓ Verified</span>
                <span className="text-xs text-[#8892b0] group-hover:text-[#00e5ff] transition-colors">View →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
