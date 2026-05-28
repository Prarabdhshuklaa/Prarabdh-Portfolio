import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../utils/data';

const tabColors = [
  { active: '#00e5ff', glow: 'rgba(0,229,255,0.15)' },
  { active: '#7b2fff', glow: 'rgba(123,47,255,0.15)' },
  { active: '#00e5ff', glow: 'rgba(0,229,255,0.15)' },
  { active: '#7b2fff', glow: 'rgba(123,47,255,0.15)' },
  { active: '#00e5ff', glow: 'rgba(0,229,255,0.15)' },
];

function SkillIcon({ skill, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'w-5 h-5' : 'w-8 h-8';
  if (skill.iconUrl) {
    return (
      <img
        src={skill.iconUrl}
        alt={skill.name}
        className={`${sizeClass} object-contain`}
        style={{
          filter: skill.name === 'Express.js'
            ? 'invert(1) brightness(0.85)'
            : `drop-shadow(0 0 4px ${skill.color}66)`,
        }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  }
  return <span className={size === 'sm' ? 'text-sm' : 'text-2xl'}>{skill.icon}</span>;
}

function SkillBar({ skill, index, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SkillIcon skill={skill} size="sm" />
          <span className="text-sm font-medium text-[#f0f4ff]">{skill.name}</span>
        </div>
        <span className="text-xs font-mono" style={{ color }}>{skill.level}%</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.07, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </motion.div>
  );
}

function SkillCard({ skill, index, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ scale: 1.04, y: -2 }}
      className="glass-card flex flex-col items-center gap-2 py-4 px-3 cursor-default group"
      style={{
        '--hover-border': `${color}44`,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${color}11`,
          border: `1px solid ${color}33`,
        }}
      >
        <SkillIcon skill={skill} size="lg" />
      </div>
      <span className="text-xs font-semibold text-center text-[#f0f4ff] leading-tight">{skill.name}</span>
      <div
        className="w-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const category = skillCategories[activeTab];
  const color = tabColors[activeTab]?.active ?? '#00e5ff';
  const glow = tabColors[activeTab]?.glow ?? 'rgba(0,229,255,0.15)';

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7b2fff, transparent)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00e5ff, transparent)', filter: 'blur(80px)' }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="text-sm font-mono text-[#00e5ff] mb-3 tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>
            02. Skills
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#f0f4ff] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
          <p className="text-[#8892b0] mt-5 max-w-xl text-base leading-relaxed">
            A curated set of tools and technologies I've mastered across full-stack development and enterprise systems.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {skillCategories.map((cat, i) => {
            const isActive = activeTab === i;
            const c = tabColors[i]?.active ?? '#00e5ff';
            return (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                style={{
                  background: isActive ? `${c}18` : 'rgba(255,255,255,0.04)',
                  border: isActive ? `1px solid ${c}55` : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? c : '#8892b0',
                  boxShadow: isActive ? `0 0 20px ${c}22` : 'none',
                }}
              >
                {cat.icon && <span>{cat.icon}</span>}
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `1px solid ${c}33` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* Category header */}
            <div
              className="glass-card mb-8 flex items-center gap-4 p-5"
              style={{ borderColor: `${color}33` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: glow,
                  border: `1px solid ${color}33`,
                }}
              >
                {category.icon}
              </div>
              <div>
                <h3
                  className="font-bold text-[#f0f4ff] text-lg"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {category.label}
                </h3>
                <p className="text-sm text-[#8892b0] mt-0.5">{category.description || `${category.skills.length} skills in this category`}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Skill Bars */}
              <div className="flex flex-col gap-5">
                <h4 className="text-xs font-mono text-[#8892b0] uppercase tracking-widest mb-1">Proficiency</h4>
                {category.skills.filter(s => s.level != null).map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} color={color} />
                ))}
              </div>

              {/* Skill Cards Grid */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-mono text-[#8892b0] uppercase tracking-widest mb-1">Technologies</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {category.skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} color={color} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
