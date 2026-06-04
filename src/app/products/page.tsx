'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { supabase, Product, CATEGORIES } from '../../lib/supabase';
import { Search, SlidersHorizontal, MessageSquare, Tag, Eye } from 'lucide-react';
import Link from 'next/link';

function ProductsContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Category
  const catParam = searchParams.get('cat') || 'ALL';
  


  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name_uz', { ascending: true });

      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (catParam !== 'ALL') {
      result = result.filter(p => p.category === catParam);
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name_uz.toLowerCase().includes(q) ||
        p.name_ru.toLowerCase().includes(q) ||
        p.name_en.toLowerCase().includes(q) ||
        (p.sae_grade && p.sae_grade.toLowerCase().includes(q)) ||
        (p.api_spec && p.api_spec.toLowerCase().includes(q))
      );
    }

    setFilteredProducts(result);
  }, [products, catParam, searchQuery]);

  const handleCategoryChange = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key === 'ALL') {
      params.delete('cat');
    } else {
      params.set('cat', key);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#07070A] py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C8A951]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C8A951] font-bold bg-[#C8A951]/10 px-3.5 py-1.5 rounded-full border border-[#C8A951]/20">
            {t.nav.products}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 uppercase tracking-wider text-gold-gradient">
            {catParam === 'ALL' ? t.products.all : catParam}
          </h1>
          <div className="h-1 w-16 bg-[#C8A951] mx-auto mt-4"></div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder={t.products.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0F0F16] border border-white/5 text-white focus:outline-none focus:border-[#C8A951] transition-all placeholder-gray-600 text-sm shadow-xl"
              />
            </div>
          </div>

          {/* Categories Horizontal Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('ALL')}
              className={`px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 shrink-0 border ${catParam === 'ALL' ? 'bg-[#C8A951] text-black border-[#C8A951]' : 'bg-[#0F0F16] text-gray-400 border-white/5 hover:text-white hover:border-white/10'}`}
            >
              {t.products.all}
            </button>
            {CATEGORIES.map((category) => {
              const label = locale === 'ru' ? category.label_ru : locale === 'en' ? category.label_en : category.label_uz;
              const isSelected = catParam === category.key;
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 shrink-0 border flex items-center space-x-2 ${isSelected ? 'text-black border-transparent' : 'bg-[#0F0F16] text-gray-400 border-white/5 hover:text-white hover:border-white/10'}`}
                  style={{
                    backgroundColor: isSelected ? category.color : undefined,
                  }}
                >
                  <span>{category.icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-[#C8A951] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Yuklanmoqda...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl border border-white/5">
            <span className="text-5xl">🔍</span>
            <h3 className="text-xl font-bold text-white mt-4 uppercase tracking-wider">Mahsulotlar topilmadi</h3>
            <p className="text-gray-500 text-sm mt-2">Boshqa kalit so\'zlar bilan qidirib ko\'ring</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const categoryObj = CATEGORIES.find(c => c.key === product.category);
              const productName = locale === 'ru' ? product.name_ru : locale === 'en' ? product.name_en : product.name_uz;
              const categoryLabel = categoryObj ? (locale === 'ru' ? categoryObj.label_ru : locale === 'en' ? categoryObj.label_en : categoryObj.label_uz) : product.category;

              return (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full border border-white/5 relative group"
                >
                  {/* Category Indicator Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border shadow-md flex items-center space-x-1"
                      style={{
                        backgroundColor: `${categoryObj?.color || '#C8A951'}15`,
                        color: categoryObj?.color || '#C8A951',
                        borderColor: `${categoryObj?.color || '#C8A951'}30`
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      <span>{product.category}</span>
                    </span>
                  </div>

                  {/* Product Image Area with rich gradient */}
                  <div className="aspect-[4/3] w-full bg-gradient-to-b from-[#11111a] to-[#0A0A0F] relative overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={productName}
                        className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <span className="text-5xl">🛢️</span>
                    )}

                    {/* Quick View overlay */}
                    <div className="absolute inset-0 bg-[#07070A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 z-20">
                      <Link
                        href={`/products/${product.slug}`}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                        title="Batafsil ko'rish"
                      >
                        <Eye className="w-5 h-5 text-[#C8A951]" />
                      </Link>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Technical Specs quick details */}
                      <div className="flex items-center space-x-3 mb-2 text-xs font-semibold text-gray-500">
                        {product.sae_grade && (
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            SAE {product.sae_grade}
                          </span>
                        )}
                        {product.api_spec && (
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {product.api_spec}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider line-clamp-2 group-hover:text-[#C8A951] transition-colors">
                        {productName}
                      </h3>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      {/* Volumes */}
                      <div className="mb-4">
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block mb-1.5">Hajmlar:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.volumes.map((vol) => (
                            <span key={vol} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400 font-medium uppercase">
                              {vol}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href="https://t.me/maxmile_oil_bot"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-[#0F0F16] hover:bg-gradient-to-r hover:from-[#C8A951] hover:to-[#E5C367] text-gray-300 hover:text-black font-semibold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 border border-white/5 hover:border-transparent flex items-center justify-center space-x-2 shadow-lg text-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t.products.order}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#C8A951] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Yuklanmoqda...</span>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
