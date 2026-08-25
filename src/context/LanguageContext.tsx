'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations } from '../lib/translations';

type LanguageContextType = {
  locale: Locale;
  t: typeof translations['uz'];
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('uz');

  useEffect(() => {
    const savedLocale = localStorage.getItem('maxmiles-locale') as Locale;
    if (savedLocale && (savedLocale === 'uz' || savedLocale === 'ru' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'ru') {
        setLocaleState('ru');
      } else if (browserLang === 'en') {
        setLocaleState('en');
      }
    }
  }, []);

  // The server renders <html lang="uz"> because that is the default locale.
  // Once the real choice is known, correct it — otherwise a screen reader
  // announces Russian and English copy with Uzbek pronunciation rules.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('maxmiles-locale', newLocale);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
