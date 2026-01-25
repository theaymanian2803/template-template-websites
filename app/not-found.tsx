'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* 1. Ambient Background Glow (Purple/Indigo to match header) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px]">
        <div className="h-[300px] w-[300px] rounded-full bg-indigo-500" />
      </div>

      {/* 2. Glass Card Container */}
      <div className="relative z-10 mx-4 flex max-w-md flex-col items-center text-center">
        {/* Large 404 Text - Placed behind the image for depth */}
        <h1 className="select-none text-[8rem] font-extrabold leading-none tracking-tighter text-white/5 sm:text-[10rem]">
          404
        </h1>

        {/* Floating Phone Case Image */}
        <div className="-mt-12 mb-6 animate-bounce duration-[3000ms]">
          <Image
            priority={true}
            src="/images/case.png"
            width={120}
            height={120}
            alt={`${APP_NAME} logo`}
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-white">Case Not Found</h2>
          <p className="text-neutral-400">
            Whatever you were looking for seems to have slipped through the cracks.
          </p>
        </div>

        {/* Action Button - Matching the premium white pill style */}
        <Button
          asChild
          className="mt-8 rounded-full bg-white px-8 py-6 text-base font-semibold text-black hover:bg-neutral-200">
          <Link href="/">Return to Store</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
