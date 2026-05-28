import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../utils/data';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center left, rgba(0,145,213,0.04) 0%, transparent 60%)' }} />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex flex-col items-center text-center mb-16">
          <div className="section-number">04.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Work <span className="text-gradient">Experience</span></h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">Professional journey and corporate exposure</p>
          <div className="w-12 h-0.5 mt-4" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>
        {experience.map((exp, i) => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i*0.15+0.2 }} className="max-w-4xl mx-auto">
            <div className="glass-card p-8" style={{ borderColor: `${exp.color}20` }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0" style={{ background:`${exp.color}15`, border:`1px solid ${exp.color}30`, color:exp.color, fontFamily:'Space Grotesk,sans-serif' }}>{exp.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f0f4ff]" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{exp.company}</h3>
                    <p className="text-sm font-medium" style={{ color:exp.color }}>{exp.role}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background:`${exp.color}15`, border:`1px solid ${exp.color}30`, color:exp.color }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:exp.color }} />{exp.type}
                  </span>
                  <div className="text-xs font-mono text-[#8892b0]">{exp.duration}</div>
                  <div className="text-xs text-[#8892b0] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>{exp.location}
                  </div>
                </div>
              </div>
              <p className="text-[#8892b0] text-sm leading-relaxed mb-6 border-l-2 pl-4" style={{ borderColor:`${exp.color}40` }}>{exp.description}</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {exp.responsibilities.map((r,ri) => (
                  <motion.div key={ri} initial={{ opacity:0, x:-10 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.4+ri*0.08 }} className="flex items-start gap-2 text-xs text-[#8892b0]">
                    <span className="flex-shrink-0 mt-0.5 text-sm" style={{ color:exp.color }}>▸</span>{r}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-xs font-mono text-[#8892b0] mb-3 uppercase tracking-wider">Skills gained</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background:`${exp.color}10`, border:`1px solid ${exp.color}25`, color:exp.color }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.6 }} className="grid sm:grid-cols-3 gap-4 mt-6">
              {[{icon:'🔷',label:'SAP MM Module',desc:'Materials Management'},{icon:'🏭',label:'Procurement',desc:'End-to-end lifecycle'},{icon:'📊',label:'ERP System',desc:'Enterprise solutions'}].map(item => (
                <div key={item.label} className="glass-card p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs font-bold text-[#f0f4ff]">{item.label}</div>
                  <div className="text-xs text-[#8892b0] mt-0.5">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
