import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import type { Product } from '@/lib/types';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Admin Products | MaxMiles',
};

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const t = await getTranslations('admin.products');

  // Fetch products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ProductForm />
      </div>

      <div className="bg-[#05050A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground-muted">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-white">
              <tr>
                <th className="px-6 py-4 font-medium">{t('product')}</th>
                <th className="px-6 py-4 font-medium">{t('category')}</th>
                <th className="px-6 py-4 font-medium">{t('saeGrade')}</th>
                <th className="px-6 py-4 font-medium">{t('price')}</th>
                <th className="px-6 py-4 font-medium">{t('stock')}</th>
                <th className="px-6 py-4 font-medium text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {!products || products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/50">
                    {t('noProducts')}
                  </td>
                </tr>
              ) : (
                products.map((product: Product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name_en} className="w-10 h-10 object-contain bg-white/5 rounded" />
                        ) : (
                          <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center text-lg">🛢️</div>
                        )}
                        <div>
                          <div className="text-white font-medium">{product.name_en}</div>
                          <div className="text-xs">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {product.sae_grade || '-'}
                    </td>
                    <td className="px-6 py-4 font-mono">
                      {product.price_uzs.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {product.in_stock ? (
                        <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs border border-green-500/20">In Stock</span>
                      ) : (
                        <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs border border-red-500/20">Out of Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <ProductForm productToEdit={product} />
                        <DeleteProductButton productId={product.id} />
                      </div>
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
