'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../lib/supabase';
import { ArrowRight, Shield, Zap, Sparkles, Award, Star, Compass, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const heroSlides = [
  {
    image: '/bg_slide_1.jpg',
    productImage: '/real_oil_1.png',
    productName: 'ULTRA SAE 0W-20 SP',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bmw_lubricant_hero.png',
    productImage: '/real_oil_2.png',
    productName: 'ULTRA SAE 0W-30 SN C2/C3',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/oil_filter_change.png',
    productImage: '/real_oil_3.png',
    productName: 'ULTRA SAE 0W-40 SP',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/oil_filter_focus.png',
    productImage: '/real_oil_4.png',
    productName: 'ULTRA SAE 5W-30 SN C3',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bg_slide_3.jpg',
    productImage: '/real_oil_5.png',
    productName: 'ULTRA SAE 5W-30 SN A3/B4',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bg_slide_4.jpg',
    productImage: '/real_oil_6.png',
    productName: 'POWER SAE 5W-30 CK4 E9',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bg_slide_5.jpg',
    productImage: '/real_oil_7.png',
    productName: 'POWER SAE 10W-40 CI-4 E4/E7',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bg_slide_6.jpg',
    productImage: '/real_oil_8.png',
    productName: 'MOTA 10W-40 SL JASO MA-2',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bg_slide_7.jpg',
    productImage: '/real_oil_9.png',
    productName: 'GEARA ATF DEX III',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    image: '/bg_slide_10.jpg',
    productImage: '/real_oil_10.png',
    productName: 'FREEZA Kontsentrat',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  }
];

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Contact form state
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          phone: formData.phone,
          message: formData.message,
          reply_to: '',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#07070A]">
      {/* 1. Hero Slider Section */}
      <section className="relative h-[85vh] sm:h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Background Image with dark overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[6000ms]"
              style={{
                backgroundImage: `linear-gradient(rgba(7, 7, 10, 0.75), rgba(7, 7, 10, 0.85)), url(${slide.image})`
              }}
            ></div>
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#C8A951]/10 border border-[#C8A951]/30 rounded-full px-4 py-1.5 mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-[#C8A951]" />
              <span className="text-xs uppercase tracking-widest text-[#C8A951] font-semibold">Premium Lubricants</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 font-light mb-8 max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C8A951] to-[#E5C367] hover:from-[#B09340] hover:to-[#C8A951] text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-[#C8A951]/20 flex items-center justify-center space-x-2 text-sm"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight className="w-4.5 h-4.5 text-black" />
              </Link>
              <a
                href="#about"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 border border-white/10 flex items-center justify-center space-x-2 text-sm"
              >
                <span>{t.hero.aboutCta}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. Categories Section */}
      <section id="categories" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
              {t.categories.title}
            </h2>
            <div className="h-1 w-20 bg-[#C8A951] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">
              {t.categories.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => {
              const label = locale === 'ru' ? category.label_ru : locale === 'en' ? category.label_en : category.label_uz;
              return (
                <Link
                  key={category.key}
                  href={`/products?cat=${category.key}`}
                  className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-white/5 bg-[#11111a]">
                    <img
                      src={category.bgImage}
                      alt={label}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Category Code Label */}
                    <div
                      className="absolute top-4 right-4 text-[10px] uppercase px-2.5 py-1 rounded-full font-bold border backdrop-blur-md shadow-lg"
                      style={{
                        borderColor: `${category.color}40`,
                        color: category.color,
                        backgroundColor: `${category.color}20`
                      }}
                    >
                      {category.key}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wider group-hover:text-[#C8A951] transition-colors uppercase">
                      {label}
                    </h3>
                    <p className="text-gray-500 text-xs flex items-center group-hover:text-gray-300 transition-colors">
                      <span>{t.categories.viewAll}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1.5 transition-transform text-[#C8A951]" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-24 relative z-10 bg-[#0A0A0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
              {t.whyUs.title}
            </h2>
            <div className="h-1 w-20 bg-[#C8A951] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">
              {t.whyUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#C8A951]/20">
              <div className="w-12 h-12 bg-[#C8A951]/10 rounded-xl flex items-center justify-center mb-6 border border-[#C8A951]/20">
                <Shield className="w-6 h-6 text-[#C8A951]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{t.whyUs.card1Title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.whyUs.card1Desc}</p>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#C8A951]/20">
              <div className="w-12 h-12 bg-[#C8A951]/10 rounded-xl flex items-center justify-center mb-6 border border-[#C8A951]/20">
                <Zap className="w-6 h-6 text-[#C8A951]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{t.whyUs.card2Title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.whyUs.card2Desc}</p>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#C8A951]/20">
              <div className="w-12 h-12 bg-[#C8A951]/10 rounded-xl flex items-center justify-center mb-6 border border-[#C8A951]/20">
                <Award className="w-6 h-6 text-[#C8A951]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{t.whyUs.card3Title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.whyUs.card3Desc}</p>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#C8A951]/20">
              <div className="w-12 h-12 bg-[#C8A951]/10 rounded-xl flex items-center justify-center mb-6 border border-[#C8A951]/20">
                <Compass className="w-6 h-6 text-[#C8A951]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{t.whyUs.card4Title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.whyUs.card4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Us Section */}
      <section id="about" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image & Stats block */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(7, 7, 10, 0.4), rgba(7, 7, 10, 0.4)), url('https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&q=80&w=1200')`
                  }}
                ></div>
              </div>

              {/* Float Card */}
              <div className="absolute -bottom-8 -right-4 sm:right-6 bg-gradient-to-br from-[#101016] to-[#08080C] p-6 rounded-2xl border border-[#C8A951]/30 shadow-2xl max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-[#C8A951]/20 rounded-lg">
                    <Star className="w-5 h-5 text-[#C8A951] fill-[#C8A951]" />
                  </div>
                  <span className="text-lg font-bold text-white tracking-wide uppercase">MAXMILES</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t.contact.certText}
                </p>
              </div>
            </div>

            {/* Content block */}
            <div className="space-y-6">
              <span className="text-xs uppercase font-semibold tracking-widest text-[#C8A951] bg-[#C8A951]/10 px-3 py-1 rounded-full border border-[#C8A951]/20">
                Premium Brand
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
                {t.aboutSection.title}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {t.aboutSection.p1}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.aboutSection.p2}
              </p>

              {/* Simple stats grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <h4 className="text-3xl sm:text-4xl font-extrabold text-[#C8A951]">10K+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.aboutSection.statsActive}</p>
                </div>
                <div>
                  <h4 className="text-3xl sm:text-4xl font-extrabold text-[#C8A951]">40+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.aboutSection.statsProducts}</p>
                </div>
                <div>
                  <h4 className="text-3xl sm:text-4xl font-extrabold text-[#C8A951]">15+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.aboutSection.statsExperience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="py-24 relative z-10 bg-[#0A0A0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* Map/Location Info */}
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">{t.contact.title}</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  {t.contact.desc}
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#C8A951]/10 rounded-xl flex items-center justify-center border border-[#C8A951]/20">
                      <Shield className="w-5 h-5 text-[#C8A951]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider block">{t.contact.companyLabel}</span>
                      <span className="text-sm font-semibold text-white">MaxMiles Lubricants Co. Ltd.</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#C8A951]/10 rounded-xl flex items-center justify-center border border-[#C8A951]/20">
                      <Star className="w-5 h-5 text-[#C8A951]" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider block">{t.contact.workingHoursLabel}</span>
                      <span className="text-sm font-semibold text-white">{t.contact.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bot link */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <a
                  href="https://t.me/maxmile_oil_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <span className="text-sm font-bold text-white block">{t.contact.telegramTitle}</span>
                      <span className="text-xs text-gray-500">{t.contact.telegramSubtitle}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#C8A951] transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
              <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">{t.contact.formTitle}</h3>

              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wider">{t.contact.formSuccessTitle}</h4>
                  <p className="text-gray-400 text-sm">{t.contact.formSuccessDesc}</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.contact.formNameLabel}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      disabled={formStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm disabled:opacity-50"
                      placeholder={t.contact.formNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.contact.formPhoneLabel}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      disabled={formStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm disabled:opacity-50"
                      placeholder={t.contact.formPhonePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.contact.formMessageLabel}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      required
                      disabled={formStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm disabled:opacity-50"
                      placeholder={t.contact.formMessagePlaceholder}
                    ></textarea>
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-red-400 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{t.contact.formError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-[#C8A951] to-[#E5C367] hover:from-[#B09340] hover:to-[#C8A951] text-black font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {formStatus === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /><span>{t.contact.formSubmitting}</span></>
                    ) : (
                      <span>{t.contact.formSubmit}</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
