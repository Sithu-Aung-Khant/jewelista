import { type SanityDocument } from 'next-sanity';
import { ProductCard } from '@/components/global/ProductCard';
import { client } from '@/app/sanity/client';

const PRODUCTS_QUERY = `*[
  _type == "product" && defined(slug.current)
]|order(_createdAt desc)[0...12]{
  _id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  description,
  price,
  category,
  material,
  rating,
  stock,
  tags
}`;

const options = { next: { revalidate: 30 } };

export default async function ProductsPage() {
  const products = await client.fetch<SanityDocument[]>(
    PRODUCTS_QUERY,
    {},
    options
  );

  // We'll assume desktop view for server-side rendering since we can't detect screen size
  const isMobile = false;

  return (
    <main className='container mx-auto min-h-screen p-8'>
      <h1 className='text-4xl font-bold mb-8'>Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={{
              id: parseInt(product._id.replace(/^[^0-9]+/, '')), // Extract numeric part from _id
              image: product.image || '/placeholder.jpg',
              name: product.name,
              description: product.description || '',
              price: product.price || 0,
              category: product.category || '',
              material: product.material || '',
              rating: product.rating || 0,
              stock: product.stock || 0,
              tags: product.tags || [],
            }}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>
    </main>
  );
}
