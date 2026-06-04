'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040406] border-t border-white/5 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-widest text-white">
                MAX<span className="text-[#C8A951]">MILES</span>
              </span>
              <span className="text-[10px] bg-[#C8A951]/10 text-[#C8A951] px-1.5 py-0.5 rounded font-medium border border-[#C8A951]/20">
                LUBRICANTS
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-500">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-sm hover:text-[#C8A951] transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all text-[#C8A951]" />
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-[#C8A951] transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all text-[#C8A951]" />
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm hover:text-[#C8A951] transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all text-[#C8A951]" />
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t.categories.title}</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/products?cat=ULTRA" className="text-sm hover:text-[#C8A951] transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full mr-2"></span>
                  ULTRA - Passenger Car
                </Link>
              </li>
              <li>
                <Link href="/products?cat=POWER" className="text-sm hover:text-[#C8A951] transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full mr-2"></span>
                  POWER - Truck Oils
                </Link>
              </li>
              <li>
                <Link href="/products?cat=GEARA" className="text-sm hover:text-[#C8A951] transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full mr-2"></span>
                  GEARA - Gear Oils
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-5">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">{t.footer.contacts}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-4.5 h-4.5 text-[#C8A951] shrink-0 mt-0.5" />
                <span className="text-gray-500">Toshkent sh., Yunusobod tumani, Markaziy ko\'cha, 12-uy</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-4.5 h-4.5 text-[#C8A951] shrink-0" />
                <a href="tel:+998901234567" className="hover:text-white transition-colors text-gray-500">+998 (90) 123-45-67</a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-4.5 h-4.5 text-[#C8A951] shrink-0" />
                <a href="mailto:info@maxmiles.uz" className="hover:text-white transition-colors text-gray-500">info@maxmiles.uz</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-center">
          <p>© {currentYear} MaxMiles Lubricants. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
