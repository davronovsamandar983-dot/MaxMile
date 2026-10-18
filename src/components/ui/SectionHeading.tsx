import React from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  as?: 'h1' | 'h2';
};

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '', as = 'h2' }: Props) {
  const Tag = as;
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <span className={`eyebrow ${centered ? 'eyebrow--plain justify-center' : ''}`}>{eyebrow}</span>}
      <Tag className="text-balance mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
