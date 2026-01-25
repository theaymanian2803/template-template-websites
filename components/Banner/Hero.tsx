import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pb-24 pt-20 md:pt-32">
      {/* 1. Technical Grid Background */}
      {/* Using standard Tailwind utility for opacity/color instead of arbitrary values where possible */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* 2. Top Spotlight Gradient */}
      <div className="absolute left-0 right-0 top-0 -z-10 mx-auto h-128 w-full max-w-4xl bg-indigo-600/20 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md transition-all hover:bg-indigo-500/20">
          <span className="relative mr-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
            Series X — Available Now
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
          Engineered for <br />
          <span className="bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">
            The Extreme.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400 md:text-xl">
          Military-grade drop protection meets featherlight aerospace materials. Protect your device
          without compromising on style.
        </p>

        {/* Buttons */}
        <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 min-w-40 rounded-full bg-white text-base font-medium text-black hover:bg-neutral-200">
            <Link href="/store">
              Buy Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 min-w-40 rounded-full border-white/10 bg-white/5 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
            <Link href="/about">View Specs</Link>
          </Button>
        </div>

        {/* Hero Image Section */}
        <div className="relative mx-auto mt-12 flex w-full max-w-5xl justify-center">
          {/* Central Glow behind phone */}
          <div className="absolute top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[80px]" />

          {/* Phone Image Container */}
          {/* Using standard spacing: h-96 = 384px, md:h-128 = 512px */}
          <div className="relative h-96 w-full md:h-128">
            <Image
              src="/images/case.png"
              alt="Premium Phone Case"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Floating "Spec" Card - Left */}
          <div className="absolute left-10 top-20 hidden animate-pulse rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md lg:block">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/20 p-2">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-neutral-500">Protection</p>
                <p className="text-sm font-bold text-white">Military Grade</p>
              </div>
            </div>
          </div>

          {/* Floating "Spec" Card - Right */}
          <div className="absolute bottom-20 right-10 hidden animate-bounce rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md lg:block">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/20 p-2">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-neutral-500">Weight</p>
                <p className="text-sm font-bold text-white">Ultra-Light</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />
    </section>
  )
}

export default Hero
