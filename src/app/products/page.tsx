import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsBrowser } from '@/components/products/ProductsBrowser';

export const metadata: Metadata = {
  title: 'Mahsulotlar katalogi',
  description:
    "MaxMiles moylari katalogi: 39 ta mahsulot — ULTRA yengil avtomobil, POWER yuk mashinasi, MOTA mototsikl, GEARA uzatma, FREEZA antifriz, FORSA tormoz, HYDRA gidravlik, SMOOTHE surkov moylari va ADDIT qo'shimchalar.",
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <section className="pb-24">
      <Suspense fallback={<div className="container-x py-40 text-center text-sm text-white/40">…</div>}>
        <ProductsBrowser />
      </Suspense>
    </section>
  );
}
