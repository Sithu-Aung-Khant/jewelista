'use server';

// Mock user for development
const MOCK_USER = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // Mock authentication
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Simulate successful login
      return undefined; // No error means success
    }

    return 'Invalid credentials.';
  } catch {
    return 'Something went wrong.';
  }
}

export async function signOutAction() {
  // Mock sign out - just redirect
  window.location.href = '/';
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // Mock signup validation
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return 'Please check your input and try again.';
    }

    // Mock successful signup
    return 'success';
  } catch (error) {
    console.error('Signup error:', error);
    return 'Something went wrong during signup. Please try again.';
  }
}
