'use client';

import { useState } from 'react';
import { deleteProduct } from '@/lib/actions/adminActions';
import { useTranslations } from 'next-intl';

export default function DeleteProductButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('admin.products');

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    const res = await deleteProduct(productId);
    if (!res.success) {
      alert('Failed to delete: ' + res.error);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1 rounded bg-red-500/10 border border-red-500/20 disabled:opacity-50 transition-colors"
    >
      {loading ? '...' : t('delete')}
    </button>
  );
}
