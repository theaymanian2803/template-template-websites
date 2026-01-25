import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Hero from '@/components/Banner/Hero'
import ProductList from '@/components/product/product-list'
import { getLatestProducts } from '@/lib/actions/product.actions'

async function HomePage() {
  const latestProducts = await getLatestProducts()

  return (
    <div className=" bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* ------------------- HERO SECTION ------------------- */}
      <Hero />
      {/* ------------------- PRODUCT LIST SECTION ------------------- */}
      <div className="relative z-10 mt-20">
        <ProductList data={latestProducts} title="Trending Now" />
      </div>
    </div>
  )
}

export default HomePage
