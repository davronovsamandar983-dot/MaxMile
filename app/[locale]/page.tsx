import { Link } from '@/i18n/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIES } from '@/lib/types';
import type { Product, Locale } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

export default async function HomePage() {
  let t: Awaited<ReturnType<typeof getTranslations<'home'>>>;
  let tProduct: Awaited<ReturnType<typeof getTranslations<'product'>>>;
  let locale: Locale;
  let featuredProducts: Product[] | null = null;

  try {
    t = await getTranslations('home');
    tProduct = await getTranslations('product');
    locale = (await getLocale()) as Locale;
  } catch (err) {
    console.error('❌ Error loading translations/locale:', err);
    return <div style={{ color: 'white', padding: '40px' }}>Error loading translations: {String(err)}</div>;
  }

  try {
    // Fetch featured products from Supabase
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);
    
    if (error) {
      console.error('❌ Supabase error:', error);
    }
    featuredProducts = data;
  } catch (err) {
    console.error('❌ Error fetching products:', err);
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="hero-gradient relative min-h-screen flex items-center justify-center overflow-hidden bg-noise">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/20 via-background to-background opacity-60" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-20 text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="animate-fade-in-up inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase">
              Premium Lubricants
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] font-[var(--font-display)]">
            <span className="animate-fade-in-up block text-white drop-shadow-2xl">
              Engineered
            </span>
            <span className="animate-fade-in-up-delay-1 block text-gradient-gold drop-shadow-2xl mt-2">
              to Endure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 mt-8 text-lg sm:text-xl text-foreground-muted max-w-2xl font-light">
            {t('hero.description')}
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up-delay-3 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/products"
              className="px-8 py-4 rounded-full bg-gold text-black font-bold tracking-widest text-xs uppercase hover:bg-gold-light transition-all duration-400 shadow-[0_0_20px_rgba(200,169,81,0.3)] hover:shadow-[0_0_30px_rgba(200,169,81,0.5)] hover:scale-105 active:scale-95"
            >
              Explore Products
            </Link>
            <Link
              href="/technology"
              className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold tracking-widest text-xs uppercase hover:bg-white/10 hover:border-white/20 transition-all duration-400 hover:scale-105 active:scale-95"
            >
              Our Technology
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS / TRUST BAR ────────────────────────── */}
      <section className="bg-[#0D0D15] border-y border-[#1A1A28] py-12 relative z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-[#1A1A28]">
            {[
              { value: '38+', label: 'Products' },
              { value: '9', label: 'Product Lines' },
              { value: 'UAE', label: 'Origin' },
              { value: 'API', label: 'Certified' },
            ].map((stat, i) => (
              <div key={i} className={`text-center ${i % 2 === 0 ? 'pl-0' : 'pl-8'} lg:pl-8`}>
                <div className="text-3xl lg:text-4xl font-black text-gradient-gold font-mono tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ──────────────────────────────── */}
      <section className="py-24 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {t('categories.title')}
            </h2>
            <div className="w-10 h-0.5 bg-gold rounded-full" />
            <p className="mt-6 text-foreground-muted text-center max-w-2xl font-light">
              {t('categories.subtitle')}
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.code}
                href={`/products?category=${cat.code}`}
                className="group relative flex flex-col p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"
                  style={{
                    background: `radial-gradient(circle at top right, ${cat.color}30, transparent 60%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Top line */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] opacity-50 transition-opacity group-hover:opacity-100" style={{ backgroundColor: cat.color }} />

                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-8 mt-2">
                    <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">{cat.icon}</span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                      style={{ color: cat.color }}
                    >
                      {cat.code}
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {cat.name[locale]}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed font-light flex-1">
                    {cat.description[locale]}
                  </p>

                  {/* Arrow */}
                  <div className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: cat.color }}>
                    <span>{tProduct('viewDetails')}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ───────────────────────── */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#0D0D15] border-t border-[#1A1A28]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-start mb-12">
              <span className="text-[10px] font-bold text-gold tracking-[0.2em] uppercase mb-3">
                Featured
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {t('featured.title')}
              </h2>
            </div>

            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 gap-6 snap-x snap-mandatory hide-scrollbar">
              {(featuredProducts as Product[]).map((product) => (
                <div key={product.id} className="min-w-[280px] lg:min-w-0 snap-start">
                  <ProductCard product={product} locale={locale} />
                </div>
              ))}
            </div>

            {/* View all */}
            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-400 font-bold text-xs tracking-widest uppercase hover:scale-105"
              >
                {tProduct('allProducts')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── ABOUT / QUALITY ─────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-background to-background pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {t('about.title')}
              </h2>
              <div className="w-10 h-0.5 bg-gold rounded-full mt-6 mb-8" />
              <p className="text-xl text-gold font-medium mb-6">
                {t('about.subtitle')}
              </p>
              <p className="text-foreground-muted leading-relaxed font-light">
                {t('about.description')}
              </p>
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: t('about.badge1'), icon: '🇩🇪', desc: 'Engineering' },
                { label: t('about.badge2'), icon: '🇦🇪', desc: 'Production' },
                { label: t('about.badge3'), icon: '🌍', desc: 'Standard' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-2xl border border-[#1A1A28] bg-white/5 backdrop-blur-md p-8 text-center hover:border-gold/40 transition-colors duration-400 group"
                >
                  <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-400 drop-shadow-xl">{badge.icon}</span>
                  <span className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-1">
                    {badge.desc}
                  </span>
                  <span className="text-sm font-medium text-white tracking-wide">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
}
