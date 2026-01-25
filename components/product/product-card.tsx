import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div
        key={product.slug}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-lg backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:shadow-indigo-500/20">
        {/* IMAGE CONTAINER 
                  1. Changed aspect-[4/5] to aspect-square (shorter height)
                  2. Added p-6 (padding) so the image isn't edge-to-edge
              */}
        <div className="relative aspect-square overflow-hidden bg-zinc-950 p-6">
          {/* Badge: Featured or Out of Stock */}
          {product.stock === 0 ? (
            <span className="absolute left-3 top-3 z-20 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Sold Out
            </span>
          ) : product.isFeatured ? (
            <span className="absolute left-3 top-3 z-20 rounded-full bg-indigo-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Hot
            </span>
          ) : null}

          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            {/* Image 1 (Default) 
                      Changed object-cover to object-contain so it never gets cut off 
                  */}
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />

            {/* Image 2 (Hover Reveal) */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                className="absolute inset-0 object-contain p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </Link>
        </div>

        {/* DETAILS CONTAINER */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-indigo-400">{product.brand}</p>

              {/* Rating Star */}
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-medium text-neutral-400">{product.rating}</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-white transition-colors group-hover:text-indigo-400">
                {product.name}
              </h3>
            </Link>

            <p className="mt-2 text-sm text-neutral-400 line-clamp-2">{product.category}</p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">${product.price}</span>
            </div>

            {/* Add to Cart Button */}
            <Button
              disabled={product.stock === 0}
              size="sm"
              className="rounded-full bg-white text-black hover:bg-neutral-200 disabled:opacity-50">
              {product.stock === 0 ? (
                'No Stock'
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
