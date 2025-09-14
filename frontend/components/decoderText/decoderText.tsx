'use client'

import { useReducedMotion, useSpring } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
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

function shuffle(content: string[], output: OutputItem[], pos: number): OutputItem[] {
  return content.map((char, i) => {
    if (i < pos) {
      return { type: CharType.Glyph, value: char };
    }
    if (pos % 1 < 0.5) {
      return { type: CharType.Value, value: glyphs[Math.floor(Math.random() * glyphs.length)] };
    }
    return { type: CharType.Glyph, value: output[i].value };
  });
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
  const spring = useSpring(0, { stiffness: 10, damping: 5 });

  useEffect(() => {
    const content = text.split('');
    output.current = content.map(_ => ({ type: CharType.Glyph, value: '' }));
    // Função responsável por renderizar o texto animado
    // Cada caractere é envolvido por um <span> com a classe CSS apropriada
    const render = () => {
      if (!containerRef.current) return; // Verifica se o container existe
      const spans = output.current.map((item, index) => {
        const span = document.createElement('span'); // Cria elemento span seguro
        span.className = styles[item.type as 'glyph' | 'value']; // Aplica classe CSS
        span.textContent = item.value; // Usa textContent (seguro contra XSS)
        return span; // Retorna o elemento criado
      });
      containerRef.current.replaceChildren(...spans); // Substitui todos os filhos
    };

    const unsub = spring.on('change', v => {
      output.current = shuffle(content, output.current, v);
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
      output.current = content.map(c => ({ type: CharType.Value, value: c }));
      render();
    }

    return () => unsub();
  }, [text, start, startDelay, spring, reduceMotion]);

  return <span aria-hidden ref={containerRef} />;
});

DecoderText.displayName = 'DecoderText';

// Certifique-se de que seu CSS tenha as classes:
// .decoder-text-glyph { ... }
// .decoder-text-value { ... }