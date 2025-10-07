import type { Metadata } from 'next';
import { auth } from '@/auth';
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
  title: 'Jewelista — Fine Jewelry for Every Moment',
  description:
    'Timeless designs crafted with care. Discover rings, necklaces, earrings, and bracelets for every moment.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userKey = (session?.user?.id ||
    session?.user?.email ||
    'guest') as string;

  return (
    <html lang='en'>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} antialiased bg-white text-dark-brown`}
      >
        <div key={userKey}>
          <ShoppingCartProvider>
            <SanityShoppingCartProvider>
              <Toaster position='top-center' />
              <main>{children}</main>
            </SanityShoppingCartProvider>
          </ShoppingCartProvider>
        </div>
      </body>
    </html>
  );
}
