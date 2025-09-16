import { type SanityDocument } from 'next-sanity';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '../global/ProductCard';
import { client } from '@/app/sanity/client';
import AnimatedHeading from '../ui/AnimatedHeading';

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

export default async function ProductListSanity() {
  const products = await client.fetch<SanityDocument[]>(
    PRODUCTS_QUERY,
    {},
    options
  );

  // We'll assume desktop view for server-side rendering since we can't detect screen size
  const isMobile = false;

  return (
    <section className='w-full py-16 px-10 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        <AnimatedHeading>Products from CMS</AnimatedHeading>
        <Carousel opts={{ align: 'start' }} className='w-full relative'>
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={product._id} className='md:basis-1/4'>
                <ProductCard
                  product={{
                    id: product._id,
                    isSanityProduct: true,
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
                  truncateName
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2' />
          <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2' />
          <CarouselDots className='mt-10' />
        </Carousel>
      </div>
    </section>
  );
}
