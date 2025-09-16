import { client } from '@/app/sanity/client';
import { ProductDetailsNavbar } from '@/components/global/ProductDetailsNavbar';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

// Define the product query
const PRODUCT_QUERY = `*[_type == "product" && _id == $id][0]{
  _id,
  name,
  price,
  description,
  "image": image.asset->url,
  category,
  material,
  stock,
  rating,
  tags
}`;

const options = { next: { revalidate: 30 } };

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await client.fetch(PRODUCT_QUERY, { id: params.id }, options);

  if (!product) {
    notFound();
  }

  const imageUrl = product.image || null;

  return (
    <>
      <ProductDetailsNavbar />
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <div className='grid items-center grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10'>
          {/* Product Image */}
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
                quality={50}
              />
            )}
          </div>

          {/* Product Details */}
          <div className='flex flex-col space-y-6'>
            <div>
              <h1 className='text-3xl font-playfair-display text-dark-brown mb-2'>
                {product.name}
              </h1>
              <p className='text-xl font-semibold text-dark-brown'>
                {product.price?.toLocaleString()} MMK
              </p>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <span className='text-yellow-500'>★</span>
                <span className='text-sm text-gray-600'>{product.rating}</span>
              </div>
              <p className='text-gray-600'>{product.description}</p>
              <div className='space-y-2'>
                <p className='text-sm text-gray-600'>
                  Category:{' '}
                  <span className='font-medium'>{product.category}</span>
                </p>
                <p className='text-sm text-gray-600'>
                  Material:{' '}
                  <span className='font-medium'>{product.material}</span>
                </p>
                <p className='text-sm text-gray-600'>
                  Stock:{' '}
                  <span className='font-medium'>{product.stock} available</span>
                </p>
              </div>
            </div>

            {/* Add to Cart Button - Client Component */}
            <AddToCartButton product={product} />

            {/* Tags */}
            {product.tags && (
              <div className='flex flex-wrap gap-2 pt-4'>
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
