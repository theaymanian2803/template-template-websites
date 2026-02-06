// app/auth/signin/page.tsx (or wherever your SignIn page lives)
import { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import CredentialsSignInForm from './credentials-signin-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sign In',
}

const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) => {
  const { callbackUrl } = await props.searchParams
  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      {/* Background decoration (optional) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 dark:bg-zinc-950 dark:[background:radial-gradient(#1f1f23_1px,transparent_1px)]"></div>

      <Card className="w-full max-w-md shadow-2xl border-border/60">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto flex transform transition-transform hover:scale-105">
            <Image
              priority={true}
              src="/images/case.png"
              width={80}
              height={80}
              alt={`${APP_NAME} logo`}
              className="drop-shadow-sm"
            />
          </Link>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn
