import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { certifications } from '../utils/data';

function CertModal({ cert, onClose }) {
  const [viewing, setViewing] = useState(false);
  const [fileError, setFileError] = useState(false);
  const isPdf = cert.certificateUrl?.endsWith('.pdf');
  const isImage = cert.certificateUrl && /\.(png|jpg|jpeg|webp|svg)$/i.test(cert.certificateUrl);

  useEffect(() => {
    setViewing(false);
    setFileError(false);
  }, [cert]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') { viewing ? setViewing(false) : onClose(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, viewing]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        style={{ background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(14px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => e.target === e.currentTarget && (viewing ? setViewing(false) : onClose())}
      >
        <motion.div
          className="glass-card w-full text-center overflow-hidden"
          style={{
            border: `1px solid ${cert.color}40`,
            maxWidth: viewing ? '900px' : '420px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
          layout
        >
          {/* Header — always visible */}
          <div className="p-6 pb-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
                  {cert.icon}
                </div>
                <div className="text-left">
                  <h3 id="cert-modal-title" className="font-bold text-[#f0f4ff] text-sm leading-tight" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>{cert.title}</h3>
                  <p className="text-xs text-[#8892b0]">{cert.issuer} · <span style={{ color: cert.color }}>{cert.date}</span></p>
                </div>
              </div>
              <button
                onClick={viewing ? () => setViewing(false) : onClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#8892b0] hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {viewing ? '←' : '✕'}
              </button>
            </div>
            {/* Divider */}
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${cert.color}40, transparent)` }} />
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto">
            {!viewing ? (
              /* — Info View — */
              <div className="px-6 pb-6">
                <div className="text-5xl mb-3">{cert.badge}</div>
                <div className="font-mono text-xs mb-4 uppercase tracking-widest" style={{ color: cert.color }}>
                  Certificate of Completion
                </div>
                <p className="text-sm text-[#8892b0] leading-relaxed mb-6">{cert.description}</p>

                <div className="flex gap-3 justify-center flex-wrap">
                  {/* View Certificate */}
                  {cert.certificateUrl && (
                    <button
                      onClick={() => { setFileError(false); setViewing(true); }}
                      className="flex items-center gap-2 text-sm font-semibold py-2 px-5 rounded-xl transition-all duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${cert.color}22, ${cert.color}10)`,
                        border: `1px solid ${cert.color}50`,
                        color: cert.color,
                      }}
                    >
                      <span>📄</span> View Certificate
                    </button>
                  )}
                  {/* Download */}
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      download
                      className="flex items-center gap-2 text-sm font-semibold py-2 px-5 rounded-xl transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#8892b0',
                      }}
                    >
                      <span>⬇️</span> Download
                    </a>
                  )}
                  {/* Verified badge */}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl"
                    style={{ background: `${cert.color}10`, color: cert.color, border: `1px solid ${cert.color}25` }}>
                    ✓ Verified
                  </span>
                </div>
              </div>
            ) : (
              /* — Certificate Viewer — */
              <div className="px-4 pb-4">
                {fileError ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="text-5xl">📭</div>
                    <p className="text-[#8892b0] text-sm text-center max-w-xs">
                      Certificate file not uploaded yet.<br />
                      Place your file at:
                    </p>
                    <code className="text-xs px-3 py-2 rounded-lg" style={{ background: `${cert.color}10`, color: cert.color }}>
                      public{cert.certificateUrl}
                    </code>
                    <button onClick={() => setViewing(false)} className="text-xs text-[#8892b0] hover:text-white mt-2 underline underline-offset-2 transition-colors">
                      ← Go back
                    </button>
                  </div>
                ) : isPdf ? (
                  <iframe
                    src={cert.certificateUrl}
                    title={cert.title}
                    className="w-full rounded-xl"
                    style={{ height: '60vh', border: `1px solid ${cert.color}20`, background: '#0a0a1a' }}
                    onError={() => setFileError(true)}
                  />
                ) : isImage ? (
                  <img
                    src={cert.certificateUrl}
                    alt={cert.title}
                    className="w-full rounded-xl object-contain"
                    style={{ maxHeight: '60vh', border: `1px solid ${cert.color}20` }}
                    onError={() => setFileError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center py-12 gap-3">
                    <div className="text-4xl">❓</div>
                    <p className="text-[#8892b0] text-sm">Unsupported file type.</p>
                  </div>
                )}
              </div>
            )}
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
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(0,229,255,0.03) 0%, transparent 50%)' }} />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex flex-col items-center text-center mb-12">
          <div className="section-number">05.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>Certifi<span className="text-gradient">cations</span></h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">Validated expertise through recognized credentials</p>
          <div className="w-12 h-0.5 mt-4" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }} className="cert-card group cursor-pointer" onClick={() => setSelected(cert)} data-cursor-hover>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}40)` }} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}25` }}>{cert.icon}</div>
                <span className="text-2xl">{cert.badge}</span>
              </div>
              <h3 className="font-bold text-[#f0f4ff] text-sm mb-1 leading-tight" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>{cert.title}</h3>
              <p className="text-xs text-[#8892b0] mb-1">{cert.issuer}</p>
              <p className="text-xs font-mono mb-3" style={{ color: cert.color }}>{cert.date}</p>
              <p className="text-xs text-[#8892b0] leading-relaxed mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{cert.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded" style={{ background: `${cert.color}10`, color: cert.color }}>✓ Verified</span>
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
