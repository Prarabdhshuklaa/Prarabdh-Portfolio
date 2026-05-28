import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-scroll';
import { personalInfo, stats } from '../utils/data';

const timeline = [
  {
    year: '2021',
    title: 'Started B.Tech Journey',
    subtitle: 'Computer Science & Engineering',
    desc: 'Enrolled at a top engineering college in Gujarat, diving deep into data structures, algorithms, and the foundations of software engineering.',
    color: '#00e5ff',
    icon: '🎓',
  },
  {
    year: '2022',
    title: 'First Full Stack Project',
    subtitle: 'MERN Stack Development',
    desc: 'Built my first complete web application using MongoDB, Express, React, and Node.js — a task management system with real-time updates.',
    color: '#7b2fff',
    icon: '💻',
  },
  {
    year: '2023',
    title: 'Open Source Contributions',
    subtitle: 'Community & Collaboration',
    desc: 'Contributed to multiple open source projects on GitHub, sharpening skills in Git workflows, code reviews, and collaborative development.',
    color: '#00e5ff',
    icon: '🌐',
  },
  {
    year: '2024',
    title: 'Advanced Projects & Internships',
    subtitle: 'Real-world Experience',
    desc: 'Developed scalable REST APIs, integrated third-party services, and worked on production-grade applications with teams across India.',
    color: '#7b2fff',
    icon: '🚀',
  },
  {
    year: '2025',
    title: 'Graduated & Joined TCS',
    subtitle: 'Professional Career Begins',
    desc: 'Completed B.Tech with distinction and joined Tata Consultancy Services as a Systems Engineer, one of India\'s largest IT conglomerates.',
    color: '#00e5ff',
    icon: '🏢',
  },
  {
    year: '2026',
    title: 'SAP MM Trainee @ TCS',
    subtitle: 'Enterprise ERP Expertise',
    desc: 'Undergoing specialized SAP Materials Management training at TCS since February 2026, bridging full-stack development with enterprise ERP systems.',
    color: '#7b2fff',
    icon: '⚡',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="glass-card flex flex-col items-center text-center p-6 gap-3 group hover:scale-105 transition-transform"
    >
      <div
        className="text-3xl mb-1"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.5))' }}
      >
        {stat.icon}
      </div>
      <div
        className="text-3xl font-bold text-gradient"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {stat.value}
      </div>
      <div className="text-sm text-[#8892b0] leading-snug">{stat.label}</div>
    </motion.div>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-4 group"
    >
      {/* Left: year + icon */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 z-10"
          style={{
            background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)`,
            border: `2px solid ${item.color}44`,
            boxShadow: `0 0 16px ${item.color}22`,
          }}
        >
          {item.icon}
        </div>
        {index < timeline.length - 1 && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: `linear-gradient(180deg, ${item.color}44, transparent)` }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-8 flex-1">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded"
            style={{
              background: `${item.color}18`,
              color: item.color,
              border: `1px solid ${item.color}33`,
            }}
          >
            {item.year}
          </span>
          <span className="text-xs text-[#8892b0] font-mono">{item.subtitle}</span>
        </div>
        <h4
          className="font-semibold text-[#f0f4ff] mb-1.5 group-hover:text-[#00e5ff] transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {item.title}
        </h4>
        <p className="text-sm text-[#8892b0] leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #00e5ff, transparent)', filter: 'blur(60px)' }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span
            className="text-sm font-mono text-[#00e5ff] mb-3 tracking-widest uppercase"
            style={{ letterSpacing: '0.2em' }}
          >
            01. About Me
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#f0f4ff] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Who I <span className="text-gradient">Am</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
          {/* Bio */}
          <div className="flex flex-col gap-6">
            {[
              personalInfo.bio1 || `I'm a passionate Full Stack Developer with a strong foundation in the MERN stack and a growing expertise in enterprise SAP systems. Based in Ahmedabad, Gujarat, I bridge the gap between modern web technologies and large-scale business solutions.`,
              personalInfo.bio2 || `Currently undergoing specialized SAP Materials Management (MM) training at Tata Consultancy Services since February 2026, I bring a unique combination of full-stack development skills and enterprise ERP knowledge to every project I work on.`,
              personalInfo.bio3 || `When I'm not coding, I'm exploring the latest in web technologies, contributing to open source projects, or learning about enterprise systems that power Fortune 500 companies around the world.`,
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="text-[#8892b0] leading-relaxed text-base"
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
              <a href="/resume.pdf" download className="btn-primary text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <Link to="contact" smooth duration={600} offset={-70}>
                <button className="btn-secondary text-sm w-full sm:w-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Let's Talk
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-sm font-mono text-[#7b2fff] mb-2 tracking-widest uppercase">Journey</span>
            <h3
              className="text-2xl sm:text-3xl font-bold text-[#f0f4ff]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              My Developer <span className="text-gradient">Story</span>
            </h3>
          </div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
