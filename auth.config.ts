import type { NextAuthConfig } from 'next-auth';

// Mock auth config for development
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized() {
      // For development, always return true to simulate authenticated state
      return true;
    },
  },
  providers: [], // Empty providers for mock auth
} satisfies NextAuthConfig;
