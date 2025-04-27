"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/sections/Footer";
import ExploreMore from "@/components/sections/ExploreMore";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { LoadingScreen } from "@/components/global/LoadingScreen";
import ProductList from "@/components/sections/ProductList";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");

    if (isFirstVisit === null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("isFirstVisit", "false");
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className=''>
      <Navbar />
      <Hero />
      <Process />
      <ProductList />
      <WhyChooseUs />
      <ExploreMore />
      <Testimonials />
      <Footer />
    </main>
  );
}
