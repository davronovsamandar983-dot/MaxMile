import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05050A] pt-16 pb-8 border-t border-[#1A1A28] overflow-hidden">
      {/* Top Gold Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A951] to-transparent opacity-50" />
      
      {/* Faint Hexagon Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 100L0 75V25L30 0l30 25v50L30 100zM15 82.5l15 12.5 15-12.5V37.5L30 25 15 37.5v45z' fill='%23C8A951' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 60px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <span className="text-2xl font-bold tracking-tight text-white font-[var(--font-display)]">
                Max<span className="text-gradient-gold font-black">M</span>iles
              </span>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed font-light">
              Premium European engineering brought to the UAE. Delivering world-class lubricants for modern performance.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gold">
              &ldquo;{t('tagline')}&rdquo;
            </p>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Products</h3>
            <ul className="space-y-4 text-sm text-foreground-muted">
              {['ULTRA', 'POWER', 'MOTA', 'GEARA', 'FREEZA', 'ADDIT'].map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${cat}`} className="hover:text-gold transition-colors block w-fit group">
                    <span className="relative">
                      {cat}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Company</h3>
            <ul className="space-y-4 text-sm text-foreground-muted">
              <li>
                <a href="https://www.maxoillubricant.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors block w-fit group">
                  <span className="relative">
                    Corporate Site
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors block w-fit group">
                  <span className="relative">
                    ISO Certificates
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors block w-fit group">
                  <span className="relative">
                    Terms of Service
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h3>
            <div className="space-y-4 text-sm text-foreground-muted">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-light leading-relaxed">{t('address')}</span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+97172681705" className="hover:text-gold transition-colors font-light">+971 7 268 1705</a>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:sales@maxoillubricant.com" className="hover:text-gold transition-colors font-light">sales@maxoillubricant.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1A1A28] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium tracking-widest text-foreground-muted uppercase">
            &copy; {year} MAX Oil and Lubricant FZ-LLC UAE
          </p>
          <div className="flex items-center gap-4">
            {/* Social Icons (Placeholders) */}
            <a href="#" className="text-foreground-muted hover:text-gold transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-foreground-muted hover:text-gold transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
