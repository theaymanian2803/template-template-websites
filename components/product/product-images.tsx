'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex gap-4">
      {/* Thumbnails - Vertical Stack on the Left */}
      <div className="flex flex-col gap-4">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              'relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg bg-zinc-900',
              current === index
                ? 'border-2 border-white' // Active state: White border for dark theme
                : 'border border-transparent hover:border-zinc-700'
            )}
            onClick={() => setCurrent(index)}>
            <Image src={image} alt={'thumbnail'} fill className="object-contain p-2" />
          </div>
        ))}
      </div>

      {/* Main Image - Right Side of Thumbnails */}
      <div className="relative flex-1 overflow-hidden rounded-lg bg-zinc-900 min-h-[500px] flex items-center justify-center border border-zinc-800">
        <Image
          src={images![current]}
          alt="product image"
          width={800}
          height={800}
          className="max-h-[500px] w-auto object-contain p-8"
          priority
        />
      </div>
    </div>
  )
}

export default ProductImages
