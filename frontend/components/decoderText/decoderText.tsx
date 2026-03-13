'use client'

import { memo, useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import './decoderText.css';

// Mapeamento entre o tipo do caractere e a classe CSS correspondente
const styles = {
  glyph: 'decoder-text-glyph',   // Classe CSS para caracteres embaralhados (efeito Matrix)
  value: 'decoder-text-value',   // Classe CSS para caracteres já decodificados
};

const glyphs: string[] = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
  '0', '1', '2', '3', '4', '5', 
  '6', '7', '8', '9',
  '!', '@', '#', '$', '%', '^',
  '&', '*', '(', ')', '-', '_',
  '+', '=', '{', '}', '[', ']',
  '|', '\\', ':', ';', '"', '\'',
  '<', '>', ',', '.', '?', '/',
  '~', '`', '§', '±', '¡', '¿',
  '€', '£', '¥', '₩', '₽', '¢',
  '©', '®', '™', '℠', '℗', '℃',
  '℉', '°', '⟨', '⟩', '∀', '∃',
  '∈', '∉', '∋', '∌', '∧', '∨',
];

const GLYPH_REFRESH_DELAY_MS = 48;

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
} as const;

type CharTypeKey = keyof typeof CharType;
type CharTypeValue = (typeof CharType)[CharTypeKey];

interface OutputItem {
  type: CharTypeValue;
  value: string;
}

interface Props {
  text: string;
  start?: boolean;
  delay?: number;
}

export const DecoderText = memo(({ text, start = true, delay: startDelay = 0 }: Props) => {
  const output = useRef<OutputItem[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const content = text.split('');
    let cancelled = false;

    // Função responsável por renderizar o texto animado
    // Cada caractere é envolvido por um <span> com a classe CSS apropriada
    const render = () => {
      if (!containerRef.current) return; // Verifica se o container existe
      const spans = output.current.map((item, index) => {
        const span = document.createElement('span'); // Cria elemento span seguro
        span.className = styles[item.type as keyof typeof styles]; // Aplica classe CSS
        span.textContent = item.value; // Usa textContent (seguro contra XSS)
        span.dataset.index = String(index);
        return span; // Retorna o elemento criado
      });
      containerRef.current.replaceChildren(...spans); // Substitui todos os filhos
    };

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (start && !reduceMotion) {
      (async () => {
        if (startDelay > 0) {
          await wait(startDelay);
        }

        if (cancelled) {
          return;
        }

        output.current = content.map(char => ({
          type: CharType.Glyph,
          value: char === ' ' ? ' ' : glyphs[Math.floor(Math.random() * glyphs.length)],
        }));
        render();

        for (let i = 0; i < content.length; i += 1) {
          if (cancelled) {
            return;
          }

          output.current = content.map((char, index) => {
            if (char === ' ') {
              return { type: CharType.Value, value: ' ' };
            }

            if (index <= i) {
              return { type: CharType.Value, value: char };
            }

            return {
              type: CharType.Glyph,
              value: glyphs[Math.floor(Math.random() * glyphs.length)],
            };
          });
          render();
          await wait(GLYPH_REFRESH_DELAY_MS);
        }
      })();
    } else {
      output.current = content.map(c => ({ type: CharType.Value, value: c }));
      render();
    }

    return () => {
      cancelled = true;
    };
  }, [text, start, startDelay, reduceMotion]);

  return (
    <span aria-label={text}>
      <span aria-hidden ref={containerRef} />
    </span>
  );
});

DecoderText.displayName = 'DecoderText';

// Certifique-se de que seu CSS tenha as classes:
// .decoder-text-glyph { ... }
// .decoder-text-value { ... }
