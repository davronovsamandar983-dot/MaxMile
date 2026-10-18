import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProduct, productsByLine } from '@/data/catalog';
import { ProductDetail } from '@/components/products/ProductDetail';
import { SITE_URL, MANUFACTURER } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.line} ${product.name}`;
  const description = `${product.text.uz.tagline}. ${product.text.en.tagline}.`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | MaxMiles Lubricants`,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: [{ url: product.image, alt: title }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = productsByLine(product.line)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.line} ${product.name}`,
    description: product.text.en.description,
    image: `${SITE_URL}${product.image}`,
    brand: { '@type': 'Brand', name: 'MaxMiles' },
    manufacturer: { '@type': 'Organization', name: MANUFACTURER },
    category: product.line,
    url: `${SITE_URL}/products/${product.slug}`,
  };

  return (
    <section className="pb-24 pt-28 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ProductDetail product={product} related={related} />
    </section>
  );
}
