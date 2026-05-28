import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { personalInfo, navLinks } from '../utils/data';

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden pt-0 pb-8" style={{ background: 'linear-gradient(180deg, #050510, #030308)' }}>
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" style={{ fill: 'rgba(0,229,255,0.04)' }} />
        </svg>
      </div>
      <div className="container-custom">
        <div className="grid sm:grid-cols-3 gap-8 py-10 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: 'linear-gradient(135deg,rgba(0,229,255,0.15),rgba(123,47,255,0.15))', border: '1px solid rgba(0,229,255,0.25)', color: '#00e5ff', fontFamily: 'Space Grotesk,sans-serif' }}>PS</div>
              <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>Prarabdh<span style={{ color: '#00e5ff' }}>.</span></span>
            </div>
            <p className="text-sm text-[#8892b0] leading-relaxed max-w-xs">Full Stack Developer & SAP MM Trainee at TCS. Building scalable solutions with modern tech and enterprise expertise.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f0f4ff] mb-4 font-mono uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}><Link to={link.href} smooth duration={600} offset={-70} className="text-sm text-[#8892b0] hover:text-[#00e5ff] transition-colors cursor-pointer">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f0f4ff] mb-4 font-mono uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[{href:personalInfo.github,icon:'github',color:'#f0f4ff'},{href:personalInfo.linkedin,icon:'linkedin',color:'#0A66C2'},{href:`mailto:${personalInfo.email}`,icon:'email',color:'#00e5ff'}].map(({href,icon,color}) => (
                <a key={icon} href={href} target={icon!=='email'?'_blank':undefined} rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background:`${color}15`, border:`1px solid ${color}25`, color }}>
                  {icon==='github' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>}
                  {icon==='linkedin' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                  {icon==='email' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                </a>
              ))}
            </div>
            <p className="text-xs text-[#8892b0]">📍 Ahmedabad, Gujarat, India</p>
            <p className="text-xs text-[#8892b0] mt-1">Open to opportunities globally 🌏</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
          <p className="text-xs text-[#8892b0] text-center sm:text-left">
            <span className="text-gradient font-semibold">Designed & Developed</span> by Prarabdh Shukla
            <span className="mx-2 text-[#8892b0]/40">·</span>
            <span className="font-mono">© {year}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8892b0] font-mono">Built with React + Tailwind + AI</span>
            <button onClick={scrollToTop} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-[rgba(0,229,255,0.08)]" style={{ border:'1px solid rgba(0,229,255,0.2)', color:'#00e5ff' }} aria-label="Back to top">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
