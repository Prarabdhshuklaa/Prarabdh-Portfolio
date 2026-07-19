import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../utils/data';

// ── Dynamic highlight cards per experience entry ───────────────
const highlights = {
  1: [
    { icon: '🔷', label: 'SAP ABAP',    desc: 'Certified Developer'      },
    { icon: '📄', label: 'Smartforms',  desc: 'Enterprise doc output'    },
    { icon: '💾', label: 'SAP S/4HANA', desc: 'Support & DB upgrades'     },
  ],
  2: [
    { icon: '⚛️',  label: 'Full Stack',   desc: 'React + Node.js'          },
    { icon: '🗄️', label: 'Databases',     desc: 'MongoDB & MySQL'           },
    { icon: '🔄', label: 'Agile / Scrum', desc: 'Sprint-based delivery'     },
  ],
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,145,213,0.04) 0%, transparent 60%)' }} />

      <div className="container-custom" ref={ref}>

        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="section-number">04.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">
            Building scalable applications and delivering exceptional user experiences
          </p>
          <div className="w-12 h-0.5 mt-4" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-5xl mx-auto">

          {/* Center vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.3) 10%, rgba(123,47,255,0.3) 90%, transparent)' }} />

          <div className="flex flex-col gap-0">
            {experience.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 + 0.2, ease: 'easeOut' }}
                  className="relative flex items-center md:grid md:grid-cols-2 gap-0 mb-12"
                >
                  {isLeft ? (
                    <>
                      <div className="md:pr-12 w-full">
                        <ExperienceCard exp={exp} />
                      </div>
                      <div className="hidden md:flex items-center justify-start pl-0 relative">
                        <div className="absolute -left-3 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full border-2 z-10"
                            style={{ background: '#0d0d1a', borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}60` }} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:flex items-center justify-end pr-0 relative">
                        <div className="absolute -right-3 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full border-2 z-10"
                            style={{ background: '#0d0d1a', borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}60` }} />
                        </div>
                      </div>
                      <div className="md:pl-12 w-full">
                        <ExperienceCard exp={exp} />
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Individual Experience Card ─────────────────────────────────
function ExperienceCard({ exp }) {
  return (
    <div
      className="relative rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${exp.color}25`,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Top row: role + logo */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="text-base font-bold text-[#f0f4ff] leading-tight" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>
          {exp.role}
        </h3>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ background: exp.logo?.startsWith('/') ? '#ffffff' : `${exp.color}15`, border: `1px solid ${exp.color}30` }}
        >
          {exp.logo?.startsWith('/') ? (
            <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1.5" />
          ) : (
            <span className="text-sm font-bold" style={{ color: exp.color }}>{exp.logo}</span>
          )}
        </div>
      </div>

      {/* Company name */}
      <p className="text-sm font-semibold mb-3" style={{ color: exp.color }}>
        {exp.company}
      </p>

      {/* Duration + Location badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30`, color: exp.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.color }} />
          {exp.duration}
        </span>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#8892b0' }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {exp.location}
        </span>
        {exp.badge && (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(123,47,255,0.12)', border: '1px solid rgba(123,47,255,0.3)', color: '#a78bfa' }}
          >
            {exp.badge}
          </span>
        )}
      </div>

      {/* Bullet responsibilities */}
      <ul className="space-y-2 mb-4">
        {exp.responsibilities.map((r, ri) => (
          <li key={ri} className="flex items-start gap-2 text-xs text-[#8892b0] leading-relaxed">
            <span className="mt-0.5 flex-shrink-0" style={{ color: exp.color }}>▸</span>
            {r}
          </li>
        ))}
      </ul>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {exp.skills.map(skill => (
          <span
            key={skill}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium"
            style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}20`, color: exp.color }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Highlight mini-cards (only for entries with highlights) */}
      {highlights[exp.id] && (
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {highlights[exp.id].map(item => (
            <div key={item.label} className="text-center p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-[10px] font-bold text-[#f0f4ff] leading-tight">{item.label}</div>
              <div className="text-[9px] text-[#8892b0] mt-0.5 leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
