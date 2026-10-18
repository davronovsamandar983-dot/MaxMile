import React from 'react';
import type { LineKey } from '@/data/catalog';
import { LINE_MAP } from '@/data/catalog';

export function LineBadge({ line, className = '' }: { line: LineKey; className?: string }) {
  const color = LINE_MAP[line].color;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${className}`}
      style={{ color, borderColor: `${color}55`, background: `${color}1f` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {line}
    </span>
  );
}
