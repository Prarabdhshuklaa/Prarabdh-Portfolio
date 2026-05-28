import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0, animFrame;
    const handleMouseMove = (e) => { dotX = e.clientX; dotY = e.clientY; };
    const animate = () => {
      ringX += (dotX - ringX)*0.12; ringY += (dotY - ringY)*0.12;
      dot.style.left = `${dotX}px`; dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`;
      animFrame = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    const addHover = () => { dot.classList.add('hovering'); ring.classList.add('hovering'); };
    const removeHover = () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); };
    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover], input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover);
        el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover);
      });
    };
    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('mousemove', handleMouseMove); observer.disconnect(); };
  }, []);

  return (<><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>);
}
