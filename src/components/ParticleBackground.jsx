import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animFrame;
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    const getParticleCount = (w) => (w < 768 ? 35 : 75);
    const CONNECTION_DIST = width < 768 ? 100 : 150;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00e5ff' : '#9c27b0';
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        const dx = mouseX - this.x; const dy = mouseY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) { this.vx += (dx/dist)*0.01; this.vy += (dy/dist)*0.01; }
        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        if (speed > 1.2) { this.vx = (this.vx/speed)*1.2; this.vy = (this.vy/speed)*1.2; }
        if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color; ctx.globalAlpha = this.opacity; ctx.fill(); ctx.globalAlpha = 1;
      }
    }

    let particles = Array.from({ length: getParticleCount(width) }, () => new Particle());

    function drawConnections() {
      const connDist = width < 768 ? 100 : CONNECTION_DIST;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < connDist) {
            const alpha = (1 - dist/connDist)*0.15;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animFrame = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      // Prevent resizing if window width is unchanged (e.g. mobile scroll showing/hiding URL bar)
      if (canvas.width === window.innerWidth) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update particle count dynamically
      const count = getParticleCount(width);
      particles = Array.from({ length: count }, () => new Particle());
    };
    
    const handleMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    
    return () => { 
      cancelAnimationFrame(animFrame); 
      window.removeEventListener('resize', handleResize); 
      window.removeEventListener('mousemove', handleMouse); 
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />;
}
