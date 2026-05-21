'use client';

import { useState } from 'react';
import { createProduct, updateProduct } from '@/lib/actions/adminActions';
import type { Product, Category } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES: Category[] = [
  'ULTRA', 'POWER', 'MOTA', 'GEARA', 'FREEZA', 'FORSA', 'HYDRA', 'SMOOTHE', 'ADDIT'
];

export default function ProductForm({ productToEdit }: { productToEdit?: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(productToEdit?.image_url || null);
  const isEditing = !!productToEdit;
  const t = useTranslations('admin.products');
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = productToEdit?.image_url || null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, imageFile);

      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      slug: formData.get('slug'),
      name_en: formData.get('name_en'),
      name_ru: formData.get('name_ru'),
      name_uz: formData.get('name_uz'),
      category: formData.get('category'),
      sae_grade: formData.get('sae_grade') || null,
      price_uzs: parseInt(formData.get('price_uzs') as string, 10),
      image_url: finalImageUrl,
      in_stock: formData.get('in_stock') === 'true',
      featured: formData.get('featured') === 'true',
      volumes: (formData.get('volumes') as string).split(',').map(v => v.trim()).filter(Boolean),
    };

    let res;
    if (isEditing && productToEdit) {
      res = await updateProduct(productToEdit.id, data);
    } else {
      res = await createProduct(data);
    }

    if (res.success) {
      setIsOpen(false);
      setImageFile(null);
    } else {
      alert(`Failed to ${isEditing ? 'update' : 'create'} product: ${res.error}`);
    }
    setLoading(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={isEditing 
          ? "text-blue-400 hover:text-blue-300 text-xs font-semibold px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 transition-colors"
          : "bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
        }
      >
        {isEditing ? t('edit') : t('addBtn')}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative my-8">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-white mb-6">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Slug (URL)</label>
              <input
                name="slug"
                required
                defaultValue={productToEdit?.slug}
                placeholder="e.g. ultra-5w-30"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Category</label>
              <select
                name="category"
                required
                defaultValue={productToEdit?.category || 'ULTRA'}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Name (EN)</label>
              <input name="name_en" required defaultValue={productToEdit?.name_en} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Name (RU)</label>
              <input name="name_ru" required defaultValue={productToEdit?.name_ru} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Name (UZ)</label>
              <input name="name_uz" required defaultValue={productToEdit?.name_uz} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground-muted mb-1">SAE Grade</label>
              <input name="sae_grade" defaultValue={productToEdit?.sae_grade || ''} placeholder="e.g. 5W-30" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm text-foreground-muted mb-1">Price (UZS)</label>
              <input name="price_uzs" type="number" required defaultValue={productToEdit?.price_uzs || 0} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-foreground-muted mb-1">Volumes (comma separated)</label>
            <input name="volumes" required defaultValue={productToEdit?.volumes?.join(', ') || '1L, 4L, 20L'} placeholder="1L, 4L, 20L" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" />
          </div>

          <div>
            <label className="block text-sm text-foreground-muted mb-1">Product Image</label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-contain bg-white/5 border border-white/10 rounded-lg" />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-2xl">
                  🛢️
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
            </div>
          </div>

          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="checkbox" name="in_stock" value="true" defaultChecked={isEditing ? productToEdit?.in_stock : true} className="accent-gold" />
              In Stock
            </label>
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="checkbox" name="featured" value="true" defaultChecked={productToEdit?.featured || false} className="accent-gold" />
              Featured
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white/70 hover:text-white">Cancel</button>
            <button type="submit" disabled={loading} className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
