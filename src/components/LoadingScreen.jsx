import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,16,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillStyle = `rgba(0,229,255,${Math.random()>0.9?1:0.3})`;
        ctx.fillText(char, i*fontSize, y*fontSize);
        if (y*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const interval = setInterval(draw, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 500); }, 300);
          return 100;
        }
        return p + Math.random()*8 + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loading-screen" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
          <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="text-gradient">PS</span>
              </div>
              <div className="text-sm font-mono text-[#00e5ff] tracking-[0.3em] uppercase opacity-70">Prarabdh Shukla</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-mono text-xs text-[#00e5ff] opacity-60 text-center">
              <div>&gt; Initializing portfolio...</div>
              <div>&gt; Loading components...</div>
              <div>&gt; AI systems online...</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-64">
              <div className="flex justify-between text-xs font-mono text-[#8892b0] mb-2">
                <span>Loading</span><span>{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #00e5ff, #7b2fff)', boxShadow: '0 0 10px rgba(0,229,255,0.5)' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 0.1 }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
