import { createClient } from '@/lib/supabase/server';
import AddOrderForm from '@/components/admin/AddOrderForm';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import type { Order } from '@/lib/types';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Admin Dashboard | MaxMiles',
  description: 'Manage your orders and inventory.',
};

export default async function AdminPage() {
  const supabase = await createClient();
  const t = await getTranslations('admin.orders');

  // Fetch orders
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AddOrderForm />
      </div>

      <div className="bg-[#05050A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground-muted">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-white">
              <tr>
                <th className="px-6 py-4 font-medium">{t('id')}</th>
                <th className="px-6 py-4 font-medium">{t('date')}</th>
                <th className="px-6 py-4 font-medium">{t('customer')}</th>
                <th className="px-6 py-4 font-medium">{t('product')}</th>
                <th className="px-6 py-4 font-medium">{t('qty')}</th>
                <th className="px-6 py-4 font-medium">{t('status')}</th>
                <th className="px-6 py-4 font-medium">{t('note')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {!orders || orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-white/50">
                    {t('noOrders')}
                  </td>
                </tr>
              ) : (
                orders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">
                      {order.id.split('-')[0]}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {order.telegram_username ? `@${order.telegram_username}` : 'Guest'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {order.product_name || 'N/A'}
                      </div>
                      <div className="text-xs">{order.volume || ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white/10 px-2 py-1 rounded text-white font-mono">
                        {order.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </td>
                    <td className="px-6 py-4 text-xs max-w-xs truncate" title={order.note || ''}>
                      {order.note || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
