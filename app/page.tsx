import Navbar from '@/components/global/navbar';
import ExploreMore from '@/components/sections/ExploreMore';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function Home() {
  return (
    <main className=''>
      <Navbar />
      <Hero />
      <Process />
      <WhyChooseUs />
      <ExploreMore />
    </main>
  );
}
