'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../lib/supabase';
import { X, Send, ShoppingCart } from 'lucide-react';

interface OrderModalProps {
  product: Product;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, onClose }) => {
  const { t, locale } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [volume, setVolume] = useState(product.volumes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const productName = locale === 'ru' ? product.name_ru : locale === 'en' ? product.name_en : product.name_uz;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format message for Telegram
    const messageText = encodeURIComponent(
      `🛍️ **Yangi Buyurtma (MaxMiles)**\n\n` +
      `📦 **Mahsulot:** ${productName}\n` +
      `📐 **Hajmi:** ${volume}\n` +
      `🔢 **Soni:** ${quantity} ta\n` +
      `👤 **Mijoz:** ${name}\n` +
      `📞 **Telefon:** ${phone}\n` +
      (note ? `📝 **Izoh:** ${note}\n` : '') +
      `🔗 **Mahsulot havolasi:** ${window.location.origin}/products/${product.slug}`
    );

    // Opening telegram with pre-filled message (universal share method to manager / bot)
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${messageText}`;
    window.open(telegramUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with premium blur */}
      <div className="absolute inset-0 bg-[#07070A]/85 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[#0F0F16] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#C8A951]/10 rounded-xl border border-[#C8A951]/20">
              <ShoppingCart className="w-5 h-5 text-[#C8A951]" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t.products.orderModalTitle}</h3>
          </div>

          <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] uppercase font-bold text-[#C8A951] tracking-widest">{product.category}</span>
            <h4 className="text-lg font-bold text-white mt-1 uppercase tracking-wider">{productName}</h4>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
              {product.sae_grade && <span>SAE: {product.sae_grade}</span>}
              {product.api_spec && <span>API: {product.api_spec}</span>}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.products.orderFormName}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.products.orderFormPhone}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="+998 (90) 123-45-67"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.products.orderFormVolume}</label>
                <select
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm uppercase font-semibold"
                >
                  {product.volumes.map((vol) => (
                    <option key={vol} value={vol} className="bg-[#0F0F16] text-white">
                      {vol}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.products.orderFormQty}</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">{t.products.note}</label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Qo'shimcha ma'lumot qoldiring..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#C8A951] to-[#E5C367] hover:from-[#B09340] hover:to-[#C8A951] text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-[#C8A951]/10 flex items-center justify-center space-x-2 text-sm"
            >
              <Send className="w-4 h-4 text-black" />
              <span>{t.products.orderFormSubmit}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
