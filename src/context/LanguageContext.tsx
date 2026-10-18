'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { type Dict, type Locale, translations } from '@/lib/translations';

type LanguageContextType = {
  locale: Locale;
  t: Dict;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'maxmiles-locale';
const DEFAULT_LOCALE: Locale = 'uz';
const isLocale = (v: unknown): v is Locale => v === 'uz' || v === 'ru' || v === 'en';

// Til tanlovi brauzerdagi tashqi holat (localStorage / navigator) — useSyncExternalStore bilan o'qiladi:
// serverda va gidratatsiyada 'uz', keyin haqiqiy tanlov (hydration xatosiz).
const listeners = new Set<() => void>();
let override: Locale | null = null;

function readLocale(): Locale {
  if (override) return override;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* private mode */
  }
  const browser = (navigator.language || '').slice(0, 2);
  if (browser === 'ru') return 'ru';
  if (browser === 'en') return 'en';
  return DEFAULT_LOCALE;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const locale = useSyncExternalStore(subscribe, readLocale, () => DEFAULT_LOCALE);

  // Server <html lang="uz"> beradi; haqiqiy tanlov ma'lum bo'lgach to'g'rilaymiz.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    override = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
    listeners.forEach((l) => l());
  }, []);

  const value = useMemo(() => ({ locale, t: translations[locale], setLocale }), [locale, setLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
