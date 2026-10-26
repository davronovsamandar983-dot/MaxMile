import React from 'react';
import { PRODUCTS } from '@/data/catalog';

/** Poyga lentasi: barcha sinflar cheksiz aylanadi */
const ITEMS = Array.from(new Set(PRODUCTS.map((p) => (p.grade && p.grade !== '300 ml' ? p.grade : p.name))));

export function GradeTicker() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((g) => (
        <span key={g} className="flex items-center">
          <span className="grade whitespace-nowrap px-6 text-2xl text-black sm:text-3xl">{g}</span>
          <span className="h-4 w-2 -skew-x-[24deg] bg-black/80" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 -skew-y-1 overflow-hidden bg-gold py-3 shadow-[0_20px_60px_-20px_rgba(200,169,81,.45)]">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
