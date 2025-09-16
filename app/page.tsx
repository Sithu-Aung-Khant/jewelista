import Navbar from '@/components/global/navbar';
import Footer from '@/components/sections/Footer';
import ExploreMore from '@/components/sections/ExploreMore';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import ProductList from '@/components/sections/ProductList';
import ProductListSanity from '@/components/sections/ProductListSanity';
import InitialLoadingWrapper from '@/components/global/InitialLoadingWrapper';
import { Suspense } from 'react';

export default function Home() {
  return (
    <InitialLoadingWrapper>
      <main className=''>
        <Navbar />
        <Hero />
        <Process />
        <ProductList />
        <Suspense
          fallback={
            <div className='w-full py-16 px-10 md:px-8'>
              Loading products...
            </div>
          }
        >
          <ProductListSanity />
        </Suspense>
        <WhyChooseUs />
        <ExploreMore />
        <Testimonials />
        <Footer />
      </main>
    </InitialLoadingWrapper>
  );
}
