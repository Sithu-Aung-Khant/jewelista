/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'randomuser.me',
      'salve.co.in',
      'www.bsa-images.com',
      'www.my-jewellery.com',
      'i00.eu',
      'images.laceandfavour.com',
      'www.tanishq.co.in',
      'cdn.sanity.io', // Add this line to allow Sanity CDN images
    ],
  },
};

export default nextConfig;
