import type { Metadata } from 'next';
// import localFont from "next/font/local";
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import { SanityShoppingCartProvider } from '@/context/SanityShoppingCartContext';
import { Toaster } from 'sonner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'My Jewel - Premium Jewelry Store',
  description:
    'Discover exquisite jewelry pieces including rings, necklaces, earrings, and bracelets. Premium quality jewelry for every occasion.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} antialiased bg-white text-dark-brown`}
      >
        <ShoppingCartProvider>
          <SanityShoppingCartProvider>
            <Toaster position='top-center' />
            <main>{children}</main>
          </SanityShoppingCartProvider>
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
