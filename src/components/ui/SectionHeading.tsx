import React from 'react';

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  /** Yorug' (paper) fondagi bo'lim uchun */
  light?: boolean;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({ kicker, title, subtitle, light = false, align = 'left', className = '', children }: Props) {
  const center = align === 'center';
  return (
    <div className={`flex flex-col gap-6 ${center ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'} ${className}`}>
      <div className={center ? 'max-w-3xl' : 'max-w-3xl'}>
        <span className={`kicker ${light ? '!text-[#8a6d22]' : ''}`}>{kicker}</span>
        <h2 className={`display mt-5 text-balance text-[2.15rem] sm:text-5xl lg:text-[3.6rem] ${light ? 'text-coal' : 'text-white'}`}>{title}</h2>
        {subtitle && <p className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg ${light ? 'text-black/60' : 'text-white/60'} ${center ? 'mx-auto' : ''}`}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
