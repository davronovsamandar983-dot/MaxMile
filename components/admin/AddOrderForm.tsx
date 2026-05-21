'use client';

import { useState } from 'react';
import { createOrder } from '@/lib/actions/adminActions';
import { useTranslations } from 'next-intl';

export default function AddOrderForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('admin.orders');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      product_name: formData.get('product_name'),
      volume: formData.get('volume'),
      quantity: parseInt(formData.get('quantity') as string, 10),
      status: formData.get('status'),
      note: formData.get('note'),
      telegram_username: formData.get('telegram_username'),
    };

    const res = await createOrder(data);
    if (res.success) {
      setIsOpen(false);
    } else {
      alert('Failed to create order: ' + res.error);
    }
    setLoading(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
      >
        {t('addBtn')}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-white mb-6">Add New Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-foreground-muted mb-1">Product Name</label>
            <input
              name="product_name"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Volume</label>
              <input
                name="volume"
                placeholder="e.g. 4L"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Quantity</label>
              <input
                name="quantity"
                type="number"
                min="1"
                required
                defaultValue="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Status</label>
              <select
                name="status"
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
              >
                <option value="new">New</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Telegram Username</label>
              <input
                name="telegram_username"
                placeholder="@username"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-foreground-muted mb-1">Note</label>
            <textarea
              name="note"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-white/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
