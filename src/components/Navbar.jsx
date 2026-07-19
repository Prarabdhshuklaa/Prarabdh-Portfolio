import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { navLinks } from '../utils/data';
import { useTheme } from '../utils/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'}`}
      >
        <nav className="container-custom flex items-center justify-between h-16">
          <Link to="hero" smooth duration={600} className="group flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg,#00e5ff20,#7b2fff20)', border: '1px solid rgba(0,229,255,0.3)', fontFamily: 'Space Grotesk,sans-serif', color: '#00e5ff' }}>
              PS
            </div>
            <span className="font-bold tracking-tight text-lg group-hover:text-[#00e5ff] transition-colors" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>
              Prarabdh
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} smooth duration={600} offset={-70}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeSection===link.href ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.08)]' : 'text-[#8892b0] hover:text-[#f0f4ff] hover:bg-white/5'}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.85 }}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: theme === 'dark' ? 'rgba(255,229,0,0.08)' : 'rgba(0,100,200,0.08)',
                border: theme === 'dark' ? '1px solid rgba(255,229,0,0.25)' : '1px solid rgba(0,100,200,0.25)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    className="w-4.5 h-4.5"
                    style={{ width: 18, height: 18, color: '#ffd700' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="5" strokeWidth={2} />
                    <path strokeWidth={2} strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{ width: 18, height: 18, color: '#0070c8' }}
                    fill="currentColor" viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            <a href="/resume.pdf" download className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Resume
            </a>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-white/5 border border-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
            >
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="mobile-menu md:hidden z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.07 }}>
                <Link to={link.href} smooth duration={600} offset={-70} onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold text-[#f0f4ff] hover:text-[#00e5ff] transition-colors cursor-pointer" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a href="/resume.pdf" download className="btn-primary mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length*0.07 }} onClick={() => setMobileOpen(false)}>Download Resume</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
