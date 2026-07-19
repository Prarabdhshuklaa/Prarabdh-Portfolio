import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import ParticleBackground from './ParticleBackground';
import { personalInfo } from '../utils/data';

// ── Floating tech badges around the orbit circle ──────────────
const techBadges = [
  { label: 'SAP ABAP', emoji: '🔷', delay: 0.4, pos: { top: '5%', left: '-18%' } },
  { label: 'React', emoji: '⚛️', delay: 0, pos: { top: '5%', right: '-18%' } },
  { label: 'C++', emoji: '➕', delay: 0.8, pos: { bottom: '8%', left: '-18%' } },
  { label: 'Node.js', emoji: '🟢', delay: 1.2, pos: { bottom: '8%', right: '-18%' } },
];

// ── Typing effect hook ─────────────────────────────────────────
function useTypingEffect(texts, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex(i => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  return displayed;
}

// ── Hero Component ─────────────────────────────────────────────
export default function Hero() {
  const typing = useTypingEffect(personalInfo.typingTexts);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid"
      style={{
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(0,229,255,0.04) 0%, var(--bg-primary) 50%), radial-gradient(ellipse at 80% 50%, rgba(123,47,255,0.04) 0%, transparent 50%), var(--bg-primary)',
      }}
    >
      <ParticleBackground />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00e5ff, transparent)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #9c27b0, transparent)', filter: 'blur(80px)' }}
      />

      <div className="container-custom relative z-10 pt-36 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ width: '100%', paddingTop: '3.5rem' }}
            >
              <h1
                className="font-black leading-none w-full"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="block text-[#f0f4ff] mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(52px, 7.5vw, 69px)' }}>
                  Hi, I'm
                </span>
                <span className="block text-gradient leading-tight" style={{ fontSize: 'clamp(52px, 7.5vw, 69px)' }}>
                  Prarabdh Shukla
                </span>
              </h1>
            </motion.div>

            {/* Typing subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-8 flex items-center"
            >
              <span className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--fg-secondary)' }}>
                <span style={{ color: 'var(--fg-primary)' }}>{typing}</span>
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-lg leading-relaxed"
              style={{ color: 'var(--fg-secondary)' }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              {[
                { icon: 'github', url: personalInfo.github, label: 'GitHub' },
                { icon: 'linkedin', url: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: 'email', url: `mailto:${personalInfo.email}`, label: 'Email' },
              ].map(({ icon, url, label }) => (
                <a
                  key={icon}
                  href={url}
                  target={icon !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--fg-secondary)',
                  }}
                >
                  {icon === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {icon === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {icon === 'email' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="/resume.pdf" download className="btn-primary text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <Link to="contact" smooth duration={600} offset={-70}>
                <button className="btn-secondary text-base w-full sm:w-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Me
                </button>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — orbit visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              {/* Outer orbit ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed animate-spin-slow"
                style={{ borderColor: 'rgba(0,229,255,0.2)' }}
              />
              {/* Inner orbit ring */}
              <div
                className="absolute inset-4 rounded-full border animate-spin-slow"
                style={{
                  borderColor: 'rgba(123,47,255,0.15)',
                  animationDirection: 'reverse',
                  animationDuration: '15s',
                }}
              />

              {/* Centre avatar */}
              <div
                className="absolute inset-8 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(123,47,255,0.1))',
                  border: '2px solid rgba(0,229,255,0.2)',
                }}
              >
                <div className="text-8xl select-none">
                  {String.fromCodePoint(0x1f468, 0x200d, 0x1f4bb)}
                </div>
              </div>

              {/* Neon pulse */}
              <div
                className="absolute inset-8 rounded-full opacity-20 animate-pulse-neon"
                style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.3), transparent)' }}
              />

              {/* Floating tech badges */}
              {techBadges.map(badge => (
                <motion.div
                  key={badge.label}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + badge.delay * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: badge.delay,
                  }}
                  className="absolute glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
                  style={badge.pos}
                >
                  <span>{badge.emoji}</span>
                  <span style={{ color: 'var(--fg-primary)' }}>{badge.label}</span>
                </motion.div>
              ))}

              {/* "Available" pill */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid rgba(0,229,255,0.3)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                <span style={{ color: 'var(--fg-primary)' }}>Available for Opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--fg-secondary)' }}>
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
            style={{ borderColor: 'rgba(136,146,176,0.3)' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-[#00e5ff]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
