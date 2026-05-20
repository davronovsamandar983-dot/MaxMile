import { getTranslations, getLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIES } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';
import { Link } from '@/i18n/navigation';

// Opt out of static generation because of Supabase cookies
export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const t = await getTranslations('product');
  const locale = await getLocale();
  const { category, search } = await searchParams;
  
  const supabase = await createClient();
  
  let query = supabase.from('products').select('*');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  if (search) {
    query = query.or(`name_en.ilike.%${search}%,name_ru.ilike.%${search}%,name_uz.ilike.%${search}%,sae_grade.ilike.%${search}%`);
  }
  
  // Order by category index and name
  const { data: products, error } = await query;
  
  return (
    <div className="relative min-h-screen bg-[#05050A]">
      {/* Background Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-background to-background pointer-events-none" />
      
      <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 font-[var(--font-display)] text-center">
            {t('allProducts')}
          </h1>
          <div className="w-10 h-0.5 bg-gold rounded-full mb-8" />
          
          {/* Filtering Options */}
          <div className="w-full flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="w-full lg:w-auto flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
              <Link 
                href="/products"
                className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-400 border ${
                  !category || category === 'all' 
                    ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(200,169,81,0.3)] scale-105' 
                    : 'bg-white/5 text-foreground-muted border-white/10 hover:border-gold/30 hover:text-white'
                }`}
              >
                {t('allCategories')}
              </Link>
              {CATEGORIES.map(cat => (
                <Link 
                  key={cat.code}
                  href={`/products?category=${cat.code}${search ? `&search=${search}` : ''}`}
                  className={`snap-start flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-400 border ${
                    category === cat.code 
                      ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(200,169,81,0.3)] scale-105' 
                      : 'bg-white/5 text-foreground-muted border-white/10 hover:border-gold/30 hover:text-white'
                  }`}
                >
                  <span className={category === cat.code ? 'opacity-80' : 'opacity-50'}>{cat.icon}</span>
                  {cat.name[locale as 'en' | 'ru' | 'uz']}
                </Link>
              ))}
            </div>
            
            {/* Search */}
            <form action={`/${locale}/products`} method="GET" className="relative w-full lg:max-w-xs shrink-0">
              {category && <input type="hidden" name="category" value={category} />}
              <input 
                type="text" 
                name="search"
                defaultValue={search || ''}
                placeholder="Search..." 
                className="w-full bg-[#0D0D15] border border-[#1A1A28] rounded-full px-6 py-3 text-sm text-white placeholder-foreground-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-gold transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm font-medium">
            Error loading products: {error.message}
          </div>
        )}

        {!error && products && products.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
            <span className="text-4xl mb-4 opacity-40">🛢️</span>
            <p className="text-foreground-muted text-sm font-medium tracking-wide uppercase">{t('noProducts')}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
