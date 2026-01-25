import { ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: Brand Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center gap-3">
              {/* Logo container */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg transition-transform group-hover:scale-105">
                <Image
                  priority={true}
                  src="/images/case.png"
                  width={24}
                  height={24}
                  alt={`${APP_NAME} logo`}
                  className="invert"
                />
              </div>
              <span className="hidden text-xl font-bold tracking-tighter text-white sm:block">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* RIGHT: Actions */}

          <Menu />
        </div>
      </div>
    </header>
  )
}

export default Header
