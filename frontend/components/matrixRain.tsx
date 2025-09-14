// src/components/MatrixRain.tsx
import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アァカサタナハマヤャラワガザダバパ0123456789'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    // Definir o tipo explicitamente para number[]
    const drops: number[] = Array.from({ length: Math.floor(columns) }, () => 1);

    const draw = () => {
      // Obtém os valores CSS computados
      const computedStyle = getComputedStyle(document.documentElement);
      const transparentMatrix = computedStyle.getPropertyValue('--transparent-matrix');
      const fillStyle = computedStyle.getPropertyValue('--fillstyle');
      
      // Fundo semi-transparente para efeito de rastro
      ctx.fillStyle = transparentMatrix;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Define a cor das letras
      ctx.fillStyle = fillStyle;
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y: number, i: number) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      });
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
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
        backgroundColor: 'transparent', // Removido o fundo preto fixo para usar as cores do tema
      }}
    />
  );
};

export default MatrixRain;
