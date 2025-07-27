import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn) {
        return false; // Redirect unauthenticated users to the login page
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
