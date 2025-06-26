import { Suspense } from 'react';
import LoginForm from '../../components/login/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-offwhite">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-6 md:-mt-32 bg-white border border-border-brown rounded-xl shadow-lg">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-playfair-display text-dark-brown mb-2">Sign in to your account</h1>
          <p className="text-sm text-light-brown font-dm-sans">Welcome back! Please enter your details below.</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}