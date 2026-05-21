'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.error('Failed to update order status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/[locale]/hq-panel-9k2m', 'page');
  return { success: true };
}

export async function createOrder(data: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .insert([
      {
        product_name: data.product_name,
        volume: data.volume,
        quantity: data.quantity,
        status: data.status || 'new',
        note: data.note,
        telegram_username: data.telegram_username,
      }
    ]);

  if (error) {
    console.error('Failed to create order:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/[locale]/hq-panel-9k2m', 'page');
  return { success: true };
}

export async function createProduct(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').insert([data]);
  if (error) {
    console.error('Failed to create product:', error);
    return { success: false, error: error.message };
  }
  revalidatePath('/[locale]/hq-panel-9k2m/products', 'page');
  return { success: true };
}

export async function updateProduct(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').update(data).eq('id', id);
  if (error) {
    console.error('Failed to update product:', error);
    return { success: false, error: error.message };
  }
  revalidatePath('/[locale]/hq-panel-9k2m/products', 'page');
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    console.error('Failed to delete product:', error);
    return { success: false, error: error.message };
  }
  revalidatePath('/[locale]/hq-panel-9k2m/products', 'page');
  return { success: true };
}
