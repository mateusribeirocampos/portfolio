'use client';

import { useReducedMotion, useSpring } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';

// Mapeamento entre o tipo do caractere e a classe CSS correspondente
const styles = {
  glyphM: 'decoder-m-glyph',   // Classe CSS para caracteres embaralhados (efeito Matrix)
  valueM: 'decoder-m-value',   // Classe CSS para caracteres já decodificados
};

const glyphsM: string[] = [
  // Caracteres representando a letra "M" em vários idiomas para o efeito de decodificação
  // Latim
  'M',
  // Cirílico
  'М',
  // Grego
  'Μ',
  // Japonês (Katakana)
  'ム',
  // Árabe
  'م',
  // Hebraico
  'מ',
  // Devanagari (Hindi)
  'म',
  // Tailandês
  'ม',
  // Símbolos e variações de M
  'Ⓜ', '♏', 'Ｍ', 'ℳ', '𝕄', '𝓜', '𝔐', '𝙈', '𝐌'
];

const CharTypeM = {
  GlyphM: 'glyphM',
  ValueM: 'valueM',
} as const;

type CharTypeKeyM = keyof typeof CharTypeM;
type CharTypeValueM = (typeof CharTypeM)[CharTypeKeyM];

interface OutputItemM {
  type: CharTypeValueM;
  value: string;
}

function shuffleM(content: string[], output: OutputItemM[], pos: number): OutputItemM[] {
  return content.map((char, i) => {
    if (i < pos) {
      return { type: CharTypeM.GlyphM, value: char };
    }
    if (pos % 1 < 0.5) {
      return { type: CharTypeM.ValueM, value: glyphsM[Math.floor(Math.random() * glyphsM.length)] };
    }
    return { type: CharTypeM.GlyphM, value: output[i].value };
  });
}

interface Props {
  text: string;
  start?: boolean;
  delay?: number;
}

export const DecoderLetter = memo(({ text, start = true, delay: startDelay = 0 }: Props) => {
  const output = useRef<OutputItemM[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const spring = useSpring(0, { stiffness: 10, damping: 5 });

  useEffect(() => {
    const content = text.split('');
    output.current = content.map(_ => ({ type: CharTypeM.GlyphM, value: '' }));
    // Função responsável por renderizar o texto animado
    // Cada caractere é envolvido por um <span> com a classe CSS apropriada
    const render = () => {
      if (!containerRef.current) return;
      const spans = output.current.map((item, index) => {
        const span = document.createElement('span');
        span.className = styles[item.type as 'glyphM' | 'valueM'];
        span.textContent = item.value;
        span.dataset.index = String(index);
        return span;
      });

      containerRef.current.replaceChildren(...spans);
    };

    const unsub = spring.on('change', v => {
      output.current = shuffleM(content, output.current, v);
      render();
    });

    if (start && !reduceMotion) {
      (async () => {
        if (startDelay > 0) {
          await new Promise(resolve => setTimeout(resolve, startDelay));
        }
        spring.set(content.length);
      })();
    } else {
      output.current = content.map(c => ({ type: CharTypeM.ValueM, value: c }));
      render();
    }

    return () => unsub();
  }, [text, start, startDelay, spring, reduceMotion]);

  return <span aria-hidden ref={containerRef} />;
});

DecoderLetter.displayName = 'DecoderLetter';

// Certifique-se de que seu CSS tenha as classes:
// .decoder-text-glyph { ... }
// .decoder-text-value { ... }
