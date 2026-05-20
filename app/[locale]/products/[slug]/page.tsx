import { getTranslations, getLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIES } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations('product');
  
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error || !product) {
    notFound();
  }
  
  const cat = CATEGORIES.find(c => c.code === product.category);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'maxmile_oil_bot';
  
  // Create localized values
  const name = locale === 'ru' ? product.name_ru : locale === 'uz' ? product.name_uz : product.name_en;
  const description = locale === 'ru' ? product.description_ru : locale === 'uz' ? product.description_uz : product.description_en;
  
  return (
    <div className="relative min-h-screen bg-[#05050A]">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-background to-background pointer-events-none rounded-full blur-3xl opacity-50" />
      
      <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
        <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 text-foreground-muted hover:text-gold transition-colors text-[11px] font-bold uppercase tracking-widest mb-12">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          {t('backToProducts')}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Image Box */}
          <div className="lg:col-span-5 relative group">
            {/* Pedestal effect behind image */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gold/20 blur-2xl rounded-full" />
            
            <div className="aspect-[3/4] rounded-[2rem] bg-[#E8ECEF] flex items-center justify-center p-12 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-10px_20px_rgba(0,0,0,0.05),0_20px_40px_rgba(0,0,0,0.5)] border border-white/20">
              {/* Overhead Studio Spotlight */}
              <div className="absolute top-0 inset-x-0 h-[120%] bg-[radial-gradient(ellipse_at_top,_#FFFFFF_40%,_transparent_80%)] pointer-events-none" />
              
              {/* 3D Floor Horizon */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-[#D3D8DE] blur-[15px] rounded-[100%] pointer-events-none" />
              
              {/* Product Shadow (Underneath the bottle) */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-3/4 h-10 bg-black/15 blur-2xl rounded-[100%] pointer-events-none transition-transform duration-1000 group-hover:scale-105" />

              {/* Gold Glow on Hover */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay pointer-events-none" />
              
              {product.image_url ? (
                <Image 
                  src={product.image_url} 
                  alt={name || 'Product'} 
                  fill
                  className="object-contain p-10 pb-16 mix-blend-multiply filter contrast-[1.15] saturate-[1.1] transition-transform duration-1000 group-hover:scale-105 z-10 relative drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
                />
              ) : (
                <span className="text-9xl opacity-30 drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 z-10 relative text-black">
                  {cat?.icon}
                </span>
              )}
            </div>
          </div>
          
          {/* Right: Product Info */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            <div className="flex items-center gap-4 mb-6">
              {/* Category */}
              <div className="flex items-center gap-2 border border-[#1A1A28] bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: cat?.color, color: cat?.color }} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">
                  {product.category}
                </span>
              </div>
              
              {/* SAE Grade */}
              {product.sae_grade && (
                <div className="px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md flex items-center gap-2">
                  <span className="text-gold text-[10px] uppercase tracking-widest font-bold">SAE</span>
                  <span className="text-gold font-mono font-medium tracking-wide text-sm">{product.sae_grade}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 font-[var(--font-display)] tracking-tight leading-tight">
              {name}
            </h1>
            
            {/* Description */}
            <div className="mb-12">
              <h3 className="text-[11px] text-foreground-muted font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
                {t('description')}
                <div className="flex-1 h-px bg-[#1A1A28]" />
              </h3>
              <p className="text-white/80 text-lg leading-relaxed font-light whitespace-pre-wrap">
                {description}
              </p>
            </div>
            
            {/* Properties */}
            {product.properties && product.properties.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[11px] text-foreground-muted font-bold tracking-widest uppercase mb-6 flex items-center gap-4">
                  {t('properties')}
                  <div className="flex-1 h-px bg-[#1A1A28]" />
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.properties.map((prop: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-[#1A1A28] hover:border-gold/30 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_8px_rgba(200,169,81,0.5)]" />
                      <span className="text-white/80 text-sm font-light leading-relaxed">{prop}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Volumes */}
            <div className="mb-12">
              <h3 className="text-[11px] text-foreground-muted font-bold tracking-widest uppercase mb-6 flex items-center gap-4">
                {t('volumes')}
                <div className="flex-1 h-px bg-[#1A1A28]" />
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.volumes.map((vol: string) => (
                  <div key={vol} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-lg font-medium hover:bg-white/10 hover:border-gold/30 transition-all cursor-default text-center min-w-[80px]">
                    {vol}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Telegram Order Action */}
            <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-[#1A1A28] to-[#0D0D15] border border-[#1A1A28] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 justify-between">
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Ready to order?</h4>
                  <p className="text-foreground-muted text-sm font-light max-w-sm">
                    Contact us via Telegram to check availability, pricing, and place your order instantly.
                  </p>
                </div>
                <a 
                  href={`https://t.me/${botUsername}?start=product_${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gold text-black font-bold text-[11px] tracking-widest uppercase hover:bg-gold-light transition-all duration-400 hover:scale-105 shadow-[0_0_20px_rgba(200,169,81,0.2)] hover:shadow-[0_0_30px_rgba(200,169,81,0.4)]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  {t('orderTelegram')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
