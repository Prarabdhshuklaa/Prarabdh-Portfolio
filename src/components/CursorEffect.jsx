import { useEffect, useRef, useState } from 'react';

export default function CursorEffect() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const hoverMatch = window.matchMedia('(hover: hover)');
    const pointerMatch = window.matchMedia('(pointer: coarse)');
    const checkTouch = () => {
      setIsTouchDevice(!hoverMatch.matches || pointerMatch.matches);
    };
    checkTouch();
    
    hoverMatch.addEventListener('change', checkTouch);
    pointerMatch.addEventListener('change', checkTouch);
    return () => {
      hoverMatch.removeEventListener('change', checkTouch);
      pointerMatch.removeEventListener('change', checkTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0, animFrame;

    const handleMouseMove = (e) => { 
      dotX = e.clientX; 
      dotY = e.clientY; 
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12; 
      ringY += (dotY - ringY) * 0.12;
      dot.style.left = `${dotX}px`; 
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`; 
      ring.style.top = `${ringY}px`;
      animFrame = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover], input, textarea');
      if (target) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover], input, textarea');
      if (target) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
