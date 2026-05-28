import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../utils/data';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault(); setStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success'); setForm({ name:'',email:'',subject:'',message:'' });
    setTimeout(() => setStatus(null), 4000);
  };

  const contactItems = [
    { icon:'📧', label:'Email', value:personalInfo.email, href:`mailto:${personalInfo.email}`, color:'#00e5ff' },
    { icon:'💼', label:'LinkedIn', value:'linkedin.com/in/prarabdh-shukla', href:personalInfo.linkedin, color:'#0A66C2' },
    { icon:'🐙', label:'GitHub', value:'github.com/prarabdhshukla', href:personalInfo.github, color:'#f0f4ff' },
    { icon:'📍', label:'Location', value:'Ahmedabad, Gujarat, India', href:'https://maps.google.com/?q=Ahmedabad', color:'#7b2fff' },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at bottom, rgba(0,229,255,0.04) 0%, transparent 60%)' }} />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity:0,y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex flex-col items-center text-center mb-16">
          <div className="section-number">07.</div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Get In <span className="text-gradient">Touch</span></h2>
          <p className="text-[#8892b0] mt-4 max-w-xl">Have a project in mind or want to collaborate? Let's connect!</p>
          <div className="w-12 h-0.5 mt-4" style={{ background:'linear-gradient(90deg, #00e5ff, #7b2fff)' }} />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.2 }} className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#f0f4ff] mb-3" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Let's Build Something <span className="text-gradient">Amazing</span></h3>
              <p className="text-[#8892b0] leading-relaxed text-sm">I'm currently open to new opportunities, collaborations, and interesting projects. Whether you have a question, a project idea, or just want to say hi — my inbox is always open!</p>
            </div>
            <div className="space-y-3">
              {contactItems.map((item,i) => (
                <motion.a key={item.label} href={item.href} target={item.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                  initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3+i*0.08 }}
                  className="flex items-center gap-4 glass-card p-4 group hover:border-[rgba(0,229,255,0.2)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background:`${item.color}15`,border:`1px solid ${item.color}25` }}>{item.icon}</div>
                  <div>
                    <div className="text-xs font-mono text-[#8892b0]">{item.label}</div>
                    <div className="text-sm font-medium text-[#f0f4ff] group-hover:text-[#00e5ff] transition-colors">{item.value}</div>
                  </div>
                  <svg className="w-4 h-4 text-[#8892b0] ml-auto group-hover:text-[#00e5ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </motion.a>
              ))}
            </div>
            <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.7 }} className="glass-card p-6 flex items-center gap-4" style={{ borderColor:'rgba(123,47,255,0.2)' }}>
              <div className="text-4xl">🗺️</div>
              <div>
                <div className="font-bold text-[#f0f4ff] text-sm">Ahmedabad, Gujarat</div>
                <div className="text-xs text-[#8892b0] mt-0.5">India 🇮🇳 · IST (UTC+5:30)</div>
                <div className="text-xs text-[#7b2fff] mt-1">Available for remote work globally</div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity:0,x:40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3 }}>
            <div className="glass-card p-8" style={{ borderColor:'rgba(0,229,255,0.1)' }}>
              <h3 className="font-bold text-[#f0f4ff] mb-6 text-lg" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-medium text-[#8892b0] mb-2">Your Name *</label><input id="contact-name" type="text" name="name" required className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} /></div>
                  <div><label className="block text-xs font-medium text-[#8892b0] mb-2">Email Address *</label><input id="contact-email" type="email" name="email" required className="form-input" placeholder="john@example.com" value={form.email} onChange={handleChange} /></div>
                </div>
                <div><label className="block text-xs font-medium text-[#8892b0] mb-2">Subject *</label><input id="contact-subject" type="text" name="subject" required className="form-input" placeholder="Project Collaboration..." value={form.subject} onChange={handleChange} /></div>
                <div><label className="block text-xs font-medium text-[#8892b0] mb-2">Message *</label><textarea id="contact-message" name="message" required className="form-input" placeholder="Hi Prarabdh, I'd love to discuss..." rows={5} value={form.message} onChange={handleChange} /></div>
                <div className="flex flex-wrap gap-2">
                  {['Hiring Inquiry','Project Collaboration','General Query'].map(s => (
                    <button key={s} type="button" onClick={() => setForm({...form,subject:s})} className="text-xs px-3 py-1 rounded-full transition-all" style={{ background:'rgba(0,229,255,0.06)',border:'1px solid rgba(0,229,255,0.15)',color:'#8892b0' }}>{s}</button>
                  ))}
                </div>
                <button type="submit" disabled={status==='sending'} className="btn-primary w-full justify-center py-3 text-base">
                  {status==='sending' ? <><div className="w-4 h-4 border-2 border-[#00e5ff]/30 border-t-[#00e5ff] rounded-full animate-spin" />Sending...</> : '🚀 Send Message'}
                </button>
                {status==='success' && <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="text-center text-sm py-3 rounded-xl" style={{ background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.2)',color:'#00e5ff' }}>✓ Message sent! I'll get back to you soon.</motion.div>}
                {status==='error' && <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="text-center text-sm py-3 rounded-xl" style={{ background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'#ef4444' }}>✕ Something went wrong. Please email directly.</motion.div>}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
