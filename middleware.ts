import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Exclude signup, api, static, and image paths from authentication
  matcher: ['/((?!api|_next/static|_next/image|signup|.*\\.png$).*)'],
};
