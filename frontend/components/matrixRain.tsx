// src/components/MatrixRain.tsx
import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const glyphs = 'アァカサタナハマヤャラワガザダバパ0123456789{}[]/=><'.split('');
    const protocolTokens = ['GET', 'POST', 'JWT', '200', '201', 'SQL', 'API'];
    const fontSize = 13;
    const columnWidth = 24;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let drops: number[] = [];
    let animationFrame = 0;
    let previousFrame = 0;

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const columns = Math.ceil(window.innerWidth / columnWidth);
      drops = Array.from({ length: columns }, (_, index) => drops[index] ?? Math.random() * -30);
    };

    const draw = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const transparentMatrix = computedStyle.getPropertyValue('--transparent-matrix');
      const fillStyle = computedStyle.getPropertyValue('--fillstyle');

      ctx.fillStyle = transparentMatrix;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = fillStyle;
      ctx.font = fontSize + 'px monospace';

      drops.forEach((y: number, i: number) => {
        const useProtocolToken = Math.random() > 0.965;
        const source = useProtocolToken ? protocolTokens : glyphs;
        const text = source[Math.floor(Math.random() * source.length)];
        const x = i * columnWidth;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = Math.random() * -12;
        } else {
          drops[i]++;
        }
      });
    };

    const animate = (timestamp: number) => {
      if (timestamp - previousFrame >= 58) {
        draw();
        previousFrame = timestamp;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    draw();
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default MatrixRain;
