// app/auth/signin/credentials-signin-form.tsx
'use client'
import { useSearchParams } from 'next/navigation'

import { useActionState } from 'react'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { useFormState, useFormStatus } from 'react-dom'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValues } from '@/lib/constants'
import { Mail, Lock, ArrowRight } from 'lucide-react' // Ensure you have lucide-react installed

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [data, action] = useActionState(signInWithCredentials, {
    message: '',
    success: false,
  })
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? 'Signing In...' : 'Sign In with credentials'}
      </Button>
    )
  }
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              required
              type="email"
              defaultValue={signInDefaultValues.email}
              autoComplete="email"
              placeholder="name@example.com"
              className="pl-10" // Padding left to make room for the icon
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              required
              type="password"
              defaultValue={signInDefaultValues.password}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pl-10"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        {/* Footer */}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            target="_self"
            className="font-semibold text-primary hover:underline transition-colors"
            href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm
