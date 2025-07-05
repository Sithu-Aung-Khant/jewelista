import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  rating: number;
  stock: number;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  isMobile: boolean;
  truncateName?: boolean;
}

export function ProductCard({
  product,
  index,
  isMobile,
  truncateName = false,
}: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        className='py-6 px-4 border border-border-brown relative group hover:shadow-lg transition-all duration-300 cursor-pointer'
        initial={{
          opacity: 0,
          y: isMobile ? 0 : 20,
          scale: isMobile ? 0.95 : 1,
        }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className='relative aspect-square w-full mb-4 overflow-hidden'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='text-center'>
          <h3
            className={`font-medium text-dark-brown text-lg mb-2 ${
              truncateName ? 'truncate' : ''
            }`}
          >
            {product.name}
          </h3>
          <p className='text-[#505050] text-sm mb-2'>{product.material}</p>
          <p className='text-dark-brown font-semibold'>
            {product.price.toLocaleString()} MMK
          </p>
          <div className='flex items-center justify-center gap-2 mt-2'>
            <span className='text-yellow-500'>★</span>
            <span className='text-sm text-gray-600'>{product.rating}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
