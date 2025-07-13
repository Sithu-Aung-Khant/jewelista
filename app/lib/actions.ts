'use server';

import { signIn } from '@/auth';
import { signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
    // After successful login, redirect to home page
    redirect('/');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // Validate form data
    const validatedFields = SignupSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return 'Please check your input and try again.';
    }

    const { name, email, password } = validatedFields.data;

    // Check if email already exists
    const existingUser = await sql`
      SELECT email FROM users WHERE email=${email}
    `;

    if (existingUser.length > 0) {
      return 'Email already registered. Please use a different email.';
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    // Return success instead of redirecting
    return 'success';
  } catch (error) {
    console.error('Signup error:', error);
    return 'Something went wrong during signup. Please try again.';
  }
}
