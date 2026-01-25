import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'

const Loading = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* 1. Ambient Background Glow (Consistent with other pages) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[200px] w-[200px] rounded-full bg-indigo-500/20 blur-[80px] animate-pulse" />
      </div>

      {/* 2. Central Loading Element */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Spinner Container */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* A. The Spinning Ring (Custom CSS animation via Tailwind) */}
          <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-indigo-500/50 animate-spin" />

          {/* B. The Static Ring (Background track) */}
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />

          {/* C. The Logo in the center */}
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/images/case.png" // Use your logo or case.png here
              height={40}
              width={40}
              alt={`${APP_NAME} loading`}
              priority={true}
              className="invert" // Inverts black logo to white
            />
          </div>
        </div>

        {/* 3. Text feedback */}
        <div className="flex flex-col items-center space-y-1">
          <span className="text-sm font-medium tracking-widest text-white/80 uppercase">
            Loading
          </span>
          <span className="text-xs text-neutral-500">Preparing your experience...</span>
        </div>
      </div>
    </div>
  )
}

export default Loading
