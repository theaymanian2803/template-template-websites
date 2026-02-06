'use server'

import { signIn, signOut } from '@/auth'
import { signInFormSchema } from '../validator'
import { AuthError } from 'next-auth'

export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    await signIn('credentials', user)

    return { success: true, message: 'Signed in successfully' }
  } catch (error: any) {
    // 1. HANDLE REDIRECT (SUCCESS)
    // Next.js throws a specific error when redirecting. We must let it pass.
    if (error && error.digest && error.digest.includes('NEXT_REDIRECT')) {
      throw error
    }

    // 2. HANDLE AUTH ERRORS (FAILURE)
    // This catches the "CredentialsSignin" error specifically
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Invalid email or password' }
        default:
          return { success: false, message: error.message }
      }
    }

    // 3. HANDLE GENERIC ERRORS
    // If it's not a redirect and not an auth error, it's something else.
    return { success: false, message: 'Invalid email or password' }
  }
}

export async function signOutUser() {
  await signOut()
}
