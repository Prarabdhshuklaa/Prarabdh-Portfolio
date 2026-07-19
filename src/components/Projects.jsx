import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../utils/data';
import AIProjectAnalyzer from './AIProjectAnalyzer';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(123,47,255,0.04) 0%, transparent 60%)' }} />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex flex-col items-center text-center mb-12">
          <div className="section-number">03.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">Real-world applications built with modern tech stacks</p>
          <div className="w-12 h-0.5 mt-4" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }} className="project-card group flex flex-col">
              <div className="p-6 pb-4">
                <div className={`w-full h-36 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <span className="text-7xl select-none group-hover:scale-110 transition-transform duration-500 relative z-10">{project.icon}</span>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-mono font-bold" style={{ background: `${project.color}20`, border: `1px solid ${project.color}40`, color: project.color }}>{project.category}</div>
                </div>
                <h3 className="text-xl font-bold text-[#f0f4ff] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{project.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: project.color }}>{project.subtitle}</p>
                <p className="text-sm text-[#8892b0] leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 rounded text-xs font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892b0' }}>{t}</span>
                  ))}
                </div>
                <ul className="space-y-1 mb-5">
                  {project.features.slice(0, 3).map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#8892b0]">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: project.color }}>▸</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto border-t border-white/5 px-6 py-4 flex items-center gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-[#8892b0] hover:text-[#00e5ff] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ml-auto" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color }}>🤖 AI Analyze</button>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-12">
          <p className="text-[#8892b0] text-sm mb-4">More projects on GitHub</p>
          <a href="https://github.com/Prarabdhshuklaa" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            View GitHub Profile
          </a>
        </motion.div>
      </div>
      {selectedProject && <AIProjectAnalyzer project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
