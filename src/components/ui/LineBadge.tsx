import React from 'react';
import type { LineKey } from '@/data/catalog';
import { LINE_MAP } from '@/data/catalog';

/** Seriya belgisi: qiyshiq rangli chiziq + nom (qadoq yorlig'idagi kabi) */
export function LineBadge({ line, className = '' }: { line: LineKey; className?: string }) {
  const color = LINE_MAP[line].color;
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[11px] font-extrabold italic uppercase tracking-[0.2em] text-white ${className}`}>
      <span className="h-3 w-1.5 -skew-x-[24deg]" style={{ background: color }} />
      {line}
    </span>
  );
}
