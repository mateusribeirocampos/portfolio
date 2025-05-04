"use client";

import { useEffect, useState } from "react";

interface DecoderGlyphLetterProps {
  glyphs: string[];
  interval?: number;
  className?: string;
}

export function DecoderGlyphLetter({ glyphs, interval = 400, className = "" }: DecoderGlyphLetterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % glyphs.length);
    }, interval);
    return () => clearInterval(id);
  }, [glyphs, interval]);

  return (
    <span className={className}>{glyphs[index]}</span>
  );
} 