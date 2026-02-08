import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        })

        // Check if user exists and password is correct
        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password)

          if (isMatch) {
            // Return valid object for JWT
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    // 1. JWT Callback: Called whenever a token is created or updated
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        // Initial sign in: Add role and id to the token
        token.role = user.role
        token.id = user.id

        // Handle the "NO_NAME" edge case logic
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]

          // Update DB (fire and forget, don't await to block login)
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
      }

      // Handle session updates (e.g., when client calls update())
      if (trigger === 'update' && session) {
        token.name = session.user.name
      }

      return token
    },

    // 2. Session Callback: Called whenever the session is checked (e.g., client or server)
    async session({ session, token, trigger, user }: any) {
      // In 'jwt' strategy, 'user' is undefined here. Everything comes from 'token'.

      // Pass ID from token to session
      session.user.id = token.sub || token.id

      // Pass Role from token to session
      session.user.role = token.role

      // Use token name if present (it handles the update logic from JWT callback)
      session.user.name = token.name

      // If there is an update trigger, ensure the name is synced
      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
