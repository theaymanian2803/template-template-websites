'use server'

import { signIn, signOut } from '@/auth'
import { signInFormSchema, signUpFormSchema } from '../validator'
import { AuthError } from 'next-auth'
import { hashSync } from 'bcrypt-ts-edge'
import { prisma } from '@/db/prisma'
import { formatError } from '../utils'

// ---------------------------------------------------------
// Sign In Action
// ---------------------------------------------------------
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
    // We handle this specifically here to return a user-friendly message for bad credentials
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Invalid email or password' }
        default:
          return { success: false, message: error.message }
      }
    }

    // 3. HANDLE VALIDATION (ZOD) & GENERIC ERRORS
    // formatError will handle Zod validation errors if .parse() fails
    return { success: false, message: formatError(error) }
  }
}

// ---------------------------------------------------------
// Sign Out Action
// ---------------------------------------------------------
export async function signOutUser() {
  await signOut()
}

// ---------------------------------------------------------
// Sign Up Action
// ---------------------------------------------------------
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    })

    const plainPassword = user.password

    // Hash password
    user.password = hashSync(user.password, 10)

    // Create user in DB
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: 'user', // Default role
      },
    })

    // Auto-login after creation
    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
      redirect: true,
    })

    return { success: true, message: 'User created successfully' }
  } catch (error: any) {
    // 1. HANDLE REDIRECT (SUCCESS)
    // The signIn inside signUp will throw this on success. We must let it pass.
    if (error && error.digest && error.digest.includes('NEXT_REDIRECT')) {
      throw error
    }

    // 2. HANDLE EVERYTHING ELSE (Prisma, Zod, etc.)
    // formatError handles P2002 (duplicate email) and Zod validation errors automatically
    return { success: false, message: formatError(error) }
  }
}
