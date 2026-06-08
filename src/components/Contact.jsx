import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../utils/data';

// ── SVG Logos ──────────────────────────────────────────────────
const EmailLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);
const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#f0f4ff">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const LocationLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#7b2fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const contactItems = [
    {
      logo: <EmailLogo />,
      label: 'Email',
      value: personalInfo.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`,
      color: '#00e5ff',
      desc: 'Send me a mail',
    },
    {
      logo: <LinkedInLogo />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/prarabdhshukla',
      href: personalInfo.linkedin,
      color: '#0A66C2',
      desc: 'Connect professionally',
    },
    {
      logo: <GitHubLogo />,
      label: 'GitHub',
      value: 'github.com/Prarabdhshuklaa',
      href: personalInfo.github,
      color: '#f0f4ff',
      desc: 'Explore my code',
    },
    {
      logo: <LocationLogo />,
      label: 'Location',
      value: 'Ahmedabad, Gujarat, India',
      href: 'https://maps.google.com/?q=Ahmedabad',
      color: '#7b2fff',
      desc: 'India 🇮🇳 · IST (UTC+5:30)',
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(0,229,255,0.05) 0%, transparent 60%)' }}
      />

      <div className="container-custom" ref={ref}>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="section-number">06.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk,sans-serif' }}>
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
          <div className="w-12 h-0.5 mt-4" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>

        {/* ── Intro text ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-[#8892b0] leading-relaxed">
            I'm currently open to new opportunities, collaborations, and interesting projects.
            Whether you have a question, a project idea, or just want to say hi — my inbox is always open!
          </p>
        </motion.div>

        {/* ── Contact cards — 2×2 grid centred ── */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group flex items-center gap-5 glass-card p-5 hover:border-[rgba(0,229,255,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon box */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
              >
                {item.logo}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono text-[#8892b0] mb-0.5">{item.label}</div>
                <div className="text-sm font-semibold text-[#f0f4ff] truncate group-hover:text-[#00e5ff] transition-colors">
                  {item.value}
                </div>
                <div className="text-xs text-[#8892b0] mt-0.5">{item.desc}</div>
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 flex-shrink-0 text-[#8892b0] group-hover:text-[#00e5ff] transition-colors"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* ── Location footer note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex justify-center mt-10"
        >
          {/* <div
            className="glass-card px-6 py-4 flex items-center gap-4"
            style={{ borderColor: 'rgba(123,47,255,0.2)', maxWidth: '340px', width: '100%' }}
          >
            <div className="text-3xl">🗺️</div>
            <div>
              <div className="font-bold text-[#f0f4ff] text-sm">Ahmedabad, Gujarat</div>
              <div className="text-xs text-[#8892b0] mt-0.5">India 🇮🇳 · IST (UTC+5:30)</div>
              <div className="text-xs text-[#7b2fff] mt-1">Available for remote work globally</div>
            </div>
          </div> */}
        </motion.div>

      </div>
    </section>
  );
}
