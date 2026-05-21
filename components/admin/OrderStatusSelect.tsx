'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/lib/actions/adminActions';
import { useTranslations } from 'next-intl';

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('admin.status');

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    const res = await updateOrderStatus(orderId, newStatus);
    if (!res.success) {
      alert('Failed to update status: ' + res.error);
      setStatus(currentStatus); // Revert
    }
    setLoading(false);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'confirmed': return 'bg-gold/10 text-gold border-gold/20';
      case 'delivered': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-white border-white/10';
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className={`text-xs px-3 py-1.5 rounded-full border outline-none appearance-none cursor-pointer ${getStatusColor(status)} ${loading ? 'opacity-50' : ''}`}
    >
      <option value="new" className="bg-[#0A0A0F] text-white">{t('new')}</option>
      <option value="confirmed" className="bg-[#0A0A0F] text-white">{t('confirmed')}</option>
      <option value="delivered" className="bg-[#0A0A0F] text-white">{t('delivered')}</option>
      <option value="cancelled" className="bg-[#0A0A0F] text-white">{t('cancelled')}</option>
    </select>
  );
}
