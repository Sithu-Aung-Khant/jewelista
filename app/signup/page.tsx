import { Suspense } from 'react';
import SignUpForm from '../../components/signup/SignUpForm';

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-offwhite">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-6 md:-mt-32 bg-white border border-border-brown rounded-xl shadow-lg">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-playfair-display text-dark-brown mb-2">Create your account</h1>
          <p className="text-sm text-light-brown font-dm-sans">Sign up to get started with Jewelista</p>
        </div>
        <Suspense>
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
