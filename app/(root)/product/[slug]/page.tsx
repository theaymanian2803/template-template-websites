import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/actions/product.actions'
import ProductImages from '@/components/product/product-images'
import ProductPrice from '@/components/product/product-price'
import { Button } from '@/components/ui/button'

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const { slug } = params

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return (
    <section className="bg-black text-white min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images (Vertical Gallery) */}
          <div className="w-full">
            <ProductImages images={product.images!} />
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col gap-8 pt-4">
            {/* Title */}
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white">{product.name}</h1>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-4">
              <div className="bg-zinc-900 rounded px-3 py-1">
                <ProductPrice
                  value={Number(product.price)}
                  className="text-2xl font-semibold text-green-400"
                />
              </div>
              <span className="text-sm text-zinc-400">
                | {Number(product.rating).toFixed(1)} stars ({product.numReviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-zinc-800 pt-6">
              <p className="text-zinc-400 leading-relaxed text-lg font-light">
                {product.description}
              </p>
            </div>

            {/* Existing Fields (Brand/Category/Stock) */}
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <p>
                <span className="font-medium text-zinc-300">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-medium text-zinc-300">Category:</span> {product.category}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-300">Status:</span>
                {product.stock > 0 ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Action Area - Wide White Button */}
            <div className="mt-4">
              {product.stock > 0 && (
                <Button className="w-full md:w-auto h-12 px-10 bg-white hover:bg-zinc-200 text-black font-semibold text-lg rounded-full transition-all">
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsPage
