'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { supabase, Product, CATEGORIES } from '../../../lib/supabase';
import { ArrowLeft, MessageSquare, ShieldCheck, Tag, Info, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProductDetails() {
      if (!slug) return;
      setLoading(true);

      // Fetch current product
      const { data: currentProduct, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (currentProduct) {
        setProduct(currentProduct);

        // Fetch related products (same category, max 4)
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category', currentProduct.category)
          .neq('id', currentProduct.id)
          .limit(4);

        if (related) {
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    }
    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#C8A951] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Mahsulot yuklanmoqda...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center space-y-4">
        <span className="text-5xl">⚠️</span>
        <h2 className="text-2xl font-bold uppercase text-white">Mahsulot topilmadi</h2>
        <Link href="/products" className="text-[#C8A951] hover:underline flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha mahsulotlarga qaytish</span>
        </Link>
      </div>
    );
  }

  const productName = locale === 'ru' ? product.name_ru : locale === 'en' ? product.name_en : product.name_uz;
  const productDesc = locale === 'ru' ? product.description_ru : locale === 'en' ? product.description_en : product.description_uz;
  const productProps = locale === 'ru' ? product.properties_ru : locale === 'en' ? product.properties_en : product.properties_uz;
  const categoryObj = CATEGORIES.find(c => c.key === product.category);

  return (
    <div className="min-h-screen bg-[#07070A] py-12 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C8A951]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center space-x-2 text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-[#C8A951] transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          <span>Orqaga</span>
        </button>

        {/* Main Details block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Product Image Panel with premium styling */}
          <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-b from-[#11111a] to-[#0A0A0F] border border-white/5 p-8 sm:p-16 flex items-center justify-center relative shadow-2xl overflow-hidden group">
            {/* Color Glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] opacity-10 group-hover:opacity-25 transition-all duration-700"
              style={{ backgroundColor: categoryObj?.color || '#C8A951' }}
            ></div>

            {product.image_url ? (
              <img
                src={product.image_url}
                alt={productName}
                className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <span className="text-8xl">🛢️</span>
            )}
          </div>

          {/* Info details panel */}
          <div className="space-y-8">
            <div>
              {/* Category tag */}
              <span
                className="text-xs uppercase font-bold px-3 py-1 rounded-full border shadow-md inline-flex items-center space-x-1 mb-4"
                style={{
                  backgroundColor: `${categoryObj?.color || '#C8A951'}15`,
                  color: categoryObj?.color || '#C8A951',
                  borderColor: `${categoryObj?.color || '#C8A951'}30`
                }}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>{product.category}</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wider leading-tight">
                {productName}
              </h1>
            </div>

            {/* Specifications quick card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              {product.sae_grade && (
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">SAE Grade</span>
                  <span className="text-sm font-bold text-[#C8A951]">{product.sae_grade}</span>
                </div>
              )}
              {product.api_spec && (
                <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">API Specification</span>
                  <span className="text-sm font-bold text-[#C8A951]">{product.api_spec}</span>
                </div>
              )}
              <div className="p-3 bg-black/30 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Holati</span>
                <span className="text-sm font-bold text-green-500 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Bor</span>
                </span>
              </div>
            </div>

            {/* Description */}
            {productDesc && (
              <div className="space-y-3">
                <h3 className="text-sm uppercase font-bold tracking-wider text-gray-400 flex items-center space-x-2">
                  <Info className="w-4 h-4 text-[#C8A951]" />
                  <span>{t.products.description}</span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line bg-white/5 p-6 rounded-2xl border border-white/5">
                  {productDesc}
                </p>
              </div>
            )}

            {/* Properties/Features list */}
            {productProps && productProps.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm uppercase font-bold tracking-wider text-gray-400 flex items-center space-x-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#C8A951]" />
                  <span>{t.products.specsLabel}</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productProps.map((prop, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-400 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-[#C8A951]/20 transition-all">
                      <span className="text-[#C8A951] font-bold text-sm shrink-0">✓</span>
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action panel (Volume switcher & Order btn) */}
            <div className="pt-6 border-t border-white/5 space-y-6">
              {/* Volume list */}
              <div>
                <span className="text-xs uppercase font-bold text-gray-400 block mb-3">{t.products.volume}</span>
                <div className="flex flex-wrap gap-2.5">
                  {product.volumes.map((vol) => (
                    <span
                      key={vol}
                      className="px-4 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider border bg-white/5 text-gray-400 border-white/5"
                    >
                      {vol}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/maxmile_oil_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow py-4 bg-gradient-to-r from-[#C8A951] to-[#E5C367] hover:from-[#B09340] hover:to-[#C8A951] text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-[#C8A951]/20 flex items-center justify-center space-x-2.5 text-sm text-center"
                >
                  <MessageSquare className="w-5 h-5 text-black" />
                  <span>{t.products.order}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Related Products Panel */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/5 pt-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-[#C8A951]" />
                <span>{t.products.related}</span>
              </h2>
              <Link href={`/products?cat=${product.category}`} className="text-sm font-semibold uppercase tracking-wider text-[#C8A951] hover:underline">
                Barchasi →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => {
                const pName = locale === 'ru' ? p.name_ru : locale === 'en' ? p.name_en : p.name_uz;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full border border-white/5 relative group p-6"
                  >
                    <div className="aspect-[4/3] w-full bg-gradient-to-b from-[#11111a] to-[#0A0A0F] relative overflow-hidden flex items-center justify-center p-4 rounded-xl mb-4">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={pName}
                          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-4xl">🛢️</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider line-clamp-2 group-hover:text-[#C8A951] transition-colors">
                        {pName}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2 text-[10px] text-gray-500 font-semibold">
                        {p.sae_grade && <span>SAE {p.sae_grade}</span>}
                        {p.api_spec && <span>{p.api_spec}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
