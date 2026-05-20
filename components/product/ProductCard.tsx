import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Product, CATEGORIES } from '@/lib/types';

export default function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const cat = CATEGORIES.find((c) => c.code === product.category);
  
  // Use a fallback category image or gradient if product image is not mapped
  const imageSrc = product.image_url || '/placeholder.png'; // Will use a beautiful fallback gradient in CSS if error

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0D0D15] border border-[#1A1A28] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/40 hover:shadow-[0_0_30px_rgba(200,169,81,0.15)] hover:-translate-y-1 p-5">
      {/* Premium Glass Reflection (Shine) */}
      <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent left-[-150%] skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out pointer-events-none z-50" />
      
      <div className="mb-5 aspect-[4/3] w-full rounded-2xl bg-[#E8ECEF] flex items-center justify-center p-4 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-10px_20px_rgba(0,0,0,0.05)] border border-white/10 group-hover:border-gold/30 transition-colors duration-400">
        {/* Overhead Studio Spotlight */}
        <div className="absolute top-0 inset-x-0 h-[120%] bg-[radial-gradient(ellipse_at_top,_#FFFFFF_40%,_transparent_80%)] pointer-events-none" />
        
        {/* 3D Floor Horizon */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[150%] h-24 bg-[#D3D8DE] blur-[10px] rounded-[100%] pointer-events-none" />
        
        {/* Product Shadow (Underneath the bottle) */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-[100%] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

        {/* Gold Glow on Hover */}
        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay pointer-events-none" />
        
        {product.image_url ? (
          <Image 
            src={product.image_url} 
            alt={product.name_en || 'Product'} 
            fill 
            className="object-contain mix-blend-multiply filter contrast-[1.15] saturate-[1.1] transition-transform duration-700 group-hover:scale-110 p-5 pb-8 z-10 relative drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)]" 
          />
        ) : (
          <span className="text-6xl opacity-30 drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 z-10 relative text-black">
            {cat?.icon}
          </span>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
           {/* Colored dot + text as requested */}
           <div className="flex items-center gap-2 border border-[#1A1A28] bg-white/5 rounded-full px-2.5 py-1">
              <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: cat?.color, color: cat?.color }} />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">
                {product.category}
              </span>
           </div>
        </div>
        
        <h3 className="font-bold text-lg text-white mb-1.5 line-clamp-2 font-[var(--font-display)] tracking-tight">
          {locale === 'ru' ? product.name_ru : locale === 'uz' ? product.name_uz : product.name_en}
        </h3>
        
        {product.sae_grade && (
          <p className="text-gold font-mono font-medium text-sm tracking-wider mb-5">
            SAE {product.sae_grade}
          </p>
        )}
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.volumes.map((vol) => (
              <span key={vol} className="text-[11px] font-medium tracking-wider bg-white/5 text-foreground-muted px-2.5 py-1 rounded-md border border-white/10">
                {vol}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-end border-t border-[#1A1A28] pt-4">
            <Link 
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-400 font-semibold text-[11px] tracking-widest uppercase hover:shadow-[0_0_15px_rgba(200,169,81,0.2)] active:scale-95"
            >
              {locale === 'ru' ? 'Заказать' : locale === 'uz' ? 'Buyurtma' : 'Order'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
