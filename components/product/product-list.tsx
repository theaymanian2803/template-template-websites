import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product/product-card'
import { Product } from '@/types'

// Define the shape of our product data for Type Safety

const ProductList = ({ data, title }: { data: Product[]; title?: string }) => {
  return (
    <section className="bg-black py-12 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title with Glow Effect */}
        {title && (
          <div className="relative mb-10 text-center">
            {/* Background glow behind title */}
            <div className="absolute left-1/2 top-1/2 h-20 w-40 -translate-x-1/2 -translate-y-1/2 bg-indigo-500/30 blur-3xl" />
            <h2 className="relative z-10 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </div>
        )}

        {/* Product Grid - Updated to 4 columns for smaller cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {data?.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList
