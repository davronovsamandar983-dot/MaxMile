'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('admin');

  const tabs = [
    { label: t('tabs.orders'), href: '/hq-panel-9k2m' },
    { label: t('tabs.products'), href: '/hq-panel-9k2m/products' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-[var(--font-display)]">
              {t('title')}
            </h1>
            <p className="text-foreground-muted mt-2">{t('subtitle')}</p>
          </div>
          
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-foreground-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
