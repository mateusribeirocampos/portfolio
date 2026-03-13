"use client";

import { useEffect, useState } from "react";

interface DecoderGlyphLetterProps {
  glyphs: string[];
  interval?: number;
  className?: string;
}

export function DecoderGlyphLetter({ glyphs, interval = 120, className = "" }: DecoderGlyphLetterProps) {
  // index 0 is always the real letter (e.g. 'M', 'R', 'C')
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      count++;
      if (count >= glyphs.length) {
        // Settled — stay on the real letter (index 0)
        setIndex(0);
        clearInterval(id);
        return;
      }
      setIndex(count);
    }, interval);
    return () => clearInterval(id);
  }, [glyphs, interval]);

  return (
    <span className={className}>{glyphs[index]}</span>
  );
} 