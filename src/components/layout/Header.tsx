'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { Locale } from '../../lib/translations';
import { Menu, X, ChevronDown, Globe, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, t, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.products, path: '/products' },
    { name: t.nav.about, path: '/#about' },
    { name: t.nav.contact, path: '/#contact' },
  ];

  const languages: { key: Locale; label: string }[] = [
    { key: 'uz', label: 'O\'zbekcha' },
    { key: 'ru', label: 'Русский' },
    { key: 'en', label: 'English' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#07070A]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold tracking-widest text-white group-hover:text-[#C8A951] transition-colors">
              MAX<span className="text-[#C8A951]">MILES</span>
            </span>
            <span className="text-xs bg-[#C8A951]/10 text-[#C8A951] px-2 py-0.5 rounded font-medium border border-[#C8A951]/20">
              LUBRICANTS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-[#C8A951] ${isActive ? 'text-[#C8A951]' : 'text-gray-300'}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Language and Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1.5 text-sm font-medium text-gray-300 hover:text-[#C8A951] transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
              >
                <Globe className="w-4 h-4 text-[#C8A951]" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-40 bg-[#0F0F16] rounded-xl border border-white/10 shadow-2xl z-20 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.key}
                        onClick={() => {
                          setLocale(lang.key);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/5 flex items-center justify-between ${locale === lang.key ? 'text-[#C8A951] font-semibold' : 'text-gray-300'}`}
                      >
                        {lang.label}
                        {locale === lang.key && <span className="w-1.5 h-1.5 bg-[#C8A951] rounded-full"></span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Telegram Order Action */}
            <a
              href="https://t.me/maxmile_oil_bot"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#C8A951] to-[#E5C367] hover:from-[#B09340] hover:to-[#C8A951] text-black px-4 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-[#C8A951]/10 font-bold"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>{t.products.order}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Language Selection Quick Switcher for Mobile */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/5"
              >
                <Globe className="w-4 h-4 text-[#C8A951]" />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-32 bg-[#0F0F16] rounded-xl border border-white/10 shadow-2xl z-20 py-1.5 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.key}
                        onClick={() => {
                          setLocale(lang.key);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs ${locale === lang.key ? 'text-[#C8A951] font-bold' : 'text-gray-300'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none p-1.5 bg-white/5 rounded-lg border border-white/5"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#07070A] border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-300 hover:text-[#C8A951] hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 px-3">
              <a
                href="https://t.me/maxmile_oil_bot"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 text-sm font-semibold uppercase tracking-wider bg-[#C8A951] text-black w-full py-3 rounded-lg font-bold"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>{t.products.order}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
